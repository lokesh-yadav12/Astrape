import React, { useState, useEffect } from "react";
import API from "../utils/api";
import ItemFilter from "../components/Item/ItemFilter";
import ItemList from "../components/Item/ItemList";
import useCart from "../hooks/useCart";
import Products from "./Products";

export default function Home({ user }) {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const { add } = useCart(user);

  const fetchItems = async () => {
  try {
    const q = [];
    if (filters.search) q.push(`search=${encodeURIComponent(filters.search)}`);
    if (filters.category) q.push(`category=${encodeURIComponent(filters.category)}`);
    if (filters.minPrice) q.push(`minPrice=${filters.minPrice}`);
    if (filters.maxPrice) q.push(`maxPrice=${filters.maxPrice}`);
    const qs = q.length ? `?${q.join("&")}` : "";

    const res = await API.get(`/products${qs}`); // ✅ backend supports filters now
    setItems(res.data);
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    fetchItems();
  }, []);

  const onApply = () => fetchItems();

const onAdd = async (id) => {
  try {
    await add(id, 1);  // ✅ sends { itemId: id, quantity: 1 }
    alert("Added to cart");
  } catch (err) {
    console.error(err);
    if (err.response?.status === 401) {
      alert("Please login to add to cart");
    } else {
      alert("Failed to add");
    }
  }
};




  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      {/* <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Welcome to ClothNest
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          Discover stylish clothing at unbeatable prices ✨
        </p>
      </section> */}

      {/* Filters + Items */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Filter Products
          </h2>
          <ItemFilter
            filters={filters}
            setFilters={setFilters}
            onApply={onApply}
          />
        </div>

        {/* Item List */}
        <div>
          {items.length === 0 ? (
            <div className="text-center py-12 bg-white shadow rounded-lg">
              <p className="text-gray-500 text-lg">
                No items found. Try adjusting filters.
              </p>
            </div>
          ) : (
            <ItemList items={items} onAdd={onAdd} />
          )}
        </div>
      </div>
    </div>
  );
}
