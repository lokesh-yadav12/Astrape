import React, { useEffect, useState } from "react";
import API from "../utils/api";
import ItemFilter from "../components/Item/ItemFilter";

export default function Products({ onAdd }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");

        // ✅ Fix for image path
        const data = res.data.map((p) => ({
          ...p,
          image:
            p.image ||
            // ? p.image.startsWith("http")
            //   ? p.image // already full URL (new uploads)
            //   : `http://localhost:5000/uploads/${p.image}` // old DB entries (filename only)
            "",
        }));
        console.log("Fetched products:", res.data);

        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Filter products
  const applyFilters = () => {
    const filtered = products.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesCategory = filters.category
        ? p.category?.toLowerCase().includes(filters.category.toLowerCase())
        : true;
      const matchesMinPrice = filters.minPrice
        ? p.price >= parseFloat(filters.minPrice)
        : true;
      const matchesMaxPrice = filters.maxPrice
        ? p.price <= parseFloat(filters.maxPrice)
        : true;

      return (
        matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice
      );
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      {/* Filter Section */}
      <ItemFilter
        filters={filters}
        setFilters={setFilters}
        onApply={applyFilters}
      />

      {/* Product Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No products found.
          </p>
        ) : (
          filteredProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              )}
              <h2 className="text-lg font-bold">{p.name}</h2>
              <p className="text-gray-600 mt-1">{p.description}</p>
              <p className="text-indigo-600 font-semibold mt-2">₹ {p.price}</p>
              <button
                onClick={() => onAdd(p)}
                className="mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
