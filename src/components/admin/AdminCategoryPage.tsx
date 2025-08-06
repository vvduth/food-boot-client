import React from "react";
import { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";
import { useError } from "../common/ErrorDisplay";
import type { Category } from "../../types/categories";
import { useNavigate } from "react-router-dom";
const AdminCategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { showError, ErrorDisplay } = useError();
  const navigate = useNavigate();
  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategories();
      if (response.statusCode === 200) {
        setCategories(response.data as Category[]);
      }
    } catch (error: any) {
      showError(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching categories."
      );
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    navigate("/admin/categories/new");
  };

  const handleEditCategory = (categoryId: string) => {
    navigate(`/admin/categories/edit/${categoryId}`);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await ApiService.deleteCategory(categoryId);
        if (response.statusCode === 200) {
          fetchCategories(); // Refresh the list after deletion
        }
      } catch (error: any) {
        showError(
          error.response?.data?.message ||
            error.message ||
            "An error occurred while deleting the category."
        );
      }
    }
  };

  return (
    <div className="admin-categories">
      <ErrorDisplay />
      <div className="content-header">
        <h1>Categories Management</h1>
        <button className="add-btn" onClick={handleAddCategory}>
          <i className="fas fa-plus"></i> Add Category
        </button>
      </div>

      <div className="categories-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditCategory(category.id!)}
                  >
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteCategory(category.id!)}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default AdminCategoryPage;
