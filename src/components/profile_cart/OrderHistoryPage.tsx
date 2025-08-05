import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useError } from "../common/ErrorDisplay";
import ApiService from "../../services/ApiService";
import type { OrderDTO, OrderItemDTO } from "../../types/order";

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const { ErrorDisplay, showError } = useError();
  const [orders, setOrders] = useState<OrderDTO[]>([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await ApiService.getMyOrders();
        if (response.statusCode === 200) {
          const orderData = response.data as OrderDTO[];
          const enhanceOrders = [];
          for (const order of orderData) {
            const enhanceItems = [];
            for (const item of order.orderItems) {
              const itemResponse = await ApiService.getOrderItemById(item.id);

              const orderItem = itemResponse.data as OrderItemDTO;

              if (itemResponse.statusCode === 200) {
                enhanceItems.push({
                  ...item,
                  hasReview: orderItem.menu.reviews.some(
                    (review) => review.orderId === order.user.id
                  ),
                });
              } else {
                enhanceItems.push(item);
              }

              enhanceOrders.push({
                ...order,
                orderItems: enhanceItems,
              });
            }
          }
          setOrders(enhanceOrders);
        }
      } catch (error: any) {
        showError(error.response?.data?.message || error.message);
      }
    };
    fetchOrderHistory();
  }, []);

  return <div></div>;
};

export default OrderHistoryPage;
