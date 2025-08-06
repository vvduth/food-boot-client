// Cart type definitions based on backend API response structure

import type { MenuItem } from "./menus";



export interface CartItem {
    id: string;
    menu: MenuItem;
    quantity: number;
    pricePerUnit: number;
    subTotal: number;
}

export interface Cart {
    id: number;
    cartItems: CartItem[];
    quantity: number;
    totalAmount: number;
}

// API response wrapper for cart data
export interface CartResponse {
    statusCode: number;
    message: string;
    data: Cart;
}

// Type for adding items to cart (request payload)
export interface AddToCartRequest {
    menuId: string;
    quantity: string;
}

// Type for updating cart item quantity
export interface UpdateCartItemRequest {
    cartItemId: number;
    quantity: number;
}