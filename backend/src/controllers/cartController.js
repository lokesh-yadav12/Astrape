import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";



export const addToCart = async (req, res) => {
  try {
    const userId = req.user; // from authMiddleware
    const { productId } = req.body;

    if (!productId) return res.status(400).json({ error: "ProductId required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // ✅ Declare cart BEFORE using it
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({ userId, items: [{ productId, qty: 1 }] });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId && item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.items.push({ productId, qty: 1 });
      }

      await cart.save();
    }

    // Populate product details
    await cart.populate("items.productId");

    res.json(cart.items);
  } catch (err) {
    console.error("AddToCart Error:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};


export const getCart = async (req, res) => {
  try {
    const userId = req.user; // from authMiddleware

    // Get the cart and populate product details
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) return res.json([]); // return empty array if cart not found

    // Transform to include `item` key for frontend
    const cartItems = cart.items.map((ci) => ({
      qty: ci.qty,
      item: ci.productId, // this contains the populated product
    }));

    console.log(cartItems);

    res.json(cartItems);
  } catch (err) {
    console.error("GetCart Error:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId, decrease } = req.body; // ✅ add decrease flag
    const cart = await Cart.findOne({ userId: req.user });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (i) => i.productId.toString() === productId
    );

    if (itemIndex === -1) return res.status(404).json({ error: "Item not found" });

    if (decrease && cart.items[itemIndex].qty > 1) {
      // ✅ decrease quantity by 1
      cart.items[itemIndex].qty -= 1;
    } else {
      // remove item completely
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();

    // ✅ populate product details before sending
    const populatedCart = await cart.populate("items.productId");

    // Transform for frontend
    const cartItems = populatedCart.items.map((ci) => ({
      qty: ci.qty,
      item: ci.productId,
    }));

    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//today



// import Cart from "../models/Cart.js";

// export const addToCart = async (req, res) => {
//   try {
//     const { itemId, quantity } = req.body;
//     let cart = await Cart.findOne({ userId: req.user });

//     if (!cart) {
//       cart = await Cart.create({ userId: req.user, items: [{ itemId, quantity }] });
//     } else {
//       const existing = cart.items.find(i => i.itemId.toString() === itemId);
//       if (existing) existing.quantity += quantity;
//       else cart.items.push({ itemId, quantity });
//       await cart.save();
//     }
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.user }).populate("items.itemId");
//     res.json(cart || { items: [] });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const removeFromCart = async (req, res) => {
//   try {
//     const { itemId } = req.body;
//     const cart = await Cart.findOne({ userId: req.user });
//     cart.items = cart.items.filter(i => i.itemId.toString() !== itemId);
//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
