const express = require('express');
const router = express.Router();
const Order = require('../Schemas/OrderSchema.js');

// POST /api/orders/add - Create a new order
router.post('/add', async (req, res) => {
    try {
        const { email, username, items } = req.body;

        // Create a new order instance
        const newOrder = new Order({
            email,
            username,
            items,
            status: 'Pending'
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ error: 'Failed to save order' });
    }
});

// GET /api/orders/:email - Get orders by email
router.get('/:email', async (req, res) => {
    try {
        const orders = await Order.find({ email: req.params.email });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// GET /api/orders - Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// PUT /api/orders/:id/shipped - Update order status to Shipped
router.put('/:id/shipped', async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: 'Shipped' }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

// PUT /api/orders/:id/delivered - Update order status to Delivered
router.put('/:id/delivered', async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: 'Delivered' }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

router.get('/daily', async (req, res) => {
    try {
        const orders = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching daily orders:', error);
        res.status(500).json({ error: 'Failed to fetch daily orders' });
    }
});


module.exports = router;
