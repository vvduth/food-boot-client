import React, { useState, type ChangeEvent } from "react";
import { useError } from "../common/ErrorDisplay";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

const LoginPage = () => {
  const { ErrorDisplay, showError } = useError();
  const navigate = useNavigate();
  const { state } = useLocation();
  const redirectPath = state?.from?.pathname || "/home";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      showError("Email and password are required");
      return;
    }

    try {
      // Assuming ApiService has a loginUser method
      const response = await ApiService.loginUser(formData);
      if (response.statusCode === 200) {
        // Handle successful login, e.g., redirect to dashboard
        ApiService.saveToken(response.data.token);
        ApiService.saveRole(response.data.role);
        navigate(redirectPath, { replace: true });
      } else {
        showError(response.message || "Login failed");
      }
    } catch (error) {
      showError("An error occurred during login");
    }
  };
  return (
    <div className="login-page-food">
      <ErrorDisplay />
      <div className="login-card-food">
        <div className="login-header-food">
          <h2 className="login-title-food">Login</h2>
          <p className="login-description-food">
            Please enter your credentials to access your account.
          </p>
        </div>
        <div className="login-content-food">
          <form className="login-form-food" onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="email" className="login-label-food">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="login-input-food"
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password" className="login-label-food">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="login-input-food"
                required
              />
            </div>
            
            <div>
              <button type="submit" className="login-button-food">
                Login
              </button>
            </div>

            <div className="already">
                <Link to="/register" className="register-link-food">
                  Don't have an account? Register here
                </Link>
            </div>
          </form>
          <div className="login-social-food">
            <div className="login-separator-food">
                <span className="login-separator-text-food">or login with</span>
            </div>
            <div className="login-social-buttons-food">
              <button className="login-social-button-food login-social-google-food">Google</button>
              <button className="login-social-button-food login-social-facebook-food">Facebook</button>
                <button className="login-social-button-food login-social-github-food">Github</button>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default LoginPage;
