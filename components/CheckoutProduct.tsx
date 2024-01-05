import Image from "next/image";
import Currency from "react-currency-formatter";
import { StarIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "@/redux/slices/basketSlice";
import Product from "./Product.jsx";

type Props = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  image: string;
  hasPrime: boolean;
};

function CheckoutProduct({
  id,
  title,
  price,
  description,
  category,
  rating,
  image,
  hasPrime,
}: Props) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product: any = {
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

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image
        src={image}
        alt={title}
        width="0"
        height="0"
        sizes="100vw"
        className="w-[200px] h-[200px] object-contain mx-auto"
      />

      <div className="col-span-3 mx-5">
        <p>{title}</p>

        <div className="flex items-center">
          {Array(rating)
            .fill(undefined)
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>

        <Currency quantity={price} currency="USD" />

        {hasPrime && (
          <div className="flex items-center space-x-2">
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
      </div>

      {/* buttons */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add To Basket
        </button>
        <button className="button" onClick={removeItemFromBasket}>
          Remove From Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
