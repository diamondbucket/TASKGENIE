import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true); // Disable submit button while waiting for the response
    setError(''); // Reset error message

    try {
      // Send POST request to backend API for signup
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);

      // If signup is successful, store the token in localStorage or handle login
      const { token } = response.data;
      localStorage.setItem('authToken', token);

      // Redirect to the login page or dashboard after successful signup
      window.location.href = '/login'; // You can also use `useNavigate` hook for React Router redirection
    } catch (err) {
      setIsSubmitting(false); // Enable submit button again
      setError(err.response?.data?.message || 'Something went wrong, please try again.');
    }
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md sketch-border max-w-lg">
      <h2 className="text-3xl text-center font-bold text-gray-800 font-cursive sketch-text mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message if any */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Create a password"
            required
          />
        </div>
        <div className="text-center">
          <button 
            type="submit" 
            className={`w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} 
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-blue-500 hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
};
export default SignupPage;
