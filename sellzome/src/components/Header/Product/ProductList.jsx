import React, { useState, useEffect } from 'react';
import Products from './Products';

function ProductList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-2xl font-bold  my-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map(product => (
          <Products key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
