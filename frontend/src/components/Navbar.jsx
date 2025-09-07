import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();

  const handleLogoutClick = () => {
    if (onLogout) onLogout(); // clear user & localStorage
    nav("/login");             // redirect to login
  };

  return (
    <header className="bg-indigo-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Astrape
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/cart"
            className="flex items-center gap-1 hover:text-gray-200 transition"
          >
            <ShoppingCart size={18} />
            Cart
          </Link>

          {/* Add Product Button visible for all logged-in users */}
          {user && (
            <Link
              to="/add-product"
              className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Add Product
            </Link>
          )}

          {user ? (
            <>
              <span className="text-sm font-medium">
                Hi, {user.name || user.username}
              </span>
              <button
                onClick={handleLogoutClick}
                className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-gray-200 transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700 px-4 py-4 space-y-3">
          <Link
            to="/cart"
            className="flex items-center gap-2 hover:text-gray-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingCart size={18} />
            Cart
          </Link>

          {/* Add Product Button for mobile */}
          {user && (
            <Link
              to="/add-product"
              className="block bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              onClick={() => setMenuOpen(false)}
            >
              Add Product
            </Link>
          )}

          {user ? (
            <>
              <span className="block">Hi, {user.name || user.username}</span>
              <button
                onClick={() => {
                  handleLogoutClick();
                  setMenuOpen(false);
                }}
                className="w-full bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block hover:text-gray-200 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                onClick={() => setMenuOpen(false)}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
