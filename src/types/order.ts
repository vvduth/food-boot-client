
// Order-related TypeScript types matching Java backend DTOs

import type { MenuItem } from "./menus";
import type { UserDto, UserProfile } from "./user";


/**
 * Order status enumeration matching backend OrderStatus enum
 */
export enum OrderStatus {
   INITIALIZED,
    CONFIRMED,
    ON_THE_WAY,
    DELIVERED,
    CANCELLED,
    FAILED,
}

/**
 * Payment status enumeration matching backend PaymentStatus enum
 */
export enum PaymentStatus {
    PENDING,
    PROCESSING,
    COMPLETED,
    FAILED,
    REFUNDED,
    CANCELLED
}

export enum PaymentGateway {
    STRIPE,
    PAYPAL,
    FLUTTERWAVE,
    PAYSTACK,
    RAZORPAY
}

/**
 * Order item DTO matching backend OrderItemDTO
 * Represents individual items within an order
 */
export interface OrderItemDTO {
    /** Unique identifier for the order item */
    id: string;
    
    /** Quantity of this menu item ordered */
    quantity: number;
    
    /** Reference to the menu item ID */
    menuId: number;
    
    /** Full menu item details */
    menu: MenuItem;
    
    /** Price per unit for this item */
    pricePerUnit: number;
    
    /** Calculated subtotal (quantity * pricePerUnit) */
    subTotal: number;
}

/**
 * Main order DTO matching backend OrderDTO
 * Represents a complete customer order
 */
export interface OrderDTO {
    /** Unique identifier for the order */
    id: string;
    
    /** When the order was placed (ISO string format) */
    orderDate: string;
    
    /** Total amount for the entire order */
    totalAmount: number;
    
    /** Current status of the order */
    orderStatus: OrderStatus;
    
    /** Payment status for this order */
    paymentStatus: PaymentStatus;
    
    /** Customer who placed the order */
    user: UserProfile;
    
    /** List of items in this order */
    orderItems: OrderItemDTO[];
}

/**
 * Helper type for creating new orders (without server-generated fields)
 */
export interface CreateOrderRequest {
    orderItems: {
        menuId: number;
        quantity: number;
    }[];
}

/**
 * Helper type for order status updates
 */
export interface UpdateOrderStatusRequest {
    orderStatus: OrderStatus;
}