import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useError } from "../common/ErrorDisplay";
import ApiService from "../../services/ApiService";
import type { Category } from "../../types/categories";

const CaterogyPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const { ErrorDisplay, showError } = useError();

  useEffect(() => {
  
          const fetchCategories = async () => {
              try {
                  const response = await ApiService.getAllCategories();
                  if (response.statusCode === 200) {
                      setCategories(response.data)
                  } else {
                      showError(response.message);
                  }
  
              } catch (error:any) {
                  showError(error.response?.data?.message || error.message);
  
              }
          };
  
          fetchCategories();
      }, []);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/menu?category=${categoryId}`);
  };

  return (
    <div className="categories-page">
      <ErrorDisplay />
      <h1 className="categories-title"> Categories</h1>
      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className="home-category-card"
            onClick={() => handleCategoryClick(category.id!)}
          >
            <h2 className="category-name">{category.name}</h2>
            <p className="category-description">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaterogyPage;
