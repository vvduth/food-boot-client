import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserProfile } from "../../../types/user";
import { useError } from "../../common/ErrorDisplay";
import ApiService from "../../../services/ApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
const AdminTopbar = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { ErrorDisplay, showError } = useError();

  const fetchProfile = async () => {
    try {
      const response = await ApiService.myProfile();
      if (response.statusCode === 200) {
        setUserProfile(response.data as UserProfile);
      } else {
        showError(response.message || "Failed to fetch user profile");
      }
    } catch (error: any) {
      showError(error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await ApiService.logout();
      navigate("/login");
    } catch (error: any) {
      showError(error.response?.data?.message || error.message);
    }
  };

  const toggleSidebar = () => {
    document.querySelector(".admin-sidebar")?.classList.toggle("active");
  };
  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <ErrorDisplay />

      <div>
        <div>
            <img src={userProfile?.profileUrl} alt={userProfile?.name || "Profile picture"} 
             className="profile-image" />
        </div>
        <div className="profile-info">
            <span className="profile-name">{userProfile?.name || 'Mystery User'}</span>
            <span className="profile-role">Admin</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
