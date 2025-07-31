import React, { useState } from "react";
import { useError } from "../common/ErrorDisplay";
import { useNavigate } from "react-router-dom";
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
            navigate("/login")
        } else {
            showError(response.message || "Registration failed. Please try again.");
        }
    } catch (error:any) {
        showError("Registration failed. Please try again later.");
        console.error("Registration error:", error.response?.data?.message);
    }
  };

  return <div>RegisterPage</div>;
};

export default RegisterPage;
