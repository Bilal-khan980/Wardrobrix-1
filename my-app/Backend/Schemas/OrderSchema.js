const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    items: [
        {
            productId: { type: Number, required: true },
            name: String,
            price: Number,
            imageUrl: String,
            quantity: { type: Number, default: 1 }
        }
    ],
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
