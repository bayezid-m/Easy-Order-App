import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:4040');

function ChefApp() {
    const [orders, setOrders] = useState([]);
    const venueId = "65f100d0ff90f45e17e57a77"

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:4040/api/v1/order/orderOfVenue/${venueId}`);
            setOrders(response.data.orders.reverse());
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();

        socket.on('newOrder', (newOrder) => {
            setOrders((prevOrders) => [...prevOrders, newOrder]);
        });

        socket.on('updateOrder', (updatedOrder) => {
            setOrders((prevOrders) =>
                prevOrders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
            );
        });

        return () => {
            socket.off('newOrder');
            socket.off('updateOrder');
        };
    }, [socket]);


    useEffect(() => {
        const interval = setInterval(() => {
            fetchOrders();
        }, 3000);
        return () => clearInterval(interval);
      }, []);


    const markReady = async (orderId) => {
        try {
            console.log(orderId)
            const updateOrder = await axios.put(`http://localhost:4040/api/v1/order/update/${orderId}`, { status: 1 });
            if(updateOrder.data.status==="okay"){
                fetchOrders();
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    return (
        <div>
            <h1>Chef Dashboard</h1>
            <ul>
                {orders.map((order) => (
                    <li key={order._id}>
                        {order.item_id.name} - {order.status === false ? 'Pending' : 'Ready'}
                        {order.status === false && <button onClick={() => markReady(order._id)}>Mark Ready</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChefApp;
