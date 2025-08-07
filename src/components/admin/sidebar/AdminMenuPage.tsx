
import { useState, useEffect } from "react";
import ApiService from "../../../services/ApiService";
import { useError } from "../../common/ErrorDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import type { MenuItem } from "../../../types/menus";
const AdminMenuPage = () => {

    const [menus, setMenus] = useState<MenuItem[]>([]);
    const { showError, ErrorDisplay } = useError();
    const navigate = useNavigate();

    const fetchMenus = async () => {
        try {
            const response = await ApiService.getAllMenus();
            if (response.statusCode === 200) {
                setMenus(response.data as MenuItem[]);
            }
        } catch (error: any) {
            showError(
                error.response?.data?.message ||
                error.message ||
                "An error occurred while fetching menus."
            );
        }
    }
    useEffect(() => {
        fetchMenus();
    }, []);

    const handleAddMenuItem = () => {
        navigate("/admin/menu-items/new");
    }
    const handleEditMenuItem = (menuId: string) => {
        navigate(`/admin/menu-items/edit/${menuId}`);
    }
    const handleDeleteMenuItem = async (menuId: string) => {
        if (window.confirm("Are you sure you want to delete this menu item?")) {
            try {
                const response = await ApiService.deleteMenu(menuId);
                if (response.statusCode === 200) {
                    fetchMenus(); // Refresh the list after deletion
                }
            } catch (error: any) {
                showError(
                    error.response?.data?.message ||
                    error.message ||
                    "An error occurred while deleting the menu item."
                );
            }
        }
    }
  return (
    <div className="admin-menu-items">
          <ErrorDisplay />
          <div className="content-header">
            <h1>Menu Items Management</h1>
            <button className="add-btn" onClick={handleAddMenuItem}>
              <FontAwesomeIcon icon={faPlus} /> Add Menu Item
            </button>
          </div>
    
          <div className="menu-items-grid">
            {menus.map(item => (
              <div className="menu-item-card" key={item.id}>
                <div className="manu-item-image">
                  <img src={item.imageUrl} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                 <p> €{Number(item.price).toFixed(2)}</p>
                  <p className="item-description">{item.description}</p>
                  <div className="item-footer">
                    <span className="reviews-count">
                      {item.reviews?.length || 0} reviews
                    </span>
                    <div className="item-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditMenuItem(item.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteMenuItem(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default AdminMenuPage