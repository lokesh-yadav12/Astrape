import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qty: { type: Number, default: 1 }
    }
  ]
});

export default mongoose.model("Cart", cartSchema);
//today



// import mongoose from "mongoose";

// const cartSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   items: [
//     {
//       itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
//       quantity: { type: Number, default: 1 }
//     }
//   ]
// });

// export default mongoose.model("Cart", cartSchema);
