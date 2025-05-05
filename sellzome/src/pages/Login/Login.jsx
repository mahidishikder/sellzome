import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaXTwitter } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../Providers/AuthProvider';

function Login() {
  const { loginUser } = useContext(AuthContext);  // Get loginUser from context
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevState => !prevState);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      // Call loginUser from AuthContext
      loginUser(email, password)
        .then(() => {
          setIsSubmitting(false);
          navigate('/'); // Redirect user to dashboard or home
        })
        .catch((error) => {
          setIsSubmitting(false);
          const errorMessage = error.message;
          if (errorMessage.includes('user-not-found')) {
            setErrors({ ...errors, email: 'No user found with this email' });
          } else if (errorMessage.includes('wrong-password')) {
            setErrors({ ...errors, password: 'Incorrect password' });
          } else {
            setErrors({ ...errors, general: 'An error occurred. Please try again.' });
          }
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-primary to-violet-400 py-4 px-6">
          <h2 className="text-2xl font-bold text-white text-center">Welcome Back</h2>
          <p className="text-blue-100 text-center text-sm mt-1">Login to access your account</p>
        </div>

        <div className="p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
                  onClick={togglePasswordVisibility}
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-primary text-white py-3 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Processing...' : 'Login'}
            </button>
          </form>

          {/* Registration Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
