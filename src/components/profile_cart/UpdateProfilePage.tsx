import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useError } from "../common/ErrorDisplay";
import ApiService from "../../services/ApiService";

const UpdateProfilePage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const [profileImage, setProfileImage] = useState<File | null>(null); // this will hold a multimedia file to upload

    const [previewImage, setPreviewImage] = useState(''); //this will hold the exisitng profile url from the response

    const fileInputRef = useRef(null); // useRef can be used to reference a DOM element directly

    const navigate = useNavigate();
    const { ErrorDisplay, showError } = useError();


    useEffect(() => {

        const fetchUserProfile = async () => {

            try {
                const response = await ApiService.myProfile();
                if (response.statusCode === 200) {

                    const userData = response.data;
                    setName(userData.name);
                    setEmail(userData.email);
                    setPhoneNumber(userData.phoneNumber);
                    setAddress(userData.address);
                    setPreviewImage(userData.profileUrl);
                }

            } catch (error:any) {
                showError(error.response?.data?.message || error.message);
            }
        }

        fetchUserProfile();
    }, [])


    const handleImageChange = (e : React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files || e.target.files.length === 0) {
            return; // No file selected
        }
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file)
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    //Programmatically triggers a click on the hidden file input.
    const triggerFileInput = () => {
        if (!fileInputRef.current) return; // Ensure the ref is set
        // @ts-ignore
        fileInputRef.current.click()
    };

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!window.confirm('Are you sure you want to update your profile?')) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phoneNumber', phoneNumber);
            formData.append('address', address);

            if (profileImage) {
                formData.append('imageFile', profileImage)
            }

            const response = await ApiService.updateProfile(formData);

            if (response.statusCode === 200) {
                navigate("/profile");
            }

        } catch (error:any) {
            showError(error.response?.data?.message || error.message);
        }
    }


    const handleDeactivateProfile = async () => {

        if (!window.confirm('Are you sure you want to Close your account? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await ApiService.deactivateProfile();

            if (response.statusCode === 200) {
                ApiService.logout();
                navigate('/home')
            }

        } catch (error:any) {
            showError(error.response?.data?.message || error.message);

        }
    }

    return (
        <div className="profile-container">
            <ErrorDisplay />

            <div className="profile-header">
                <h1 className="profile-title">Update Profile</h1>
                <div className="profile-image-container">
                    <img
                        src={previewImage}
                        alt="Profile"
                        className="profile-image"
                        onClick={triggerFileInput}
                    />
                    <input
                        type="file"
                        ref={fileInputRef} //pointing to the actual DOM element
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                    <button
                        className="profile-image-upload"
                        onClick={triggerFileInput}
                    >
                        Change Photo
                    </button>
                </div>
            </div>


            <form className="profile-form" onSubmit={handleUpdateProfile}>
                <div className="form-grid">
                    <div className="profile-form-group">
                        <label htmlFor="name" className="profile-form-label">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="profile-form-input"
                            required
                        />
                    </div>
                    <div className="profile-form-group">
                        <label htmlFor="email" className="profile-form-label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="profile-form-input"
                            required
                        />
                    </div>
                    <div className="profile-form-group">
                        <label htmlFor="phoneNumber" className="profile-form-label">Phone:</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="profile-form-input"
                            required
                        />
                    </div>
                    <div className="profile-form-group">
                        <label htmlFor="address" className="profile-form-label">Address:</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="profile-form-input"
                            required
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        Update Profile
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDeactivateProfile}
                    >
                        Deactivate Account
                    </button>
                </div>
            </form>



        </div>
    )


}
export default UpdateProfilePage;