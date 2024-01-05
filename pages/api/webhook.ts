import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import * as admin from "firebase-admin";
import Stripe from "stripe";

// Secure Connection Firebase from the Backend
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
      }),
    })
  : admin.app();

// Establish Connection to Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

const endpointSecret = process.env.STRIPE_SIGNING_SECRET!;

const fullfilOrder = (session: any) => {
  //   console.log(session);

  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() =>
      console.log(`SUCCESS: order ${session.id} has been added to DB.`)
    );
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"] as string | string[];

    let event;

    //    Verify that the EVENT posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err: any) {
      console.log("ERROR: ", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    //   Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fullfil the order
      return fullfilOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
