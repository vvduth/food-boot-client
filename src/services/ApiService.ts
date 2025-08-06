import axios from "axios";
import type { LoginData, RegistrationData } from "../types/auth";
import type { AddToCartRequest } from "../types/cart";
import type { CreateReviewRequest } from "../types/review";
import type { OrderDetailsForPayment, UpdateOrderStatusRequest } from "../types/order";

export default class ApiService {
  static BASE_URL = "http://localhost:8090/api/v1";

  static saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  static getToken() {
    return localStorage.getItem("token");
  }

  // save role
  static saveRole(roles: string[]) {
    console.log("Saving roles:", roles);
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  // get role from local storage
  static getRoles() {
    const roles = localStorage.getItem("roles");
    return roles ? JSON.parse(roles) : null;
  }

  // check if user has a specific role
  static hadRole(role: string) {
    const roles = this.getRoles();
    return roles ? roles.includes(role) : false;
  }

  static isAdmin() {
    return this.hadRole("ADMIN");
  }

  static isCustomer() {
    console.log("Checking if user is a customer");
    console.log("User roles:", this.getRoles());
    return this.hadRole("CUSTOMER");
  }

  static isDeliveryPerson() {
    return this.hadRole("DELIVERY");
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
  }

  static isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }
  static getHeader() {
    const token = this.getToken();
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }
  // regiter user
  static async registerUser(registrationData: RegistrationData) {
    const resp = await axios.post(
      `${this.BASE_URL}/auth/register`,
      registrationData
    );
    return resp.data;
  }
  // login user
  static async loginUser(loginData: LoginData) {
    const resp = await axios.post(`${this.BASE_URL}/auth/login`, loginData);
    return resp.data;
  }

  /** user profile management section */
  static async myProfile() {
    const res = await axios.get(`${this.BASE_URL}/users/me`, {
      headers: this.getHeader(),
    });
    return res.data;
  }

