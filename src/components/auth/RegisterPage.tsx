import React, { useState } from "react";
import { useError } from "../common/ErrorDisplay";
import { Link, useNavigate } from "react-router-dom";
import type { RegistrationData } from "../../types/auth";
import ApiService from "../../services/ApiService";

const RegisterPage = () => {
  const { ErrorDisplay, showError } = useError();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegistrationData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.name ||
      !formData.phoneNumber ||
      !formData.address
    ) {
      showError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    const registrationData: RegistrationData = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
    };
    try {
      const response = await ApiService.registerUser(registrationData);
      if (response.statusCode === 200) {
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          phoneNumber: "",
          address: "",
        });
        navigate("/login");
      } else {
        showError(response.message || "Registration failed. Please try again.");
      }
    } catch (error: any) {
      showError("Registration failed. Please try again later.");
      console.error("Registration error:", error.response?.data?.message);
    }
  };

  return (
    <div className="register-page-food">
      <ErrorDisplay />
      <div className="register-card-food">
        <div className="register-header-food">
          <h2 className="register-title-food">Register</h2>
          <p className="register-description-food">
            Create a new account to enjoy our services.
          </p>
        </div>
        <div className="register-content-food">
          <form className="register-form-food" onSubmit={handleSubmit}>
            <div className="register-form-group">
              <label htmlFor="name" className="register-label-food">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="register-input-food"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form-group">
              <label htmlFor="email" className="register-label-food">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="register-input-food"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-form-group">
              <label htmlFor="password" className="register-label-food">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="register-input-food"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form-group">
              <label htmlFor="confirmPassword" className="register-label-food">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="register-input-food"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form-group">
              <label htmlFor="phoneNumber" className="register-label-food">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="register-input-food"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form-group">
              <label htmlFor="address" className="register-label-food">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="register-input-food"
                value={formData.address}
                onChange={handleChange}
                required
              />    
            </div>
            <div>
                <button type="submit" className="register-button-food">Register </button>
            </div>

            <div className="already">
                <Link to="/login" className="register-link-food">
                  Already have an account? Login here
                </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
