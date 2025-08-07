import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useError } from "../../common/ErrorDisplay";
import type { CreateMenuItemRequest, MenuItem, UpdateMenuItemRequest } from "../../../types/menus";
import type { Category } from "../../../types/categories";
import ApiService from "../../../services/ApiService";

// Define a proper form state type that combines both create and update scenarios
interface MenuFormState {
  id?: string;
  name: string;
  description: string;
  price: string;
  imageFile: File | null;
  categoryId: string;
  imageUrl?: string; // For displaying current image in edit mode
}

const AdminMenuFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const { ErrorDisplay, showError } = useError();
  const navigate = useNavigate();

  const [menu, setMenu] = useState<MenuFormState>({
    id: id || undefined,
    name: "",
    description: "",
    price: "",
    imageFile: null,
    categoryId: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMenu = async () => {
    try {
      if (id) {
        const response = await ApiService.getMenuById(id);
        if (response.statusCode === 200) {
          const menuItemData: MenuItem = response.data;
          console.log("Menu Item Data:", menuItemData);
          // Convert MenuItem to MenuFormState
          setMenu({
            id: menuItemData.id,
            name: menuItemData.name,
            description: menuItemData.description,
            price: menuItemData.price.toString(),
            categoryId: menuItemData.categoryId?.toString() || "",
            imageFile: null, // No file initially, will be set if user uploads new image
            imageUrl: menuItemData.imageUrl, // Keep the current image URL for preview
          });
        } else {
          showError(response.message);
        }
      }
    } catch (error: any) {
      showError(error.response?.data?.message || error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategories();
      if (response.statusCode === 200) {
        setCategories(response.data);
      } else {
        showError(response.message);
      }
    } catch (error: any) {
      showError(error.response?.data?.message || error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const formData = new FormData();
        if (menu.name) formData.append("name", menu.name);
        if (menu.description) formData.append("description", menu.description);
        if (menu.price) formData.append("price", menu.price);
        if (menu.imageFile) formData.append("imageFile", menu.imageFile);
        if (menu.categoryId) formData.append("categoryId", menu.categoryId);
        let response; 

        if (id) {
            formData.append("id", id);
            response = await ApiService.updateMenu(formData);
        } else {
            response = await ApiService.createMenu(formData);
        }

        console.log("Response:", JSON.stringify(response, null, 2));

        if (response.statusCode === 200) {
            navigate("/admin/menu-items");
        }
    } catch (error:any) {
        showError(error.response?.data?.message || error.message);
    } finally {
        setIsSubmitting(false);
        }
  }
  
  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchMenu();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setMenu((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setMenu((prev) => ({ ...prev, imageFile: file }));
  }

  return (<div className="admin-menu-item-form">
            <ErrorDisplay />
            <div className="content-header">
                <h1>{id ? 'Edit Menu Item' : 'Add New Menu Item'}</h1>
                <button
                    className="back-btn"
                    onClick={() => navigate('/admin/menu-items')}
                >
                    Back to Menu Items
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={menu.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={menu.description}
                        onChange={handleInputChange}
                        rows={4}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="price">Price *</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={menu.price}
                            onChange={handleInputChange}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="categoryId">Category *</label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            value={menu.categoryId}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="imageFile">
                        {id ? 'Change Image (Leave blank to keep current)' : 'Image *'}
                    </label>
                    <input
                        type="file"
                        id="imageFile"
                        name="imageFile"
                        onChange={handleFileChange}
                        accept="image/*"
                        required={!id}
                    />
                    {id && menu.imageUrl && (
                        <div className="current-image-preview">
                            <p>Current Image:</p>
                            <img
                                src={menu.imageUrl}
                                alt="Current menu item"
                                className="preview-image"
                            />
                        </div>
                    )}
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="save-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Menu Item'}
                    </button>
                </div>
            </form>
        </div>)
};

export default AdminMenuFormPage;
