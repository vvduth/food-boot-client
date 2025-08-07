import React from "react";
import { useState, useEffect } from "react";
import ApiService from "../../../services/ApiService";
import { useError } from "../../common/ErrorDisplay";
import type { Category } from "../../../types/categories";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const AdminCategoryFormPage = () => {
    const {id} = useParams<{id: string}>();
    const { showError, ErrorDisplay } = useError();
    const navigate = useNavigate();

    const [category, setCategory] = useState<Category>({
        name: "",
        description: "",
    })

    const fetchCategory = async () => {
        try {
            const response = await ApiService.getCategoryById(id!);
            if (response.statusCode === 200) {
                setCategory(response.data as Category);
            }
        } catch (error : any) {
            showError(
                error.response?.data?.message ||
                error.message ||
                "An error occurred while fetching the category."
            );
        }
    }

    useEffect(() => {
        if (id) {
            fetchCategory();
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let response;
            if (id) {
                response = await ApiService.updateCategory({id, ...category});
            } else {
                response = await ApiService.createCategory(category);
            }
            if (response.statusCode === 200) {
                navigate("/admin/categories");
            }
        } catch (error: any) {
            showError(
                error.response?.data?.message ||
                error.message ||
                "An error occurred while saving the category."
            );
        }
    }

     return (
        <div className="admin-category-form">
            <ErrorDisplay />
            <div className="content-header">
                <h1>{id ? 'Edit Category' : 'Add New Category'}</h1>
                <button
                    className="back-btn"
                    onClick={() => navigate('/admin/categories')}
                >
                    Back to Categories
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Category Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={category.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={category.description}
                        onChange={handleInputChange}
                        rows={4}
                    />
                </div>

                <div className="form-actions">
                    {id ? (
                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Update Category
                        </button>
                    ) : (

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Save Category
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default AdminCategoryFormPage