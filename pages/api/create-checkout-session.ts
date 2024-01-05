import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { items, email } = req.body;

    const transformedItems = items.map((item: any) => ({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.image],
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 699,
              currency: "usd",
            },
            display_name: "Next-Day Shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 3,
              },
            },
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["GB", "US", "CA"],
      },
      line_items: transformedItems,
      mode: "payment",
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/canceled`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item: any) => item.image)),
      },
    });

    return res.status(200).json({ id: session.id });
  }
}
