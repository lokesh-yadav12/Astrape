import React, { useState } from 'react';
import API from '../../utils/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    // Send login request with credentials to allow cookies
    const res = await API.post(
      '/auth/login',
      { email, password },
      { withCredentials: true } // ✅ required for cookie to be set
    );

    // Backend sets HttpOnly cookie, no need to read token in JS

    // Save minimal user info locally
    const userObj = { email };
    localStorage.setItem('user', JSON.stringify(userObj));
    onAuth(userObj);

    // Navigate to home page
    nav('/');
  } catch (err) {
    alert(err.response?.data?.message || err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bggradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Please login to your account
        </p>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              required
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              required
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-800 transition disabled:opacity-70"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
