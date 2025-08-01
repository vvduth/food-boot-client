import React from "react";
import ApiService from "../../services/ApiService";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = ApiService.isAuthenticated();
  const isCustomer = ApiService.isCustomer();
  const isAdmin = ApiService.isAdmin();
  const isDeliveryPerson = ApiService.isDeliveryPerson();
  const navigate = useNavigate();

  const handleLogout = () => {
    const isLogout = window.confirm("Are you sure you want to logout?");
    if (isLogout) {
      ApiService.logout();
    }
  };
  return (
    <nav>
      <div>
        <Link to={"/"} className="logo-link">
          Foodboot
        </Link>
      </div>
      <div className="desktop-nav">
        <Link to={"/home"}>Home</Link>
        <Link to={"/menu"}>Menu</Link>
        <Link to={"/categories"}>Category</Link>
        {isAuthenticated ? (
          <>
            <Link to={"/profile"} className="nav-link">
              Profile
            </Link>
            <Link to={"/orders"} className="nav-link">
              Orders
            </Link>
            {isCustomer && (
              <Link to={"/cart"} className="nav-link">
                Cart
              </Link>
            )}
            {isDeliveryPerson && (
              <Link to={"/deliveries"} className="nav-link">
                Deliveries
              </Link>
            )}
            {isAdmin && (
              <Link to={"/admin"} className="nav-link">
                Admin
              </Link>
            )}
            <button className="nav-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            <Link to={"/register"} className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
