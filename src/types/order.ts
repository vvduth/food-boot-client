
// Order-related TypeScript types matching Java backend DTOs

import type { MenuItem } from "./menus";
import type { PaymentStatus } from "./payment";
import type { UserDto, UserProfile } from "./user";


/**
 * Order status enumeration matching backend OrderStatus enum
 */
export enum OrderStatus {
   INITIALIZED = "INITIALIZED",
    CONFIRMED = "CONFIRMED",
    ON_THE_WAY = "ON_THE_WAY",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    FAILED = "FAILED",
}



export enum PaymentGateway {
    STRIPE = "STRIPE",
    PAYPAL = "PAYPAL",
    FLUTTERWAVE = "FLUTTERWAVE",
    PAYSTACK = "PAYSTACK",
    RAZORPAY = "RAZORPAY"
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

export interface EnhancedOrderItemDTO extends OrderItemDTO {
    /** Indicates if the user has left a review for this item */
    hasReview?: boolean;
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

export interface EnhancedOrderDTO extends OrderDTO {
    
    orderItems: EnhancedOrderItemDTO[];
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
    id: string;
    orderStatus: OrderStatus;
}

export interface OrderDetailsForPayment {
    orderId: string;
    amount: number;
}