  static async updateProfile(formData: FormData) {
    const res = await axios.put(`${this.BASE_URL}/users/update`, formData, {
      headers: {
        ...this.getHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }

  static async deactivateProfile() {
    const res = await axios.delete(`${this.BASE_URL}/users/deactivate`, {
      headers: this.getHeader(),
    });
    return res.data;
  }

  /** menu management section */
  static async getAllCategories() {
    const res = await axios.get(`${this.BASE_URL}/categories/all`, {
    });
    return res.data;
  }

  static async deleteCategory(categoryId: string) {
    const resp = await axios.delete(`${this.BASE_URL}/categories/${categoryId}`, {
      headers: this.getHeader(),
    });
    return resp.data;
  }

  static async getAllMenuByCategoryId(categoryId: string) {
    const resp = await axios.get(`${this.BASE_URL}/menus`, {
      params: {
        categoryId: categoryId,
      },
    });
    return resp.data;
  }

  static async getAllMenus() {
    const resp = await axios.get(`${this.BASE_URL}/menus`, {});
    return resp.data;
  }

  static async searchMenu(search: string) {
    const resp = await axios.get(`${this.BASE_URL}/menus`, {
      params: {
        search: search,
      },
    });
    return resp.data;
  }

  static async getMenuById(id: string) {
    const resp = await axios.get(`${this.BASE_URL}/menus/${id}`);
    return resp.data;
  }

  /**REVIEW SECTION */
  static async getMenuAverageOverallReview(menuId: string) {
    const resp = await axios.get(
      `${this.BASE_URL}/reviews/menu-item/average/${menuId}`
    );
    return resp.data;
  }

  /* CART SECTION */
  static async addItemToCart(cartDTO: AddToCartRequest) {
    const resp = await axios.post(`${this.BASE_URL}/cart/items`, cartDTO, {
      headers: this.getHeader(),
    });
    return resp.data;
  }

  static async incrementItem(menuId: string) {
    const resp = await axios.put(
      `${this.BASE_URL}/cart/items/increment/${menuId}`,
      null,
      {
        headers: this.getHeader(),
      }
    );
    return resp.data;
  }

  static async decrementItem(menuId: string) {
    const resp = await axios.put(
      `${this.BASE_URL}/cart/items/decrement/${menuId}`,
      null,
      {
        headers: this.getHeader(),
      }
    );
    return resp.data;
  }

  static async getCart() {
    const resp = await axios.get(`${this.BASE_URL}/cart`, {
      headers: this.getHeader(),
    });
    return resp.data;
  }
  static async removeItem(cartItemId: string) {
    const resp = await axios.delete(
      `${this.BASE_URL}/cart/items/${cartItemId}`,
      {
        headers: this.getHeader(),
      }
    );
    return resp.data;
  }

  static async getAllOrders(orderStatus: string, page = 0, size = 200) {
    let url = `${this.BASE_URL}/orders/all`;

    if (orderStatus) {
      url = `${this.BASE_URL}/orders/all?orderStatus=${orderStatus}&page=${page}&size=${size}`;
    }

    const resp = await axios.get(url, {
      headers: this.getHeader(),
    });
    return resp.data;
  }
  static async getMyOrders() {
    const resp = await axios.get(`${this.BASE_URL}/orders/me`, {
      headers: this.getHeader(),
    });
    return resp.data;
  }
  static async getOrderById(id: string) {
    const resp = await axios.get(`${this.BASE_URL}/orders/${id}`, {
      headers: this.getHeader(),
    });
    return resp.data;
  }

  static async countTotalActiveCustomers() {
    const resp = await axios.get(`${this.BASE_URL}/orders/unique-customers`, {
      headers: this.getHeader(),
    });
    return resp.data;
  }

  static async getOrderItemById(id: string) {
    const resp = await axios.get(`${this.BASE_URL}/orders/order-item/${id}`, {
      headers: this.getHeader(),
    });
    return resp.data;
  }

  /**REVIEW SECTION */

  static async createReview(body: CreateReviewRequest) {
    const resp = await axios.post(`${this.BASE_URL}/reviews`, body, {
      headers: this.getHeader(),
    });
    return resp.data;
  }

  // order section
  static async placeOrder() {
    const resp = await axios.post(
      `${this.BASE_URL}/orders/checkout`,
      {},
      {
        headers: this.getHeader(),
      }
    );
    return resp.data;
  }

  static async initiateDelivery(body: any) {
    const resp = await axios.post(
      `${this.BASE_URL}/orders/initiate-delivery`,
      body,
      {
        headers: this.getHeader(),
      }
    );
    return resp.data;
  }

  static async updateOrderStatus(body: UpdateOrderStatusRequest) {
    const resp = await axios.put(`${this.BASE_URL}/orders/update`, body, {
      headers: this.getHeader(),
    });
    return resp.data;
  }

  /**PAYMENT SESSION */
  
      //funtion to create payment intent
      static async proceedForPayment(body: OrderDetailsForPayment) {
  
  
          const resp = await axios.post(`${this.BASE_URL}/payments/pay`, body, {
              headers: this.getHeader()
          });
          return resp.data; //return the resp containg the stripe transaction id for this transaction
      }
  
      //TO UPDATE PAYMENT WHEN IT HAS BEEN COMPLETED
      static async updateOrderPayment(body: any) {
          const resp = await axios.put(`${this.BASE_URL}/payments/update`, body, {
              headers: this.getHeader()
          });
          return resp.data;
      }
  
      static async getAllPayments() {
          const resp = await axios.get(`${this.BASE_URL}/payments/all`, {
              headers: this.getHeader()
          });
          return resp.data;
      }
  
      static async getAPaymentById(paymentId: string) {
          const resp = await axios.get(`${this.BASE_URL}/payments/${paymentId}`, {
              headers: this.getHeader()
          });
          return resp.data;
      }
}
