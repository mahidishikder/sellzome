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
    images: [] // This will store the image URLs after upload
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  // Upload image to ImgBB
  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=4464338ad24fd7886af7372d27e6c1d6', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // Limit to 5 images
    
    if (files.length === 0) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    const uploadedImageUrls = [];
    
    for (let i = 0; i < files.length; i++) {
      try {
        const imageUrl = await uploadImageToImgBB(files[i]);
        if (imageUrl) {
          uploadedImageUrls.push(imageUrl);
        }
        setUploadProgress(((i + 1) / files.length) * 100);
      } catch (error) {
        console.error(`Error uploading image ${i + 1}:`, error);
      }
    }
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...uploadedImageUrls]
    }));
    
    setUploading(false);
  };

  // Remove image
  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (uploading) {
      alert('Please wait for images to finish uploading');
      return;
    }
    
    if (formData.images.length === 0) {
      alert('Please upload at least one image');
      return;
    }
    
    // Here you would typically send the form data to your backend
    console.log('Form data with image URLs:', {
      ...formData,
      images: formData.images // Now contains ImgBB URLs instead of File objects
    });
    
    // Reset form after submission if needed
    // setFormData({
    //   productName: '',
    //   productDetails: '',
    //   price: '',
    //   sellerName: '',
    //   division: '',
    //   district: '',
    //   images: []
    // });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Sell Your Product</h1>
          <p className="mt-2 text-sm text-gray-600">Fill out the form below to list your product for sale</p>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Product Images */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Images (Max 5)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-dashed hover:border-primary hover:bg-gray-50 border-gray-300 rounded-md cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400">
                      {uploading 
                        ? `Uploading... ${Math.round(uploadProgress)}%` 
                        : formData.images.length > 0 
                          ? `${formData.images.length} image(s) uploaded` 
                          : 'Click to upload images'}
                    </p>
                  </div>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="opacity-0"
                    disabled={uploading || formData.images.length >= 5}
                  />
                </label>
              </div>
              
              {formData.images.length > 0 && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-3">
                    {formData.images.map((imageUrl, index) => (
                      <div key={index} className="relative w-20 h-20 border rounded-md overflow-hidden group">
                        <img 
                          src={imageUrl}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button 
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-gray-500 text-right">
                    {formData.images.length} / 5 images uploaded
                  </p>
                </div>
              )}
            </div>

            {/* Product Name */}
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary placeholder-gray-400"
                placeholder="Enter product name"
                disabled={uploading}
              />
            </div>

            {/* Product Details */}
            <div>
              <label htmlFor="productDetails" className="block text-sm font-medium text-gray-700 mb-1">
                Product Details
              </label>
              <textarea
                id="productDetails"
                name="productDetails"
                rows={4}
                value={formData.productDetails}
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary placeholder-gray-400"
                placeholder="Describe your product in detail"
                disabled={uploading}
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price (BDT)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">৳</span>
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="block w-full pl-8 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary placeholder-gray-400"
                  placeholder="0.00"
                  disabled={uploading}
                />
              </div>
            </div>

            {/* Seller Name */}
            <div>
              <label htmlFor="sellerName" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="sellerName"
                name="sellerName"
                value={formData.sellerName}
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary placeholder-gray-400"
                placeholder="Enter your name"
                disabled={uploading}
              />
            </div>

            {/* Location - Division and District */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Division */}
              <div>
                <label htmlFor="division" className="block text-sm font-medium text-gray-700 mb-1">
                  Division
                </label>
                <select
                  id="division"
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                  disabled={uploading}
                >
                  <option value="">Select Division</option>
                  {bangladeshLocations.divisions.map(division => (
                    <option key={division} value={division}>{division}</option>
                  ))}
                </select>
              </div>

              {/* District (conditional on division selection) */}
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                  District
                </label>
                <select
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  disabled={!formData.division || uploading}
                  className={`block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary ${!formData.division ? 'bg-gray-100' : ''}`}
                >
                  <option value="">{formData.division ? 'Select District' : 'Select division first'}</option>
                  {formData.division && bangladeshLocations.districts[formData.division].map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className={`w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded shadow-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${uploading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={uploading}
              >
                {uploading ? 'Processing...' : 'Submit Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;