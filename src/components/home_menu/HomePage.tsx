import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useError } from "../common/ErrorDisplay";
import ApiService from "../../services/ApiService";
import type { Category } from "../../types/categories";

const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const { ErrorDisplay, showError } = useError();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiService.getAllCategories();
        if (response.statusCode === 200) {
          setCategories(response.data);
        } else {
          showError(response.message || "Failed to fetch categories");
        }
      } catch (error: any) {
        showError(
          error.response?.data?.message || "Failed to fetch categories"
        );
      }
    };
    fetchCategories();
  }, []);
  const menuCategoryClick = (categoryId: string) => {
    navigate(`/menu?category=${categoryId}`);
  };

  return (
    <div className="home-page">
      <ErrorDisplay />
      <header className="home-hero-section">
        <div className="home-hero-content">
          <h1 className="home-hero-title">
            Welcome to Our Food Delivery Service
          </h1>
          <p className="home-hero-subtitle">
            Explore our delicious menu and order your favorite dishes online!
          </p>
          <button
            className="home-explore-button"
            onClick={() => navigate("/menu")}
          >
            Explore Menu
          </button>
        </div>
      </header>
      <section className="home-featured-categories">
        <h2 className="home-section-title">Featured Categories</h2>
        <div className="home-category-carousel">
          {categories.map((category) => (
            <div
              key={category.id}
              className="home-category-card"
              onClick={() => menuCategoryClick(category.id)}
            >
              <h3 className="home-category-name">{category.name}</h3>
              <p className="home-category-description">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="home-call-to-action">
        <div className="home-cta-content">
          <h2 className="home-cta-title">Ready to order?</h2>
          <p className="home-cta-text">
            Check out our menu and place your order now!
          </p>
          <button
            className="home-order-now-button"
            onClick={() => navigate("/menu")}
          >
            Order Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
