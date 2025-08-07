import React from 'react'
import { useState, useEffect } from "react";
import ApiService from "../../../services/ApiService";
import { useError } from "../../common/ErrorDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import type { MenuItem } from "../../../types/menus";
import type { OrderDTO } from '../../../types/order';
const AdminOrdersPage = () => {
    const [orders, setOrders] = useState<OrderDTO[]>([]);
    const { showError, ErrorDisplay } = useError();
    const [filter, setFilter] = useState<string>("all");
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const response = await ApiService.getAllOrders(filter === "all" ? null : filter);
            if (response.statusCode === 200) {
                
                setOrders(response.data.content as OrderDTO[]);
            }
        } catch (error: any) {
            showError(
                error.response?.data?.message ||
                error.message ||
                "An error occurred while fetching orders."
            );
        }
    };

    const handleViewOrder = (orderId: string) => {
        navigate(`/admin/orders/${orderId}`);
    }

    useEffect(() => {
        fetchOrders();
    }, []);
  return (
    <div className="admin-orders">
            <ErrorDisplay />
            <div className="content-header">
                <h1>Orders Management</h1>
                <div className="order-filters">
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All Orders</option>
                        <option value="INITIALIZED">Initialized</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="ON_THE_WAY">On the way</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                        <option value="FAILED">Failed</option>
                    </select>
                </div>
            </div>

            <div className="orders-table">
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>{order.orderItems.reduce((sum, item) => sum + item.quantity, 0)}</td>
                                 <td>€{order.totalAmount.toFixed(2)}</td>
                                <td>
                                    <span className={`status ${order.orderStatus.toLowerCase()}`}>
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td>
                                    <span className={`payment-status ${order.paymentStatus?.toLowerCase() || 'pending'}`}>
                                        {order.paymentStatus || 'PENDING'}
                                    </span>
                                </td>
                                <td className="actions">
                                    <button
                                        className="view-btn"
                                        onClick={() => handleViewOrder(order.id)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))} 
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default AdminOrdersPage