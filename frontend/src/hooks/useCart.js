import { useState, useEffect, useCallback } from "react";
import API from "../utils/api";

export default function useCart(user) {
  const [cart, setCart] = useState([]);

  const fetchCart = useCallback(async () => {
    try {
      if (!user) {
        setCart([]);
        return;
      }
      const res = await API.get("/cart", { withCredentials: true });
      setCart(res.data || []);
    } catch (err) {
      console.error("fetchCart error:", err);
    }
  }, [user]);

  const add = async (productId) => {
    try {
      await API.post("/cart/add", { productId }, { withCredentials: true });
      // ✅ refetch cart after adding
      fetchCart();
    } catch (err) {
      console.error("add error:", err.response?.data || err.message);
    }
  };

  const decrease = async (productId) => {
  try {
    await API.post("/cart/decrease", { productId }, { withCredentials: true });
    fetchCart(); // ✅ refetch cart after decreasing quantity
  } catch (err) {
    console.error("decrease error:", err.response?.data || err.message);
  }
};



  const remove = async (productId, decrease = false) => {
  try {
    await API.post(
      "/cart/remove",
      { productId, decrease },
      { withCredentials: true }
    );
    fetchCart();
  } catch (err) {
    console.error("remove error:", err.response?.data || err.message);
  }
};


  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return { cart, add, remove,decrease };
}




// import { useState, useEffect, useCallback } from "react";
// import API from "../utils/api";

// export default function useCart(user) {
//   const [cart, setCart] = useState([]);

// const fetchCart = useCallback(async () => {
//     try {
//       if (!user) {
//         setCart([]);
//         return;
//       }
//       const res = await API.get("/cart", { withCredentials: true });
//       setCart(res.data || []);
//     } catch (err) {
//       console.error("fetchCart error:", err);
//     }
//   }, [user]);

//   const add = async (productId) => {
//     try {
//       const res = await API.post("/cart/add", { productId },{ withCredentials: true });
//       setCart(res.data); // update cart with backend response
//     } catch (err) {
//       console.error("add error:", err.response?.data || err.message);
//     }
//   };

//   const remove = async (productId) => {
//     try {
//       const res = await API.post("/cart/remove", { productId });
//       setCart(res.data);
//     } catch (err) {
//       console.error("remove error:", err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, [fetchCart]);

//   return { cart, add, remove };
// }
