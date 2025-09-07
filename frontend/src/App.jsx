import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import API from "./utils/api";
import CartPage from "./components/Cart/CartPage";

export default function App() {
  // 👤 User state
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // ➕ Add product to cart (frontend state only for Products page)
  const [cart, setCart] = useState([]);
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item._id === product._id);
      if (existing) {
        return prev.map((ci) =>
          ci.item._id === product._id ? { ...ci, qty: ci.qty + 1 } : ci
        );
      }
      return [...prev, { item: product, qty: 1 }];
    });
  };

  // 👤 Authentication handler
  const handleAuth = (userObj) => {
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj));
  };

  // 🔒 Logout handler
  const handleLogout = async () => {
    try {
      await API.post("/auth/logout", {}, { withCredentials: true }); // include cookies
      setUser(null); // clear user state
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login onAuth={handleAuth} />} />
        <Route path="/signup" element={<Signup onAuth={handleAuth} />} />

        {/* Cart page: Use backend fetch via useCart hook */}
        <Route path="/cart" element={<CartPage user={user} />} />


        {/* Products page: Pass handleAddToCart to add items */}
        <Route path="/products" element={<Products onAdd={handleAddToCart} />} />

        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </div>
  );
}
