import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/solid";
import Layout from "@/components/Layout";

export default function Success() {
  const router = useRouter();

  return (
    <Layout>
      <div className="bg-white p-10 flex flex-col">
        <div className="flex items-center space-x-2 mb-5">
          <CheckCircleIcon className="text-green-500 h-10" />
          <h1 className="text-3xl">
            Thank you, your order has been confirmed!
          </h1>
        </div>

        <p>
          Thank you fo shopping with us, We&apos;ll send a confirmation once
          your item has shipped, If you would like to check the status of your
          order(s) please press the link below.
        </p>

        <button
          onClick={() => router.push("/orders")}
          className="button mt-8 py-3 font-semibold"
        >
          Go to my Orders
        </button>
      </div>
    </Layout>
  );
}
