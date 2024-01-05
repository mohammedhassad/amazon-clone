import Layout from "@/components/Layout";
import Order from "@/components/Order";
import db from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import moment from "moment";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";

export default function Orders({ orders }: any) {
  const { data: session } = useSession();

  console.log(orders);

  return (
    <Layout>
      <div className="m-10">
        <h1 className="text-3xl border-b nb-2 pb-1 border-yellow-500">
          Your Order
        </h1>

        {session ? (
          <h2>x Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-2">
          {orders?.map(
            ({ id, amount, amountShipping, items, timestamp, images }: any) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY!);

  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const stripeOrders = await getDocs(
    query(
      collection(db, `users/${session?.user?.email}/orders`),
      orderBy("timestamp", "desc")
    )
  );

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
