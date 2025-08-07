const mongoose = require("mongoose");
const Orders = require("../models/ordersModel");

const orders = async (req, res) => {
    const { name, description, price, inStock, category } = req.body;
    console.log(req.body);
    if (!name || !description || !price || !inStock || !category) {
        return res.status(400).json({ error: 'All fields required' });
    }

    const existingOrder = await Orders.findOne({ name });
    if (existingOrder) {
        return res.status(409).json({ error: 'Order already exists' });
    }

    const order = new Orders({
        name,
        description,
        price,
        inStock,
        category
    });

    await order.save();
    res.json({ message: 'Order created successfully', order });
};

module.exports = { orders };
