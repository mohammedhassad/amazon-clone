import Layout from "@/components/Layout";
import Banner from "@/components/Banner";
import ProductFeed from "@/components/ProductFeed";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";

export default function Home({ products }: any) {
  return (
    <Layout>
      <Banner />

      <ProductFeed products={products} />
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products,
      session,
    },
  };
}
