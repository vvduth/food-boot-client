import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { useError } from "../common/ErrorDisplay";
import type { MenuItem } from "../../types/menus";

const MenuDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<MenuItem | null>(null);
  const [averageRating, setAverageRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartSuccess, setCartSuccess] = useState(false);

  const isAuthenticated = ApiService.isAuthenticated();
  const { ErrorDisplay, showError } = useError();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await ApiService.getMenuById(id!);
        if (response.statusCode === 200) {
          setMenu(response.data);
          const ratingResponse = await ApiService.getMenuAverageOverallReview(
            id!
          );
          
          if (ratingResponse.statusCode === 200) {
            console.log("Rating Response:", ratingResponse);
            setAverageRating(ratingResponse.data);
          }
        }
      } catch (error) {
        showError("Failed to fetch menu details");
      }
    };
    if (id) {
      fetchMenu();
    } else {
      showError("Menu ID is required");
    }
  }, [id]);

  const handleBackToMenu = () => {
    navigate(-1); // go back to the previous page
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      showError("You need to be logged in to add items to the cart");
      return;
    }

    try {
      const response = await ApiService.addItemToCart({
        menuId: menu!.id,
        quantity: quantity.toString(),
      });
      if (response.statusCode === 200) {
        setCartSuccess(true);
        setTimeout(() => {
          setCartSuccess(false);
        }, 3000); // reset success message after 3 seconds
      }
    } catch (error) {
      showError("Failed to add item to cart");
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };
  if (!menu) {
    return (
      <div className="menu-details-not-found">
        <p>Menu Item Not Found</p>
        <button
          className="back-button"
          onClick={handleBackToMenu}
        >Back to menu</button>
      </div>
    );
  }
  return <div className="menu-details-container">
    <ErrorDisplay />
      <button
        className="back-button"
        onClick={handleBackToMenu}
      >
        &larr; Back to Menu
      </button>
      <div className="menu-item-header">
        <div className="menu-item-image-container">
          <img src={menu.imageUrl} alt={menu.name} 
           className="menu-item-image-detail" 
          />
        </div>

        <div className="menu-item-info">
          <h1 className="menu-item-name">{menu.name}</h1>
          <p className="menu-item-description">{menu.description}</p>
          <div className="menu-item-price-rating">
            <span className="price"> {Number(menu.price || 0).toFixed(2)}</span>
            <div className="rating">
              <span className="rating-value">
                {averageRating.toFixed(1)}
              </span>
              <span className="rating-star">★</span>
              <span className="rating-count">({menu.reviews?.length || 0})</span>
            </div>
          </div>

          {/* quantity selector and add to cart button */}
          <div className="add-to-cart-section">
            <div className="quantity-selector">
              <button onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="quantity-btn"
              >-</button>
              <span className="quantity">{quantity}</span>
              <button onClick={incrementQuantity}
                className="quantity-btn"
              >+</button>
            </div>
            <button onClick={handleAddToCart}
            className="add-to-cart-btn">
              Add to cart
            </button>
            {cartSuccess && (
              <div className="cart-success-message">Item added to cart!</div>
            )}
          </div>
        </div>
      </div>
      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        {menu.reviews && menu.reviews.length > 0 ? (
          <div>
             {menu.reviews.map((review) => (
                                <div key={review.id} className="review-card">
                                    <div className="review-header">
                                        <span className="review-user">{review.userName}</span>
                                        <span className="review-date">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="review-rating">
                                        {'★'.repeat(review.rating)}{'☆'.repeat(10 - review.rating)}
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-reviews">No reviews yet. Be the first to review!</p>
                    )}

      </div>
  </div>;
};

export default MenuDetailsPage;
