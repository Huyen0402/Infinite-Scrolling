import React from "react";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const Product: React.FC<ProductProps> = ({ thumbnail, title, price }) => {
  return (
    <div className="w-1/5 inline-block m-4 border-solid border rounded-lg hover:scale-110 transition-transform duration-300">
      <div className="relative h-60 border-b rounded-lg">
        <img
          src={thumbnail}
          alt={title}
          className="absolute h-full object-cover rounded-t-lg"
        />
      </div>
      <h3 className="mt-4 mb-4 font-serif text-lg h-10">{title}</h3>
      <p className="font-bold text-red-500">{`Price: $${price}`}</p>
    </div>
  );
};

export default Product;
