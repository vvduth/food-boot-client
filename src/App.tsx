import "./App.css";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./components/auth/LoginPage";
import HomePage from "./components/home_menu/HomePage";
import CaterogyPage from "./components/home_menu/CaterogyPage";
import MenuPage from "./components/home_menu/MenuPage";
import MenuDetailsPage from "./components/home_menu/MenuDetailsPage";
import ProfilePage from "./components/profile_cart/ProfilePage";
import UpdateProfilePage from "./components/profile_cart/UpdateProfilePage";
import OrderHistoryPage from "./components/profile_cart/OrderHistoryPage";
import { AdminRoute, CustomerRoute } from "./services/Guard";
import LeaveReviewPage from "./components/profile_cart/LeaveReview";
import CartPage from "./components/profile_cart/CartPage";
import ProcessPaymentPage from "./components/payment/ProcessPaymentPage";
import AdminLayout from "./components/admin/navbar/AdminLayout";
import AdminCategoryPage from "./components/admin/AdminCategoryPage";
import AdminCategoryFormPage from "./components/admin/AdminCategoryFormPage";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="content">
        <Routes>
          {/* <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/categories" element={<CaterogyPage />} />
          {/* Register page */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:id" element={<MenuDetailsPage />} />
          <Route
            path="/profile"
            element={<CustomerRoute element={ProfilePage} />}
          />
          <Route
            path="/update"
            element={<CustomerRoute element={UpdateProfilePage} />}
          />
          <Route
            path="/my-orders-history"
            element={<CustomerRoute element={OrderHistoryPage} />}
          />
          <Route
            path="/leave-review"
            element={<CustomerRoute element={LeaveReviewPage} />}
          />
          <Route path="/cart" element={<CustomerRoute element={CartPage} />} />
          <Route
            path="/pay"
            element={<CustomerRoute element={ProcessPaymentPage} />}
          />

          {/* admin  */}
          <Route path="/admin" element={<AdminRoute element={AdminLayout} />} >
            <Route path="categories" element={<AdminRoute element={AdminCategoryPage} />} />
            <Route path="categories/new" element={<AdminRoute element={AdminCategoryFormPage} />} />

            <Route path="menu-items" element={<AdminRoute element={() =>  <></>} />} />
            <Route path="orders" element={<AdminRoute element={() => <></>} />} />
            <Route path="payments" element={<AdminRoute element={() => <></>} />} />
          </Route>

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
