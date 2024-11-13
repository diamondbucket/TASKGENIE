import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // To display error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state
  const navigate = useNavigate(); // For navigation after successful login

  // Handle form data changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true); // Disable the submit button
    setError(''); // Reset the error message

    try {
      // Send POST request to the backend API for login
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      // If login is successful, store the token in localStorage
      const { token } = response.data;
      localStorage.setItem('authToken', token);

      // Redirect to the /tasks page
      navigate('/tasks'); // Redirecting to the tasks page
    } catch (err) {
      setIsSubmitting(false); // Enable the submit button
      setError(err.response?.data?.message || 'Invalid credentials, please try again.');
    }
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md sketch-border max-w-lg">
      <h2 className="text-3xl text-center font-bold text-gray-800 font-cursive sketch-text mb-6">Log In</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Show error message if there's an issue */}

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
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </div>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{' '}
        <a href="/signup" className="text-blue-500 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
