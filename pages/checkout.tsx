import Image from "next/image";
import axios from "axios";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { selectItems, selectTotal } from "@/redux/slices/basketSlice";
import CheckoutProduct from "@/components/CheckoutProduct";
import Layout from "@/components/Layout";

const stripePromise = loadStripe(process.env.stripe_public_key!);

type Props = {};

export default function Checkout({}: Props) {
  const { data: session } = useSession();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session?.user?.email,
    });

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result?.error) alert(result?.error?.message);
  };

  return (
    <Layout>
      <div className="lg:flex">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm space-y-3">
          <Image
            src="/images/Prime-day-banner.png"
            width={1020}
            height={250}
            alt="#"
            sizes="100vw"
            className="object-contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items?.length === 0
                ? "Your Amazon Basket is Empty"
                : "Shopping Basket"}
            </h1>

            {items?.map((item: any, i: number) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                rating={item.rating}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col bg-white p-5 shadow-sm m-5">
          {items?.length > 0 && (
            <h2 className="whitespace-nowrap">
              Subtotal ({items?.length} items):{" "}
              <span className="font-bold">
                <Currency quantity={total} currency="USD" />
              </span>
            </h2>
          )}

          <button
            role="link"
            onClick={createCheckoutSession}
            disabled={!session}
            className={`button mt-2 ${
              !session
                ? "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                : ""
            }`}
          >
            {!session ? "Sign In to Checkout" : "Preceed to Checkout"}
          </button>
        </div>
      </div>
    </Layout>
  );
}
