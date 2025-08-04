import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useError } from "../common/ErrorDisplay";
import ApiService from "../../services/ApiService";
import type { UserProfile } from "../../types/user";
const UpdateProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [profileImage, setProfileImage] = useState<string | null | File>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { ErrorDisplay, showError } = useError();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await ApiService.myProfile();
        if (response.status === 200) {
          const userData = response.data as UserProfile;
          setName(userData.name);
          setEmail(userData.email);
          setPhone(userData?.phoneNumber || "");
          setAddress(userData?.address || "");
          setProfileImage(userData?.profileUrl || "");
          setPreviewImage(userData?.profileUrl || "");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        showError("Failed to fetch user profile");
      }
    };
    fetchUserProfile();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // programmatically trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to update your profile?")) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      if (previewImage) {
        formData.append("imageFile", previewImage);
      }

      const response = await ApiService.updateProfile(formData);
      if (response.statusCodes === 200) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showError("Failed to update profile");
    }
  };

  const handleDeactivateAccount = async () => {
    if (!window.confirm("Are you sure you want to deactivate your account?")) {
      return;
    }

    try {
      const response = await ApiService.deactivateProfile();
      if (response.status === 200) {
        ApiService.logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error deactivating account:", error);
      showError("Failed to deactivate account");
    }
  };

  return (
    <div className="profile-container">
      <ErrorDisplay />
      <div>
        <h1>Update Profile</h1>
        <div>
          <img
            src={previewImage || ""}
            alt="Profile Preview"
            onClick={triggerFileInput}
            className="profile-image"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{
              display: "none",
            }}
          />
          <button onClick={triggerFileInput} className="profile-image-photo">
            Change Profile Image
          </button>
        </div>
      </div>
      <form className="profile-form" onSubmit={handleUpdateProfile} ></form>
    </div>
  );
};

export default UpdateProfilePage;
