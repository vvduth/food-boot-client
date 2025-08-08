import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useError } from "../../common/ErrorDisplay";
import ApiService from "../../../services/ApiService";
import type { PaymentDTO } from "../../../types/payment";
const AdminPaymentDetailsPage = () => {
  const { id } = useParams();
  const [payment, setPayment] = useState<PaymentDTO | null>(null);
  const { ErrorDisplay, showError } = useError();
  const navigate = useNavigate();

  const fetchPayment = async () => {
    try {
      const response = await ApiService.getPaymentById(id!);
      if (response.statusCode === 200) {
        setPayment(response.data as PaymentDTO);
      }
    } catch (error: any) {
      showError(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching payment details."
      );
    }
  };

  useEffect(() => {
    fetchPayment();
  }, [id]);

  if (!payment) {
    return <div className="error">Payment not found</div>;
  }

  if (payment) {
    return (
      <div className="admin-payment-detail">
        <ErrorDisplay />
        <div className="content-header">
          <h1>Payment Details #{payment.id}</h1>
          <button
            className="back-btn"
            onClick={() => navigate("/admin/payments")}
          >
            Back to Payments
          </button>
        </div>

        <div className="payment-summary">
          <div className="payment-info">
            <div className="info-row">
              <span className="label">Payment Date:</span>
              <span className="value">
                {new Date(payment.paymentDate).toLocaleString()}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Status:</span>
              <span
                className={`status ${payment.paymentStatus!.toLowerCase()}`}
              >
                {payment.paymentStatus}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Amount:</span>
              <span className="value">${payment.amount!.toFixed(2)}</span>
            </div>
            <div className="info-row">
              <span className="label">Payment Gateway:</span>
              <span className="value">{payment.paymentGateway}</span>
            </div>
            <div className="info-row">
              <span className="label">Transaction ID:</span>
              <span className="value">{payment.transactionId}</span>
            </div>
            <div className="info-row">
              <span className="label">Successful:</span>
              <span className="value">{payment.success ? "Yes" : "No"}</span>
            </div>
          </div>

          <div className="order-info">
            <h3>Order Information</h3>
            <div className="info-row">
              <span className="label">Order ID:</span>
              <span className="value">#{payment.order!.id}</span>
            </div>
            <div className="info-row">
              <span className="label">Order Date:</span>
              <span className="value">
                {new Date(payment.order!.orderDate).toLocaleString()}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Total Amount:</span>
              <span className="value">
                ${payment.order!.totalAmount.toFixed(2)}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Order Status:</span>
              <span
                className={`status ${payment
                  .order!.orderStatus.toLowerCase()
                  .replace("_", "-")}`}
              >
                {payment.order!.orderStatus.replace("_", " ")}
              </span>
            </div>
          </div>
        </div>

        {payment.user && (
          <div className="customer-info">
            <h3>Customer Information</h3>
            <div className="customer-details">
              <img
                src={payment.user.profileUrl}
                alt={payment.user.name}
                className="customer-image"
              />
              <div className="customer-data">
                <div className="info-row">
                  <span className="label">Name:</span>
                  <span className="value">{payment.user.name}</span>
                </div>
                <div className="info-row">
                  <span className="label">Email:</span>
                  <span className="value">{payment.user.email}</span>
                </div>
                <div className="info-row">
                  <span className="label">Phone:</span>
                  <span className="value">{payment.user.phoneNumber}</span>
                </div>
                <div className="info-row">
                  <span className="label">Address:</span>
                  <span className="value">{payment.user.address}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="order-items">
          <h3>Order Items</h3>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {payment.order && (
                <>
                  {payment.order.orderItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="item-details">
                          <img
                            src={item.menu.imageUrl}
                            alt={item.menu.name}
                            className="admin-item-image"
                          />
                          <div>
                            <div className="item-name">{item.menu.name}</div>
                            <div className="item-description">
                              {item.menu.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>€{item.pricePerUnit.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>€{item.subTotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default AdminPaymentDetailsPage;
