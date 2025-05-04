import React from 'react';

function Products({ product }) {
  const { image, name, price, seller, location } = product;

  return (
    <div className="flex flex-col bg-violet-50 p-4 rounded-lg shadow-lg h-full">
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-72  object-cover rounded-md mb-4" // Fixed height (h-56) and responsive width (w-full)
      />

      {/* Product Content */}
      <div className="flex flex-col flex-grow">
        <h2 className="text-md sm:text-lg md:text-base font-semibold text-gray-800 mb-1">
          {name}
        </h2>
        <p className="text-sm sm:text-xs md:text-xs text-gray-500 mb-1">
          Price: <span className="text-green-600 font-bold">${price}</span>
        </p>
        <p className="text-sm sm:text-xs md:text-xs text-gray-500 mb-1">
          Seller: {seller.name}
        </p>
        <p className="text-sm sm:text-xs md:text-xs text-gray-500 mb-4">
          Location: {seller.location}
        </p>

        {/* Add to Cart Button */}
        <button className="mt-auto px-4 py-2 bg-primary text-white rounded  cursor-pointer text-xs sm:text-sm md:text-base">
          Choose
        </button>
      </div>
    </div>
  );
}

export default Products;
