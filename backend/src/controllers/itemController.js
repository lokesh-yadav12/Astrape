import Item from "../models/Item.js";

export const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = minPrice;
    if (maxPrice) filter.price.$lte = maxPrice;

    const items = await Item.find(filter);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
