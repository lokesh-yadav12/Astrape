import React from "react";

export default function ItemFilter({ filters, setFilters, onApply }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {/* Search */}
        <input
          placeholder="Search"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
        />

        {/* Category */}
        <input
          placeholder="Category"
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
          className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
        />

        {/* Min Price */}
        <input
          placeholder="Min Price"
          type="number"
          value={filters.minPrice}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, minPrice: e.target.value }))
          }
          className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
        />

        {/* Max Price */}
        <input
          placeholder="Max Price"
          type="number"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
          }
          className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
        />

        {/* Apply Button */}
        <button
          onClick={onApply}
          className="px-6 py-3 rounded-lg bg-indigo-500 text-white font-semibold shadow-md hover:bg-indigo-600 transition-all duration-300 w-full"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
