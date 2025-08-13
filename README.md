# 🍽️ Food Delivery App - Frontend

A modern, responsive React-based frontend for a comprehensive food delivery application. This project provides an intuitive user interface for customers to browse menus, place orders, and manage their profiles, along with a powerful admin dashboard for restaurant management.

## 🌐 Live Demo

**🚀 Deployed Application:** [http://foodboot-client-react.s3-website-us-east-1.amazonaws.com](http://foodboot-client-react.s3-website-us-east-1.amazonaws.com)

## 🏗️ Project Architecture

This is the **frontend application** for a full-stack food delivery system:

- **Frontend:** React + TypeScript + Vite (this repository)
- **Backend:** Java Spring Boot API ([Backend Repository](https://github.com/vvduth/food-app-server))
- **Deployment:** AWS S3 Static Website Hosting
- **API Endpoint:** `http://localhost:8090/api/v1` (development)

## ✨ Key Features

### 🛡️ **Authentication & Authorization**
- **Secure JWT Authentication** with role-based access control
- **Three User Roles:** Customer, Admin, and Delivery Personnel
- **Protected Routes** with role-specific access
- **Profile Management** with image upload capabilities

### 🏠 **Customer Features**
- **Modern Homepage** with hero sections and featured categories
- **Menu Browsing** with search and category filtering
- **Detailed Menu Views** with ratings and reviews
- **Shopping Cart** with real-time updates
- **Order Management** with order history tracking
- **Review System** for menu items
- **Secure Payment Processing** via Stripe integration

### 👨‍💼 **Admin Dashboard**
- **Comprehensive Analytics** with Chart.js visualizations
- **Menu Management** - Create, update, delete menu items
- **Category Management** - Organize menu categories
- **Order Management** - Track and update order statuses
- **Payment Monitoring** - View transaction details
- **User Management** - Admin user registration
- **Real-time Statistics** - Revenue, orders, customer metrics

### 📱 **User Experience**
- **Responsive Design** optimized for all devices
- **Modern UI/UX** with premium styling and animations
- **Error Handling** with user-friendly error displays
- **Loading States** and success notifications
- **Smooth Navigation** with React Router DOM

## 🛠️ Tech Stack

### **Core Technologies**
- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.0.4** - Fast build tool and development server

### **UI & Styling**
- **Custom CSS** with advanced animations and effects
- **FontAwesome Icons** for consistent iconography
- **Chart.js + react-chartjs-2** for data visualizations
- **Responsive Design** with mobile-first approach

### **State Management & Navigation**
- **React Router DOM 7.7.1** - Client-side routing
- **Custom Hooks** for state management
- **Context API** for global state

### **API & Integration**
- **Axios 1.11.0** - HTTP client for API requests
- **Stripe Integration** for secure payment processing
- **JWT Token Management** via localStorage

### **Development Tools**
- **ESLint** with TypeScript integration
- **Strict TypeScript Configuration**
- **Vite Plugin React** for optimal development experience

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **Backend API** running on `http://localhost:8090` ([Setup Instructions](https://github.com/vvduth/food-app-server))

## 🚀 Installation & Setup

### 1. **Clone the Repository**
```bash
git clone https://github.com/vvduth/food-boot-client.git
cd food-boot-client
```

### 2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

### 3. **Environment Configuration**
The application is configured to connect to:
- **Backend API (AWS EC2 instance):** ` http://54.157.147.12:8090/api/v1`
- **Payment Gateway:** Stripe (configured in backend)

### 4. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### 5. **Build for Production**
```bash
npm run build
# or
yarn build
```

### 6. **Preview Production Build**
```bash
npm run preview
# or
yarn preview
```

## 📂 Project Structure

```
src/
├── components/
│   ├── admin/                 # Admin dashboard components
│   │   ├── navbar/           # Admin layout components
│   │   └── sidebar/          # Admin feature pages
│   ├── auth/                 # Authentication pages
│   ├── common/               # Shared components
│   ├── home_menu/            # Customer-facing pages
│   ├── payment/              # Payment processing
│   └── profile_cart/         # User profile & cart
├── services/
│   ├── ApiService.ts         # Central API service
│   └── Guard.ts              # Route protection
├── types/                    # TypeScript type definitions
├── App.tsx                   # Main application component
├── index.css                 # Global styles
└── main.tsx                  # Application entry point
```

## 🔐 Authentication Flow

### **User Registration & Login**
1. Users register with email, password, and role selection
2. JWT tokens are issued and stored in localStorage
3. Roles determine accessible routes and features

### **Route Protection**
```typescript
// Example route protection
<CustomerRoute element={ProfilePage} />
<AdminRoute element={AdminPanel} />
<DeliveryRoute element={DeliveryDashboard} />
```

### **API Authentication**
All API requests include JWT tokens via `ApiService.getHeader()`

## 🛒 Core User Workflows

### **Customer Journey**
1. **Browse** → View homepage and featured categories
2. **Search** → Find menu items by category or search term
3. **Select** → View detailed menu item information and reviews
4. **Order** → Add items to cart and proceed to checkout
5. **Pay** → Secure payment processing via Stripe
6. **Track** → Monitor order status and history
7. **Review** → Rate and review completed orders

### **Admin Workflow**
1. **Dashboard** → View analytics and key metrics
2. **Manage** → Create/edit menu items and categories
3. **Monitor** → Track orders and update statuses
4. **Analyze** → Review payment data and customer insights

## 🎨 Design Features

### **Modern UI Elements**
- **Glass Morphism Effects** with backdrop blur
- **Advanced Animations** using CSS keyframes
- **Gradient Backgrounds** with dynamic color shifting
- **3D Hover Effects** for interactive elements
- **Responsive Cards** with premium styling

### **Professional Styling**
- **Restaurant-Quality Design** with sophisticated color schemes
- **Consistent Typography** with Poppins and Inter fonts
- **Premium Shadows** and visual depth
- **Smooth Transitions** for enhanced user experience

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🔧 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code quality
npm run lint
```

## 🌐 Deployment

### **AWS S3 Static Hosting**
The application is deployed using AWS S3 static website hosting:

1. **Build** the production version
2. **Upload** to S3 bucket
3. **Configure** bucket for static website hosting
4. **Access** via the S3 website endpoint

**Live URL:** [http://foodboot-client-react.s3-website-us-east-1.amazonaws.com](http://foodboot-client-react.s3-website-us-east-1.amazonaws.com)

## 🤝 Backend Integration

This frontend integrates with a Java Spring Boot backend:

- **Repository:** [https://github.com/vvduth/food-app-server](https://github.com/vvduth/food-app-server)
- **API Base URL:** `http://localhost:8090/api/v1`
- **Features:** RESTful APIs, JWT authentication, payment processing

## 🧪 Testing the Application

### **Customer Features Testing**
1. **Registration:** Create a customer account
2. **Login:** Authenticate with credentials
3. **Browse Menu:** Explore categories and menu items
4. **Add to Cart:** Select items and manage quantities
5. **Checkout:** Complete payment process
6. **Order History:** View past orders and leave reviews

### **Admin Features Testing**
1. **Admin Login:** Use admin credentials
2. **Dashboard:** View analytics and charts
3. **Menu Management:** Create/edit menu items
4. **Order Management:** Update order statuses
5. **Payment Monitoring:** Review transaction details

## 📈 Performance Optimizations

- **Vite Build Tool** for fast development and optimized production builds
- **Code Splitting** with React Router for efficient loading
- **Image Optimization** for faster load times
- **CSS Animations** instead of JavaScript for better performance
- **TypeScript** for better development experience and error catching

## 🔮 Future Enhancements

- **Real-time Notifications** for order updates
- **Progressive Web App (PWA)** capabilities
- **Dark Mode** theme option
- **Multi-language Support** for internationalization
- **Advanced Search** with filters and sorting
- **Delivery Tracking** with live location updates

## 🐛 Troubleshooting

### **Common Issues**

1. **API Connection Errors**
   - Ensure backend server is running on `http://localhost:8090`
   - Check network connectivity and CORS settings

2. **Authentication Issues**
   - Clear localStorage and re-login
   - Verify JWT token validity

3. **Build Errors**
   - Delete `node_modules` and reinstall dependencies
   - Check TypeScript configuration

## 👥 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Repository Issues:** [GitHub Issues](https://github.com/vvduth/food-boot-client/issues)
- **Backend Repository:** [Food App Server](https://github.com/vvduth/food-app-server)

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
