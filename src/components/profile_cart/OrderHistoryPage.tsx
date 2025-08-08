import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useError } from "../common/ErrorDisplay";
import ApiService from "../../services/ApiService";
import type { EnhancedOrderDTO, EnhancedOrderItemDTO, OrderDTO, OrderItemDTO } from "../../types/order";

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const { ErrorDisplay, showError } = useError();
  
  // Fix: Use EnhancedOrderDTO instead of the union type
  const [orders, setOrders] = useState<EnhancedOrderDTO[]>([]);

   useEffect(() => {
          // Define an asynchronous function to fetch orders
          const fetchOrders = async () => {
              try {
                  // Call the API service to get the current user's orders
                  const response = await ApiService.getMyOrders();
  
                  // Check if the API call was successful (status code 200)
                  if (response.statusCode === 200) {
                      const enhancedOrders: EnhancedOrderDTO[] = [];
                      // Iterate over each order to enhance its items
                      const myOrdersResponse = response.data as OrderDTO[];
                      for (const order of myOrdersResponse) {
                          const enhancedItems: EnhancedOrderItemDTO[]  = [];
                          // Iterate over each item within the current order
                          for (const item of order.orderItems) {
                              // Fetch details for each order item by its ID
                              const itemResponse = await ApiService.getOrderItemById(item.id);
  
                              // If item details are successfully fetched
                              if (itemResponse.statusCode === 200) {
                                  const itemData = itemResponse.data as OrderItemDTO;
                                  enhancedItems.push({
                                      ...item,
                                      // Determine if the item has a review associated with the current order
                                      hasReview: itemData.menu.reviews.some(
                                          review => review.orderId === Number(order.id)
                                      )
                                  });
                              } else {
                                  // Return the original item if fetching details failed
                                  enhancedItems.push(item);
                              }
                          }
                          // Add the order with its newly enhanced items to the list
                          enhancedOrders.push({ ...order, orderItems: enhancedItems });
                      }
                      // Update the state with the enhanced orders
                      setOrders(enhancedOrders);
                  }
              } catch (error:any) {
                  // Catch and display any errors that occur during the fetch operation
                  showError(error.response?.data?.message || error.message);
              }
          };
  
          fetchOrders();
      }, []);

  // Format date helper function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Navigate to review page
  const handleLeaveReview = (orderId: string, menuId: string) => {
    navigate(`/leave-review?orderId=${orderId}&menuId=${menuId}`);
  };

  // Show empty state if no orders
  if (!orders || orders.length === 0) {
    return (
      <div className="order-history-container">
        <div className="no-orders-message">
          No orders found.
          <p>Please check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      {/* Render the ErrorDisplay component */}
      <ErrorDisplay />
      <h1 className="order-history-title">Your Order History</h1>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">Order ID: {order.id}</span>
              <span className="order-date">
                Date: {formatDate(order.orderDate)}
              </span>
              <span className="order-status">
                Status: <span className={`status-${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</span>
              </span>
              <span className="order-total">
                Total: €{order.totalAmount.toFixed(2)}
              </span>
            </div>
            <div className="order-items">
              <h2 className="order-items-title">Order Items:</h2>
              {order.orderItems.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-details">
                    <span className="item-name">{item.menu.name}</span>
                    <span className="item-quantity">Quantity: {item.quantity}</span>
                    <span className="item-price">
                      Price: €{item.pricePerUnit.toFixed(2)}
                    </span>
                    <span className="subtotal">
                      Subtotal: €{item.subTotal.toFixed(2)}
                    </span>
                    {order.orderStatus.toLowerCase() === 'delivered' && !item.hasReview && (
                      <button
                        className="review-button"
                        onClick={() => handleLeaveReview(order.id, item.menu.id)}
                      >
                        Leave Review
                      </button>
                    )}
                  </div>
                  <div className="item-image-container">
                    <img src={item.menu.imageUrl} alt={item.menu.name} className="item-image" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;