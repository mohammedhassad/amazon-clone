import React from "react";
import { Inter } from "next/font/google";
import Header from "./Header";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className={`${inter.className}`}>
      <Header />

      <main className="max-w-screen-2xl mx-auto">{children}</main>
    </div>
  );
}

export default Layout;
