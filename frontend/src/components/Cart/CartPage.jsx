import React from "react";
import useCart from "../../hooks/useCart";

export default function CartPage({ user }) {
  const { cart, add, remove } = useCart(user);

  const total = cart.reduce(
    (sum, ci) => sum + (ci.item?.price || 0) * (ci.qty || 1),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center sm:text-left">
          Your Shopping Cart
        </h2>

        {cart.length === 0 ? (
          <div className="bg-white shadow-lg rounded-xl p-10 text-center">
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="grid grid-cols-1   gap-6">
              {cart.map((ci) => (
                <div
                  key={ci.item?._id || Math.random()}
                  className="bg-white shadow-md rounded-xl p-5 px-16 flex flex-col sm:flex-row items-center gap-4 hover:shadow-lg transition"
                >
                  <img
                    src={ci.item?.image || "/placeholder.png"}
                    alt={ci.item?.name || "Product"}
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                  <div className="flex-grow flex flex-col justify-between w-full">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {ci.item?.name || "Unknown Product"}
                    </h3>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => remove(ci.item._id, true)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-yellow-600 transition"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border rounded-lg bg-gray-100 font-medium">
                        {ci.qty || 1}
                      </span>
                      <button
                        onClick={() => add(ci.item._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => remove(ci.item._id)}
                        className="ml-auto px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="font-bold text-black-600 mt-3 text-lg">
                      ₹ {ci.item?.price || 0} x {ci.qty || 1} = ₹{" "}
                      {(ci.item?.price || 0) * (ci.qty || 1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Section */}
            <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-gray-500 text-sm">Total Amount</p>
                <p className="text-2xl font-bold text-gray-800">₹ {total}</p>
              </div>
              <button className="w-full sm:w-auto bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-700 transition">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


// import React from "react";
// export default function CartPage({ cart = [], onRemove }) {
//   // Compute total price
//   const total = cart.reduce(
//     (sum, ci) => sum + (ci.item?.price || 0) * (ci.qty || 1),
//     0
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
//           Your Shopping Cart
//         </h2>

//         {cart.length === 0 ? (
//           <div className="bg-white shadow rounded-lg p-8 text-center">
//             <p className="text-gray-500 text-lg">Your cart is empty.</p>
//           </div>
//         ) : (
//           <>
//             {/* Cart Items */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {cart.map((ci) => (
//                 <div
//                   key={ci.item?._id || Math.random()}
//                   className="bg-white shadow rounded-xl p-4 flex gap-4 items-center hover:shadow-lg transition"
//                 >
//                   <img
//                     src={ci.item?.image || "/placeholder.png"}
//                     alt={ci.item?.name || "Product"}
//                     className="w-28 h-24 object-cover rounded-lg border"
//                   />
//                   <div className="flex-grow">
//                     <h3 className="font-semibold text-lg text-gray-800">
//                       {ci.item?.name || "Unknown Product"}
//                     </h3>
//                     <p className="text-sm text-gray-600">Qty: {ci.qty || 1}</p>
//                     <p className="font-bold text-pink-600 mt-2">
//                       ₹ {ci.item?.price || 0}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => onRemove(ci.item?._id)}
//                     className="text-red-500 hover:text-red-700 text-sm font-medium"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Checkout Section */}
//             <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div className="text-center sm:text-left">
//                 <p className="text-gray-500 text-sm">Total Amount</p>
//                 <p className="text-2xl font-bold text-gray-800">₹ {total}</p>
//               </div>
//               <button className="w-full sm:w-auto bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-700 transition">
//                 Proceed to Checkout
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
