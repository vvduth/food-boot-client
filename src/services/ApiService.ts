import axios from "axios";
import type { LoginData, RegistrationData } from "../types/auth";
import type { AddToCartRequest } from "../types/cart";

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
      headers: this.getHeader(),
    });
    return res.data;
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
              headers: this.getHeader()
          })
          return resp.data;
      }
  
  
      static async countTotalActiveCustomers() {
          const resp = await axios.get(`${this.BASE_URL}/orders/unique-customers`, {
              headers: this.getHeader()
          })
          return resp.data;
      }
  
  
      static async getOrderItemById(id: string) {
          const resp = await axios.get(`${this.BASE_URL}/orders/order-item/${id}`, {
              headers: this.getHeader()
          })
          return resp.data;
      }
}
