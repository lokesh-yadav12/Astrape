import Product from "../models/Product.js";



// ➕ Add product
export const addProduct = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;

    // Build image URL if file uploaded
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : req.body.image || "";

    const product = await Product.create({
      name,
      category,
      price,
      description,
      image: imageUrl,
      createdBy: req.user || null,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🔍 Get products with filters
export const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    let filter = {};

    if (search) filter.name = { $regex: search, $options: "i" };
    if (category) filter.category = { $regex: category, $options: "i" };
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};





//today



// import Product from "../models/Product.js";

// export const addProduct = async (req, res) => {
//   try {
//     const { name, price, description } = req.body;

//     if (!name || !price || !description) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Build full image URL (using backend server host)
//     const imageUrl = req.file
//       ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
//       : null;

//     const product = await Product.create({
//       name,
//       price,
//       description,
//       image: imageUrl,
//     });

//     res.status(201).json(product);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     console.log(products);
//     res.json(products);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
