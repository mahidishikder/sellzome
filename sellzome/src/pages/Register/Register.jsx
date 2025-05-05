import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { updateProfile } from 'firebase/auth';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    imageURL: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { name, email, password, imageURL } = formData;

    createUser(email, password)
      .then((res) => {
        updateProfile(res.user, {
          displayName: name,
          photoURL: imageURL
        }).then(() => {
          setSuccess('Registration successful!');
          console.log('User profile updated');
        }).catch((err) => {
          setError('Profile update failed: ' + err.message);
        });
      })
      .catch((err) => {
        setError('Registration failed: ' + err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Register</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />

          {/* Image URL Input */}
          <input
            type="text"
            name="imageURL"
            placeholder="Profile Image URL"
            value={formData.imageURL}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />

          {/* Preview */}
          {formData.imageURL && (
            <div className="mt-2">
              <img
                src={formData.imageURL}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover mx-auto"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
