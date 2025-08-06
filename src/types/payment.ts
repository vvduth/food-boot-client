// Payment-related TypeScript types for the food delivery application

/**
 * Payment status enumeration matching backend PaymentStatus enum
 */
export enum PaymentStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED'
}

/**
 * Payment gateway enumeration matching backend PaymentGateway enum
 */
export enum PaymentGateway {
    STRIPE = 'STRIPE',
    PAYPAL = 'PAYPAL',
    CASH = 'CASH'
}

/**
 * Payment DTO interface matching the Java backend PaymentDTO class
 * Used for payment data transfer between frontend and API
 */
export interface PaymentDTO {
    /** Unique identifier for the payment */
    id?: number;
    
    /** ID of the associated order */
    orderId?: number;
    
    /** Amount paid - using number type for frontend calculations */
    amount?: number;
    
    /** Status of the payment (e.g., SUCCESS, FAILED) */
    paymentStatus?: PaymentStatus;
    
    /** Unique identifier for the transaction */
    transactionId?: string;
    
    /** Payment gateway used (e.g., PAYPAL, STRIPE) */
    paymentGateway?: PaymentGateway;
    
    /** Reason for payment failure, if applicable */
    failureReason?: string;
    
    /** Indicates if the payment was successful */
    success?: boolean;
    
    /** Date and time of the payment - using string to match backend LocalDateTime serialization */
    paymentDate?: string;
    
    /** Associated order details - assuming OrderDTO exists */
    order?: any; // TODO: Replace with proper OrderDTO type when available
    
    /** User who made the payment - assuming UserDto exists */
    user?: any; // TODO: Replace with proper UserDto type when available
}

/**
 * Payment creation request interface for new payment submissions
 */
export interface CreatePaymentRequest {
    orderId: number;
    amount: number;
    paymentGateway: PaymentGateway;
    transactionId?: string;
}

/**
 * Payment update request interface for modifying existing payments
 */
export interface UpdatePaymentRequest {
    paymentStatus?: PaymentStatus;
    transactionId?: string;
    failureReason?: string;
    success?: boolean;
}

