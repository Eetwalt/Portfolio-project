import { loadStripe, Stripe } from "@stripe/stripe-js";
import { globalGsapConfig } from "../utils/globalGsapConfig";

document.addEventListener("DOMContentLoaded", function () {
  globalGsapConfig.animateElements();

  const registrationForm = document.getElementById("registerform")!;

  const inputs = registrationForm.querySelectorAll(
    "input[required]"
  ) as NodeListOf<HTMLInputElement>;

  const privacyCheck = document.querySelector(
    '[kuasi-element="privacy"]'
  ) as HTMLInputElement;

  const checkoutButton = document.querySelector(
    '[kuasi-element="stripe-btn"]'
  ) as HTMLButtonElement;

  let email = document.querySelector(
    '[kuasi-element="inputEmail"]'
  ) as HTMLInputElement;
  let attendees = document.querySelector(
    '[kuasi-element="quantity"]'
  ) as HTMLInputElement;

  checkoutButton.disabled = true;

  function checkFormValidity() {
    let isFormValid = false;

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

  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault(); //prevent form submission
  });

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", checkFormValidity);
  }

  privacyCheck.addEventListener("change", checkFormValidity);

  checkFormValidity(); // Check form validity initially

  (async function () {
    let stripe: Stripe | null = await loadStripe(
      "pk_test_51NBZXWC9cXxM6Jw80UIwYVmqpFGBzCIItOfAFRbyDOZ5Lwtk09NpBeP3zAwAj3MKy9sj9ZFHI7o66JgEpWL6UrBK00YiHNC2Xk"
    );

    checkoutButton.addEventListener("click", function () {
      checkFormValidity();

      if (!stripe) {
        return;
      }

      /*
       * When the customer clicks on the button, redirect
       * them to Checkout.
       */
      stripe
        .redirectToCheckout({
          lineItems: [
            {
              price: "price_1NBZuaC9cXxM6Jw8jaLKDIFR",
              quantity: parseInt(attendees.value),
            },
          ],
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
          customerEmail: email.value,
        })
        .then(function (result) {
          if (result.error) {
            /*
             * If `redirectToCheckout` fails due to a browser or network
             * error, display the localized error message to your customer.
             */
            let displayError = document.getElementById(
              "error-message"
            ) as HTMLDivElement;
            if (displayError) {
              displayError.textContent =
                result.error.message ?? "An unknown error occurred.";
            }
          }
        });
    });
  })();
});
