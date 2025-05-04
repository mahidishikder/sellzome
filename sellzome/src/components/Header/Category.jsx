import React, { useState, useEffect } from 'react';

const Category = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  const categories = [
    { id: 1, name: 'Electronics', icon: '📱', subcategories: ['Smartphones', 'Laptops', 'Cameras', 'Headphones', 'Tablets', 'Smart Watches', 'Gaming Consoles', 'Accessories'] },
    { id: 2, name: 'Fashion', icon: '👕', subcategories: ["Men's Clothing", "Women's Clothing", "Kids Fashion", "Footwear", "Watches", "Bags & Luggage", "Jewelry", "Eyewear"] },
    { id: 3, name: 'Home & Kitchen', icon: '🏠', subcategories: ['Furniture', 'Kitchen Appliances', 'Home Decor', 'Lighting', 'Bedding', 'Bath', 'Storage', 'Cookware'] },
    { id: 4, name: 'Beauty', icon: '💄', subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Men\'s Grooming', 'Bath & Body', 'Tools & Accessories'] },
    { id: 5, name: 'Sports', icon: '⚽', subcategories: ['Fitness Equipment', 'Team Sports', 'Outdoor Recreation', 'Cycling', 'Yoga', 'Water Sports', 'Winter Sports'] },
    { id: 6, name: 'Books', icon: '📚', subcategories: ['Fiction', 'Non-Fiction', 'Children\'s', 'Textbooks', 'Audiobooks', 'Magazines', 'Stationery', 'eBooks'] },
    { id: 7, name: 'Toys', icon: '🧸', subcategories: ['Action Figures', 'Dolls', 'Building Toys', 'Educational', 'Board Games', 'Puzzles', 'Outdoor Play', 'Baby Toys'] },
    { id: 8, name: 'Automotive', icon: '🚗', subcategories: ['Car Parts', 'Car Care', 'Tools', 'Motorcycle', 'RV Parts', 'Interior', 'Exterior Accessories'] },
    { id: 9, name: 'Groceries', icon: '🛒', subcategories: ['Beverages', 'Snacks', 'Pantry Staples', 'Frozen Foods', 'Dairy', 'Bakery', 'Meat & Seafood', 'Organic'] },
    { id: 10, name: 'Health', icon: '❤️', subcategories: ['Vitamins', 'Medical Supplies', 'Wellness', 'Elderly Care', 'First Aid', 'Sexual Wellness', 'Vision Care'] },
    { id: 11, name: 'Pet Supplies', icon: '🐶', subcategories: ['Dog Supplies', 'Cat Supplies', 'Fish Supplies', 'Bird Supplies', 'Small Animal', 'Reptile', 'Pet Food', 'Grooming'] },
    { id: 12, name: 'Office', icon: '💼', subcategories: ['Office Furniture', 'Stationery', 'Printers', 'Computers', 'Storage', 'Presentation', 'Writing Instruments'] }
  ];

  // Filter categories based on search term
  useEffect(() => {
    const results = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(results);
  }, [searchTerm, categories]);

  const categoriesToDisplay = searchTerm ? filteredCategories : categories;

  return (
    <div className="container mx-auto px-4 py-6 relative">
      {/* Search */}
      <div className="relative w-full max-w-2xl mx-auto mb-6">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search categories..."
          className="w-full p-3 pr-32 rounded-full border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-primary text-white px-5 py-3 rounded-full text-sm hover:bg-blue-600">
          Search
        </button>
      </div>

      {/* Desktop Category Grid */}
      <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {categoriesToDisplay.map((category) => (
          <div
            key={category.id}
            className="relative group w-full max-w-xs mx-auto"
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {/* Category Card */}
            <div className="cursor-pointer bg-white p-4 rounded-lg shadow border flex flex-col items-center hover:shadow-lg transition">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl mb-2">
                {category.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 text-center truncate w-full block">
                {category.name}
              </span>
            </div>

            {/* Hover Modal */}
            {hoveredCategory?.id === category.id && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white border rounded-lg shadow-lg z-20">
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 text-sm mb-2">
                    {category.name}
                  </h4>
                  <ul className="space-y-1">
                    {category.subcategories.map((subcat, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition"
                      >
                        {subcat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Category Grid (2 columns) */}
      <div className="md:hidden">
        {categoriesToDisplay.map((category) => {
          const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);

          const handleMobileCategoryClick = () => {
            setIsMobileSubmenuOpen(!isMobileSubmenuOpen);
          };

          return (
            <div key={category.id} className="border rounded-md shadow-sm">
              <button
                className="w-full bg-white p-3 flex items-center justify-between"
                onClick={handleMobileCategoryClick}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xl mr-2">
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate">{category.name}</span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    isMobileSubmenuOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileSubmenuOpen && (
                <div className="p-3 bg-gray-50 rounded-b-md">
                  <ul className="space-y-1">
                    {category.subcategories.map((subcat, idx) => (
                      <li key={idx} className="text-xs text-gray-600 hover:text-blue-600 cursor-pointer transition">
                        {subcat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;