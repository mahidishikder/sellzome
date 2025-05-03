import React from 'react';

function Products({ product }) {
  console.log(product);

  const { image, name, price, seller, location } = product;

  return (
    <div className="flex flex-col bg-blue-50 p-4 rounded-lg shadow-lg  ">
      {/* Image on top */}
      <img
        src={image}
        alt={name}
        className="w-full h-auto object-cover rounded mb-4   "
      />
      <div className="flex flex-col justify-between">
        {/* Name of the product */}
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{name}</h2>
        {/* Price */}
        <p className="text-md text-gray-500 mb-2">Price: <span className="text-green-500 font-bold">${price}</span></p>
        {/* Seller */}
        <p className="text-md text-gray-500 mb-2">Seller: {seller.name}</p>
        {/* Location */}
        <p className="text-md text-gray-500 mb-4">Location: {seller.location}</p>
        {/* Add to Cart Button */}
      </div>
    </div>
  );
}

export default Products;

