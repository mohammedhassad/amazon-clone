import React, { Fragment, useState } from "react";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { StarIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { addToBasket } from "@/redux/slices/basketSlice";

type Props = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }: Props) {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
  );
  const [hasPrime] = useState(Math.random() < 0.5);
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      rating,
      image,
      hasPrime,
    };

    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 italic text-xs text-gray-400">
        {category}
      </p>

      <Image
        src={image}
        alt={title}
        width="0"
        height="0"
        sizes="100vw"
        className="w-[200px] h-[200px] object-contain mx-auto"
      />

      <h4 className="my-3">{title}</h4>

      <div className="flex items-center">
        {Array(rating)
          .fill(undefined)
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="USD" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <Image
            loading="lazy"
            width="0"
            height="0"
            sizes="100vh"
            className="w-12"
            src="https://iconape.com/wp-content/png_logo_vector/amazon-prime-icon-logo.png"
            alt=""
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button onClick={addItemToBasket} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
