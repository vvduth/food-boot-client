import React, { useEffect, useState } from "react";
import type { MenuItem } from "../../types/menus";
import { useNavigate } from "react-router-dom";
import { useError } from "../common/ErrorDisplay";
import ApiService from "../../services/ApiService";

const MenuPage = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const location = window.location;
  const navigate = useNavigate();
  const { ErrorDisplay, showError } = useError();
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        let response;
        const urlParams = new URLSearchParams(location.search);
        const categoryId = urlParams.get("category");

        if (categoryId) {
          response = await ApiService.getAllMenuByCategoryId(categoryId);
        } else {
          response = await ApiService.getAllMenus();
        }

        if (response.statusCode === 200) {
          setMenus(response.data);
        } else {
          showError(response.data.message || "Failed to fetch menus");
        }
      } catch (error: any) {
        showError(error.response?.data?.message || "Failed to fetch menus");
      }
    };
    fetchMenus();
  }, [location.search]);

  const handleSearch = async () => {
    try {
      const response = await ApiService.searchMenu(searchTerm);
      if (response.statusCode === 200) {
        setMenus(response.data);
      } else {
        showError(response.data.message || "Failed to search menus");
      }
    } catch (error: any) {
      showError(error.response?.data?.message || "Failed to search menus");
    }

    
  };
  const navigateToMenuDetails = (menuId: string | number) => {
    navigate(`/menu/${menuId}`);
  };
  const filteredMenus = menus.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  return (
    <>
      <div className="menu-page">
        <ErrorDisplay />
        <h1 className="menu-title">Menu</h1>

        <div className="menu-search">
          <input
            type="text"
            placeholder="Search for a menu item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="menu-search-input"
          />
          <button onClick={handleSearch} className="menu-search-button">
            Search
          </button>
        </div>

        <div className="menu-grid">
          {filteredMenus.map((menu) => (
            <div
              key={menu.id}
              className="menu-item-card"
              onClick={() => navigateToMenuDetails(menu.id)}
            >
              <img
                className="menu-item-image"
                src={menu.imageUrl}
                alt={menu.name}
              />
              <div className="menu-item-content">
                <h2 className="menu-item-name">{menu.name}</h2>
                <p className="menu-item-description">{menu.description}</p>
                <p className="menu-item-price">{menu.price.toFixed(2)} EUR</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuPage;
