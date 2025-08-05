import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useError } from "../common/ErrorDisplay";
import ApiService from "../../services/ApiService";
import type { MenuItem } from "../../types/menus";
import type { Cart } from "../../types/cart";
const CartPage = () => {
    const [cart, setCart] = useState<Cart|      null>(null);
    const navigate = useNavigate();
    const { ErrorDisplay, showError } = useError();
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {   
                const response = await ApiService.getCart();
                if (response.statusCode === 200) {
                    const cartData = response.data as Cart; 
                    setCart(cartData);
                } else {
                    showError("Failed to fetch cart details");
                }
            } catch (error) {
                
            }
        }

    }, []);

    const handleIncrement = async (menuId:string ) => {
        try {
            const response = await ApiService.incrementItem(menuId);
            if (response.statusCode === 200) {
                setCart(response.data);
            } else {
                showError("Failed to increment item quantity");
            }
        } catch (error: any) {
            showError(error.response?.data?.message || error.message);
        }
    }

    const handleDecrement = async (menuId: string) => {
        try {
            const response = await ApiService.decrementItem(menuId);
            if (response.statusCode === 200) {
                setCart(response.data);
            } 
        } catch (error: any) {
            showError(error.response?.data?.message || error.message);
        }
    }

    const handleRemoveItemFromCart = async (cartItemId: string) => {
        try {
            const response = await ApiService.removeItem(cartItemId);
            if (response.statusCode === 200) {
                setCart(response.data);
            } 
        } catch (error: any) {
            showError(error.response?.data?.message || error.message);
        }
    }

    const handleCheckout = async () => {
        try {
            //const response = await ApiService.
        } catch (error) {
            
        }
    }

  return (
    <div>CartPage</div>
  )
}

export default CartPage