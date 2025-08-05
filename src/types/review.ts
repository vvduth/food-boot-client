/**
 * Review type definition matching Spring Boot ReviewDTO
 * Used for customer reviews of menu items and orders
 */
export interface Review {
    id?: number;
    menuId?: number;
    orderId?: number;
    userName?: string;
    rating: number; // Required field, 1-10 range
    comment?: string; // Optional, max 500 characters
    menuName?: string;
    createdAt?: string; // ISO date string from LocalDateTime
}

/**
 * Type for creating new reviews (omits auto-generated fields)
 */
export interface CreateReviewRequest {
    menuId: string;
    orderId: string;
    rating: string; // Required, 1-10 range
    comment?: string; // Optional, max 500 characters
}

/**
 * Type for updating existing reviews
 */
export interface UpdateReviewRequest {
    rating?: number; // 1-10 range
    comment?: string; // Optional, max 500 characters
}