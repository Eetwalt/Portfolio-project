(() => {
  // node_modules/@stripe/stripe-js/dist/stripe.esm.js
  var V3_URL = "https://js.stripe.com/v3";
  var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
  var EXISTING_SCRIPT_MESSAGE = "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used";
  var findScript = function findScript2() {
    var scripts = document.querySelectorAll('script[src^="'.concat(V3_URL, '"]'));
    for (var i = 0; i < scripts.length; i++) {
      var script = scripts[i];
      if (!V3_URL_REGEX.test(script.src)) {
        continue;
      }
      return script;
    }
    return null;
  };
  var injectScript = function injectScript2(params) {
    var queryString = params && !params.advancedFraudSignals ? "?advancedFraudSignals=false" : "";
    var script = document.createElement("script");
    script.src = "".concat(V3_URL).concat(queryString);
    var headOrBody = document.head || document.body;
    if (!headOrBody) {
      throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
    }
    headOrBody.appendChild(script);
    return script;
  };
  var registerWrapper = function registerWrapper2(stripe, startTime) {
    if (!stripe || !stripe._registerWrapper) {
      return;
    }
    stripe._registerWrapper({
      name: "stripe-js",
      version: "1.53.0",
      startTime
    });
  };
  var stripePromise = null;
  var loadScript = function loadScript2(params) {
    if (stripePromise !== null) {
      return stripePromise;
    }
    stripePromise = new Promise(function(resolve, reject) {
      if (typeof window === "undefined" || typeof document === "undefined") {
        resolve(null);
        return;
      }
      if (window.Stripe && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      }
      if (window.Stripe) {
        resolve(window.Stripe);
        return;
      }
      try {
        var script = findScript();
        if (script && params) {
          console.warn(EXISTING_SCRIPT_MESSAGE);
        } else if (!script) {
          script = injectScript(params);
        }
        script.addEventListener("load", function() {
          if (window.Stripe) {
            resolve(window.Stripe);
          } else {
            reject(new Error("Stripe.js not available"));
          }
        });
        script.addEventListener("error", function() {
          reject(new Error("Failed to load Stripe.js"));
        });
      } catch (error) {
        reject(error);
        return;
      }
    });
    return stripePromise;
  };
  var initStripe = function initStripe2(maybeStripe, args, startTime) {
    if (maybeStripe === null) {
      return null;
    }
    var stripe = maybeStripe.apply(void 0, args);
    registerWrapper(stripe, startTime);
    return stripe;
  };
  var stripePromise$1 = Promise.resolve().then(function() {
    return loadScript(null);
  });
  var loadCalled = false;
  stripePromise$1["catch"](function(err) {
    if (!loadCalled) {
      console.warn(err);
    }
  });
  var loadStripe = function loadStripe2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    loadCalled = true;
    var startTime = Date.now();
    return stripePromise$1.then(function(maybeStripe) {
      return initStripe(maybeStripe, args, startTime);
    });
  };

  // client/src/sandbox.ts
  var registrationForm = document.getElementById("registerform");
  var inputs = registrationForm.querySelectorAll("input[required]");
  var privacyCheck = document.querySelector('[kuasi-element="privacy"]');
  var checkoutButton = document.querySelector('[kuasi-element="stripe-btn"]');
  var requiredErrorMessage = document.querySelector('[kuasi-element="req-error"]');
  var email = document.querySelector('[kuasi-element="inputEmail"]');
  var attendees = document.querySelector('[kuasi-element="quantity"]');
  var emailValue = email.value;
  var attendeesValue = attendees.value.trim();
  checkoutButton.disabled = true;
  function checkFormValidity() {
    let isFormValid = true;
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        isFormValid = false;
        break;
      }
    }
    if (!privacyCheck.checked) {
      isFormValid = false;
    }
    checkoutButton.disabled = !isFormValid;
  }
  registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();
  });
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", checkFormValidity);
  }
  privacyCheck.addEventListener("change", checkFormValidity);
  checkFormValidity();
  (async function() {
    let stripe = await loadStripe("pk_test_51NBZXWC9cXxM6Jw80UIwYVmqpFGBzCIItOfAFRbyDOZ5Lwtk09NpBeP3zAwAj3MKy9sj9ZFHI7o66JgEpWL6UrBK00YiHNC2Xk");
    checkoutButton.addEventListener("click", function() {
      checkFormValidity();
      if (!stripe) {
        return;
      }
      stripe.redirectToCheckout({
        lineItems: [{
          price: "price_1NBZuaC9cXxM6Jw8jaLKDIFR",
          quantity: parseInt(attendees.value)
        }],
        mode: "payment",
        /*
         * Do not rely on the redirect to the successUrl for fulfilling
         * purchases, customers may not always reach the success_url after
         * a successful payment.
         * Instead use one of the strategies described in
         * https://stripe.com/docs/payments/checkout/fulfill-orders
         */
        successUrl: "https://erport.webflow.io/sandbox",
        cancelUrl: "https://erport.webflow.io/sandbox",
        customerEmail: email.value
      }).then(function(result) {
        if (result.error) {
          let displayError = document.getElementById("error-message");
          if (displayError) {
            displayError.textContent = result.error.message ?? "An unknown error occurred.";
          }
        }
      });
    });
  })();
})();
