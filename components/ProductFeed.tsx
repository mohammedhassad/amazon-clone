import React from "react";
import Product from "./Product";
import Image from "next/image.js";

interface IProducts {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

type Props = {
  products: IProducts[];
};

function ProductFeed({ products }: Props) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products
        .slice(0, 4)
        .map(({ id, title, price, description, category, image }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}

      {/* image */}
      <div className="m-5 md:col-span-full">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          className="w-full object-contain"
          src="/images/Fuji_LP_header_MD21_en_US.png"
          alt=""
        />
      </div>

      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, price, description, category, image }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          ))}
      </div>

      {products
        .slice(5, products.length)
        .map(({ id, title, price, description, category, image }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
    </div>
  );
}

export default ProductFeed;
