// Food delivery app menu item type definitions

import type { Category } from "./categories";

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryId: Category['id'];
    reviews: Review[];
}

export interface Review {
    id: number;
    rating: number;
    comment: string;
    userId: number;
    menuItemId: number;
    createdAt: string;
    updatedAt: string;
}



export interface CreateMenuItemRequest {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryId: number;
}

export interface UpdateMenuItemRequest extends Partial<CreateMenuItemRequest> {
    id: number;
}