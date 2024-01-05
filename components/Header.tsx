"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { selectItems } from "@/redux/slices/basketSlice";

type Props = {};

function Header(props: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header>
      {/* Tap nav */}
      <div className="flex items-center bg-amazon_blue p-1 py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon Logo"
            width="0"
            height="0"
            sizes="100vw"
            className="w-[150px] h-[40px] object-contain cursor-pointer"
          />
        </div>

        {/* Search */}
        <div className="hidden sm:flex items-center cursor-pointer h-10 flex-grow rounded-md bg-yellow-400 hover:bg-yellow-500 ">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/* Right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div
            onClick={!session ? () => signIn() : () => signOut()}
            className="link"
          >
            <p>{session ? `Hello, ${session?.user?.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div className="link" onClick={() => router.push("/orders")}>
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            onClick={() => router.push("/checkout")}
            className="relative link flex items-center"
          >
            <span className="absolute top-0 right-0 md:right-10 text-center h-4 w-4 bg-yellow-400 rounded-full text-black font-bold">
              {items?.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* bottom nav */}
      <div className="bg-amazon_blue-light text-white text-sm space-x-3 flex items-center p-2 pl-6 ">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon business</p>
        <p className="link">Today&apos;s Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shooper tolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personel Care</p>
      </div>
    </header>
  );
}

export default Header;
