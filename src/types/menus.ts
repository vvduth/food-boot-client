// Food delivery app menu item type definitions

import type { Category } from "./categories";

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    categoryId: string; // Changed from Category['id'] to string to avoid potential undefined
    reviews: Review[];
}

export interface Review {
    id: number;
    menuId: number;
    orderId: number;
    userName: string;
    rating: number; // 1-10 scale
    comment: string; // max 500 characters
    menuName: string;
    createdAt: string; // ISO date string from LocalDateTime
}



export interface CreateMenuItemRequest {
    name: string;
    description: string;
    price: string;
    imageFile: string | File| null;
    categoryId: string;
}

export interface UpdateMenuItemRequest extends Partial<CreateMenuItemRequest> {
    id: string;
}