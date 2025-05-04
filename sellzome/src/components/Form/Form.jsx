import React, { useState } from 'react';

function Form() {
  // Form state
  const [formData, setFormData] = useState({
    productName: '',
    productDetails: '',
    price: '',
    sellerName: '',
    division: '',
    district: '',
    images: [] // This will store the image files
  });

  // Available divisions and districts in Bangladesh
  const bangladeshLocations = {
    divisions: ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh'],
    districts: {
      Dhaka: ['Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Kishoreganj', 'Madaripur', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Rajbari', 'Shariatpur', 'Tangail'],
      Chittagong: ['Bandarban', 'Brahmanbaria', 'Chandpur', 'Chittagong', 'Comilla', 'Cox\'s Bazar', 'Feni', 'Khagrachhari', 'Lakshmipur', 'Noakhali', 'Rangamati'],
      Rajshahi: ['Bogra', 'Chapai Nawabganj', 'Joypurhat', 'Naogaon', 'Natore', 'Pabna', 'Rajshahi', 'Sirajganj'],
      Khulna: ['Bagerhat', 'Chuadanga', 'Jessore', 'Jhenaidah', 'Khulna', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira'],
      Barishal: ['Barguna', 'Barishal', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur'],
      Sylhet: ['Habiganj', 'Moulvibazar', 'Sunamganj', 'Sylhet'],
      Rangpur: ['Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Rangpur', 'Thakurgaon'],
      Mymensingh: ['Jamalpur', 'Mymensingh', 'Netrokona', 'Sherpur']
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // Limit to 5 images
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form after submission if needed
  };

  return (
    <div className="max-w-2xl mt-20  mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Product Selling Form</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images (Max 5)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.images.map((image, index) => (
              <div key={index} className="w-20 h-20 border rounded-md overflow-hidden">
                <img 
                  src={URL.createObjectURL(image)} 
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {formData.images.length} / 5 images selected
          </p>
        </div>

        {/* Product Name */}
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Product Details */}
        <div>
          <label htmlFor="productDetails" className="block text-sm font-medium text-gray-700">
            Product Details
          </label>
          <textarea
            id="productDetails"
            name="productDetails"
            rows={4}
            value={formData.productDetails}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price (BDT)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Seller Name */}
        <div>
          <label htmlFor="sellerName" className="block text-sm font-medium text-gray-700">
            Seller Name
          </label>
          <input
            type="text"
            id="sellerName"
            name="sellerName"
            value={formData.sellerName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Location - Division */}
        <div>
          <label htmlFor="division" className="block text-sm font-medium text-gray-700">
            Division
          </label>
          <select
            id="division"
            name="division"
            value={formData.division}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Division</option>
            {bangladeshLocations.divisions.map(division => (
              <option key={division} value={division}>{division}</option>
            ))}
          </select>
        </div>

        {/* Location - District (conditional on division selection) */}
        {formData.division && (
          <div>
            <label htmlFor="district" className="block text-sm font-medium text-gray-700">
              District
            </label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select District</option>
              {bangladeshLocations.districts[formData.division].map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        )}
     
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border bg-primary border-transparent rounded-md shadow-sm text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;