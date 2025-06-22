import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Manageorders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders');
            }
        };

        fetchOrders();
    }, []);

    const calculateDeliveryDate = (orderDate) => {
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(deliveryDate.getDate() + 5);
        return deliveryDate.toDateString();
    };

    const calculateTotalCost = (items) => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleShipped = async (orderId) => {
        try {
            await axios.put(`/orders/${orderId}/shipped`);
            // Fetch updated orders after update
            const response = await axios.get('/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error updating order status:', error);
            setError('Failed to update order status');
        }
    };

    const handleDelivered = async (orderId) => {
        try {
            await axios.put(`/orders/${orderId}/delivered`);
            // Fetch updated orders after update
            const response = await axios.get('/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error updating order status:', error);
            setError('Failed to update order status');
        }
    };

    if (error) {
        return <div style={{ color: 'white', textAlign: 'center', paddingTop: '20px' }}>Error: {error}</div>;
    }

    if (orders.length === 0) {
        return <div style={{ color: 'white', textAlign: 'center', paddingTop: '20px' }}>Loading orders...</div>;
    }

    return (
        <div className="container-fluid" style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
            <div className="container py-5">
                <h2 className="mb-4" style={{ color: 'yellow', fontWeight: 'bold', textAlign: 'center' }}>ALL ORDERS</h2>
                {orders.map(order => (
                    <div key={order._id} className="card mb-4" style={{ backgroundColor: 'black', border: '4px solid white', borderRadius: '10px' }}>
                        <div className="card-header" style={{ backgroundColor: 'black', color: 'white' }}>
                            <h5 className="card-title" style={{ color: 'yellow', fontWeight: 'bold' }}>Order #{order._id}</h5>
                            <p>Name: {order.username}</p>
                            <p>Email: {order.email}</p>
                            <p>Order Date: {new Date(order.orderDate).toDateString()}</p>
                            <p>Delivery Date: {calculateDeliveryDate(order.orderDate)}</p>
                            <p>Status: {order.status}</p>
                            <p>Total Cost: ${calculateTotalCost(order.items)}</p>
                            <div>
                                <button className="btn btn-primary mr-2" onClick={() => handleShipped(order._id)}>Mark as Shipped</button>
                                <span style={{ paddingLeft: "50px" }}><button className="btn btn-success" onClick={() => handleDelivered(order._id)}>Mark as Delivered</button></span>
                            </div>
                        </div>
                        <div className="card-body" style={{ backgroundColor: 'black', color: 'white' }}>
                            <ul className="list-group list-group-flush">
                                {order.items.map(item => (
                                    <li key={item.productId} className="list-group-item" style={{ backgroundColor: 'black', color: 'white', borderBottom: '1px solid white' }}>
                                        <div className="row">
                                            <div className="col-2">
                                                <img src={item.imageUrl} alt={item.name} className="img-fluid" style={{ maxHeight: '100px' }} />
                                            </div>
                                            <div className="col-4 d-flex align-items-center" style={{ color: 'white', fontWeight: 'bold' }}>
                                                {item.name}
                                            </div>
                                            <div className="col-2 d-flex align-items-center">
                                                Quantity: {item.quantity}
                                            </div>
                                            <div className="col-2 d-flex align-items-center">
                                                ${item.price * item.quantity}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Manageorders;
