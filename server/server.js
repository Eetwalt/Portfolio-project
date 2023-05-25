require('dotenv').config({ path: './server/.env' });
// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const mailchimpClient = require("@mailchimp/mailchimp_transactional")(process.env.MAILCHIMP_API_KEY);
const app = express();

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_742781f69ffe9aea58685e778e2ae0fa3e17f04c5edeea28d91d771f6dea9a46";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log(`PaymentMethod was attached!`);
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    case 'charge.succeeded':
    
    const customerEmail = event.data.object.customer_email;
      const run = async () => {
        const response = await mailchimpClient.messages.send({ 
          message: {
            subject: "API Message",
            text: "Welcome to Mailchimp Transactional!",
            from_email: "eetu@eeturantanen.fi",
            to: [
              {
                email: customerEmail,
                name: "Eetu Rantanen",
                type: "to"
              }
            ],
          } });
        console.log(response);
      };

      run();

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.listen(4242, () => console.log('Running on port 4242'));