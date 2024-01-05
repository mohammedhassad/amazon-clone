import moment from "moment";
import Currency from "react-currency-formatter";

type Props = {
  id: string;
  amount: number;
  amountShipping: number;
  items: object[];
  timestamp: number;
  images: string[];
};

function Order({
  id,
  amount,
  amountShipping,
  items,
  timestamp,
  images,
}: Props) {
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600 rounded-t-md">
        <div>
          <p className="text-xs font-bold uppercase">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase">TOTAL</p>
          <p>
            <Currency quantity={amount} currency="USD" /> - Next Day Shipping{" "}
            <Currency quantity={amount} currency="USD" />
          </p>
        </div>

        <p className="text-xs whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.length} items
        </p>

        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>

      <div className="p-5 sm:p-10 bg-white rounded-b-md">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {images.map((image, id) => (
            <img
              key={id}
              src={image}
              alt=""
              className="h-20 object-contain sm:h-32"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
