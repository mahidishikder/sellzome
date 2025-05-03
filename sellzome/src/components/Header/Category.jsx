import React, { useState } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';

const Category = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      id: 1,
      name: 'Electronics',
      icon: '📱',
      subcategories: ['Smartphones', 'Laptops', 'Cameras', 'Headphones', 'Tablets', 'Smart Watches', 'Gaming Consoles', 'Accessories']
    },
    {
      id: 2,
      name: 'Fashion',
      icon: '👕',
      subcategories: ["Men's Clothing", "Women's Clothing", "Kids Fashion", "Footwear", "Watches", "Bags & Luggage", "Jewelry", "Eyewear"]
    },
    {
      id: 3,
      name: 'Home & Kitchen',
      icon: '🏠',
      subcategories: ['Furniture', 'Kitchen Appliances', 'Home Decor', 'Lighting', 'Bedding', 'Bath', 'Storage', 'Cookware']
    },
    {
      id: 4,
      name: 'Beauty',
      icon: '💄',
      subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Men\'s Grooming', 'Bath & Body', 'Tools & Accessories']
    },
    {
      id: 5,
      name: 'Sports',
      icon: '⚽',
      subcategories: ['Fitness Equipment', 'Team Sports', 'Outdoor Recreation', 'Cycling', 'Yoga', 'Water Sports', 'Winter Sports']
    },
    {
      id: 6,
      name: 'Books',
      icon: '📚',
      subcategories: ['Fiction', 'Non-Fiction', 'Children\'s', 'Textbooks', 'Audiobooks', 'Magazines', 'Stationery', 'eBooks']
    },
    {
      id: 7,
      name: 'Toys',
      icon: '🧸',
      subcategories: ['Action Figures', 'Dolls', 'Building Toys', 'Educational', 'Board Games', 'Puzzles', 'Outdoor Play', 'Baby Toys']
    },
    {
      id: 8,
      name: 'Automotive',
      icon: '🚗',
      subcategories: ['Car Parts', 'Car Care', 'Tools', 'Motorcycle', 'RV Parts', 'Interior', 'Exterior Accessories']
    },
    {
      id: 9,
      name: 'Groceries',
      icon: '🛒',
      subcategories: ['Beverages', 'Snacks', 'Pantry Staples', 'Frozen Foods', 'Dairy', 'Bakery', 'Meat & Seafood', 'Organic']
    },
    {
      id: 10,
      name: 'Health',
      icon: '❤️',
      subcategories: ['Vitamins', 'Medical Supplies', 'Wellness', 'Elderly Care', 'First Aid', 'Sexual Wellness', 'Vision Care']
    },
    {
      id: 11,
      name: 'Pet Supplies',
      icon: '🐶',
      subcategories: ['Dog Supplies', 'Cat Supplies', 'Fish Supplies', 'Bird Supplies', 'Small Animal', 'Reptile', 'Pet Food', 'Grooming']
    },
    {
      id: 12,
      name: 'Office',
      icon: '💼',
      subcategories: ['Office Furniture', 'Stationery', 'Printers', 'Computers', 'Storage', 'Presentation', 'Writing Instruments']
    }
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some(subcat =>
      subcat.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto px-4 py-6 relative">
      {/* Search */}
      <div className="relative w-full max-w-2xl mx-auto mb-6">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search categories..."
          className="w-full p-3 pr-32 rounded-full border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-blue-500 text-white px-5 py-2 rounded-full text-sm hover:bg-blue-600">
          Search
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Shop by Category</h2>

      {/* Category Grid */}
      <div className="grid grid-cols-3  sm:grid-cols-4 md:grid-cols-5  lg:grid-cols-6 gap-4">
        {filteredCategories.map((category) => (
          <div key={category.id} className="relative">
            <button
              onClick={() => handleCategoryClick(category.id)}
              className={`w-full bg-white p-4 rounded-lg shadow-sm border ${activeCategory === category.id ? 'border-blue-400' : 'border-gray-100'} flex flex-col items-center transition duration-200`}
            >
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-2xl mb-2">
                {category.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 text-center truncate w-full block">
  {category.name}
</span>
              <FiChevronDown className={`mt-1 text-gray-500 transition-transform ${activeCategory === category.id ? 'rotate-180' : ''}`} />
            </button>
          </div>
        ))}
      </div>

      {/* Subcategories */}
      {activeCategory && (
        <div className="absolute left-0 w-full mt-5 bg-white rounded-lg shadow-lg border border-gray-200 p-6 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">
              {categories.find(c => c.id === activeCategory)?.name}
            </h3>
            <button onClick={() => setActiveCategory(null)} className="text-gray-500 hover:text-gray-700">
              <FiX size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.find(c => c.id === activeCategory)?.subcategories.map((subcat, idx) => (
              <a key={idx} href="#" className="p-3 hover:bg-gray-50 border rounded text-sm font-medium text-gray-700">
                {subcat}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
