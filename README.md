# 🛒 Full-Stack Online Electronics Marketplace

[![GitHub](https://img.shields.io/badge/GitHub-SP0496-blue)](https://github.com/SP0496/Full-Stack-Online-Electronics-Marketplace)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.19-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue)](https://opensource.org/licenses/ISC)

> A feature-rich, full-stack e-commerce platform for electronics with AI-powered chatbot, real-time location tracking, and intelligent delivery system.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Screenshots](#-screenshots)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [Interview Talking Points](#-interview-talking-points)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Full-Stack Online Electronics Marketplace** is a modern e-commerce web application that enables users to browse, search, and purchase electronic products online. The platform integrates cutting-edge technologies including AI-powered customer support, real-time geolocation services, and a responsive design optimized for all devices.

### 🎓 Project Purpose
This project demonstrates proficiency in:
- **Full-stack web development** (Node.js + Express.js backend, Vanilla JavaScript frontend)
- **Database design and management** (MongoDB with Mongoose ODM)
- **RESTful API development** and authentication flows
- **Third-party API integration** (Google Gemini AI, OpenStreetMap, Leaflet.js)
- **Responsive UI/UX design** (Bootstrap 5, custom CSS)
- **Real-time features** (AI chatbot, location tracking)

---

## ✨ Key Features

### 🔐 User Authentication & Authorization
- **User Registration**: Secure sign-up with email validation
- **User Login**: Session-based authentication with password verification
- **MongoDB Integration**: User credentials stored securely in database
- **Form Validation**: Client and server-side validation for data integrity

### 🛍️ E-Commerce Functionality
- **Product Catalog**: Dynamic product listing with 24+ electronics items
- **Product Categories**: Mobile, Laptop, AC, TV, Coolers, and more
- **Product Details**: Comprehensive product information including:
  - High-quality product images
  - Pricing with discount calculations
  - Detailed specifications and features
  - Stock availability status
- **Advanced Search & Filter**: Category-based filtering with brand dropdowns
- **Shopping Cart**: 
  - Add/remove products dynamically
  - Quantity adjustment (increment/decrement)
  - Real-time price calculations
  - LocalStorage persistence
  - Cart counter badge

### 🤖 AI-Powered Chatbot
- **Google Gemini Integration**: Natural language processing for customer queries
- **Context-Aware Responses**: Maintains conversation history
- **Product Recommendations**: AI suggests products based on user requirements:
  - Budget-based recommendations (Budget, Mid-range, Premium)
  - Category-specific suggestions (Mobile, Laptop, TV, AC, etc.)
  - Feature comparisons and detailed specifications
- **Order Assistance**: Helps users complete purchases through chat
- **Real-time Interaction**: Instant responses with typing indicators

### 📍 Location & Delivery System
- **Interactive Map Integration**: 
  - OpenStreetMap with Leaflet.js
  - Geolocation API for user position
  - Store location markers
- **Delivery Zone Calculation**:
  - Standard Zone: 0-5 km (Free, 1-2 hours)
  - Extended Zone: 5-10 km (₹50 base + ₹10/km, 2-3 hours)
  - Premium Zone: 10-15 km (₹100 base + ₹15/km, 3-4 hours)
  - Express Zone: 15-20 km (₹200 base + ₹20/km, 1 hour)
- **Distance Calculation**: Real-time distance measurement between user and store
- **Delivery Cost Estimator**: Dynamic pricing based on distance
- **Weather-Based Offers**: Contextual promotions (mock implementation)
- **Multiple Delivery Options**: Standard, Express, Priority delivery speeds

### 🎨 User Interface & Experience
- **Responsive Design**: Mobile-first approach using Bootstrap 5
- **Modern UI Components**:
  - Navigation bar with search functionality
  - Product cards with hover effects
  - Modal windows for product details
  - Dropdown menus for categories
  - Loading spinners for async operations
- **Interactive Elements**:
  - Smooth scrolling animations
  - Toast notifications
  - Image galleries
  - Sticky navigation
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

### 🔧 Technical Features
- **RESTful API Architecture**: Clean separation of frontend and backend
- **Asynchronous Operations**: Promise-based data fetching
- **LocalStorage Management**: Client-side data persistence
- **Error Handling**: Comprehensive error messages and fallbacks
- **Environment Configuration**: Secure API key and database URL management
- **Cross-Origin Resource Sharing (CORS)**: Configured for secure API access

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment for server-side JavaScript |
| **Express.js** | Web application framework for routing and middleware |
| **MongoDB** | NoSQL database for storing user and product data |
| **Mongoose** | ODM (Object Data Modeling) library for MongoDB |
| **body-parser** | Middleware for parsing request bodies |
| **dotenv** | Environment variable management |
| **nodemon** | Development tool for auto-restarting server |

### Frontend
| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup for content structure |
| **CSS3** | Styling with custom properties and animations |
| **JavaScript (ES6+)** | Client-side logic and DOM manipulation |
| **Bootstrap 5** | Responsive grid system and UI components |
| **Bootstrap Icons** | Icon library for visual elements |
| **Font Awesome** | Additional icon support |
| **Google Fonts** | Custom typography (Poppins, Sofia, Jacquard) |

### APIs & Libraries
| Service | Purpose |
|---------|---------|
| **Google Gemini AI** | Natural language processing for chatbot |
| **Leaflet.js** | Interactive map visualization |
| **OpenStreetMap** | Map tile provider |
| **Geolocation API** | User location detection |

### Development Tools
- **Git** - Version control
- **GitHub** - Code repository and collaboration
- **VS Code** - Integrated development environment
- **npm** - Package management

---

## 🏗️ Architecture

### System Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT TIER                          │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   index.html │  │   home.html   │  │  login.html  │      │
│  │  (Landing)   │  │  (Products)   │  │    (Auth)    │      │
│  └──────┬───────┘  └──────┬────────┘  └──────┬───────┘      │
│         │                 │                   │              │
│  ┌──────▼─────────────────▼───────────────────▼───────┐     │
│  │         JavaScript (script.js, chatbot.js)         │     │
│  │  • DOM Manipulation  • Event Handling              │     │
│  │  • API Calls         • LocalStorage                │     │
│  └──────────────────────┬─────────────────────────────┘     │
└─────────────────────────┼───────────────────────────────────┘
                          │
                    HTTPS Requests
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                      SERVER TIER                            │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Express.js Application (index.js)         │    │
│  │                                                      │    │
│  │  Routes:                                            │    │
│  │  • POST /sign_up  - User registration              │    │
│  │  • POST /login    - User authentication            │    │
│  │  • GET  /         - Serve landing page             │    │
│  │                                                      │    │
│  │  Middleware:                                        │    │
│  │  • body-parser    - Request parsing                │    │
│  │  • express.static - Serve static files             │    │
│  │  • CORS           - Cross-origin requests          │    │
│  └───────────────────────┬────────────────────────────┘    │
└────────────────────────────┼─────────────────────────────────┘
                             │
                    Mongoose ODM
                             │
┌────────────────────────────▼─────────────────────────────────┐
│                      DATABASE TIER                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              MongoDB Atlas / Local                    │   │
│  │                                                        │   │
│  │  Collections:                                         │   │
│  │  • users      - User authentication data             │   │
│  │  • products   - Product catalog (JSON file)          │   │
│  │                                                        │   │
│  └────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                          │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────┐     │
│  │  Gemini AI   │  │ OpenStreetMap │  │  Geolocation │     │
│  │   (Chatbot)  │  │   (Mapping)   │  │     API      │     │
│  └──────────────┘  └───────────────┘  └──────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

### Data Flow
1. **User Request** → Client sends HTTP request to Express server
2. **Routing** → Express routes request to appropriate handler
3. **Business Logic** → Server processes request (authentication, validation)
4. **Database Query** → Mongoose queries MongoDB for data
5. **Response** → Server sends JSON/HTML response to client
6. **Rendering** → Client-side JavaScript updates DOM dynamically

---

## 📸 Screenshots

### Landing Page
![Landing Page](https://via.placeholder.com/800x400?text=Electronic+Store+Landing+Page)
*Hero section with call-to-action and integrated AI chatbot*

### Product Catalog
![Product Catalog](https://via.placeholder.com/800x400?text=Product+Catalog+with+Filters)
*Responsive product grid with category filters and search*

### Shopping Cart
![Shopping Cart](https://via.placeholder.com/800x400?text=Shopping+Cart+Interface)
*Real-time cart with quantity controls and price calculations*

### AI Chatbot
![AI Chatbot](https://via.placeholder.com/800x400?text=AI+Chatbot+Interface)
*Google Gemini-powered assistant for product recommendations*

### Location & Delivery
![Location Tracking](https://via.placeholder.com/800x400?text=Interactive+Map+with+Delivery+Zones)
*Interactive map with delivery zone visualization and cost calculator*

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Local installation or MongoDB Atlas account) - [Setup Guide](https://www.mongodb.com/)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

### Step-by-Step Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SP0496/Full-Stack-Online-Electronics-Marketplace.git
cd Full-Stack-Online-Electronics-Marketplace
```

#### 2️⃣ Install Dependencies
```bash
npm install
```

This will install:
- express (^4.19.2)
- mongoose (^8.3.2)
- body-parser (^1.20.2)
- dotenv (^16.4.5)
- nodemon (^3.1.0)

#### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory:

```bash
# .env file
MONGO_URL=mongodb://localhost:27017/electronic-store
# OR for MongoDB Atlas:
# MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/electronic-store

PORT=3000
NODE_ENV=development
```

**For MongoDB Atlas:**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add your IP address to whitelist
4. Create a database user
5. Get your connection string and replace in `.env`

#### 4️⃣ Start MongoDB (if using local installation)
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

#### 5️⃣ Run the Application

**Development Mode (with auto-restart):**
```bash
npm run dev
# OR
nodemon index.js
```

**Production Mode:**
```bash
npm start
# OR
node index.js
```

#### 6️⃣ Access the Application
Open your browser and navigate to:
- **Main Application**: http://localhost:3000
- **Home Page**: http://localhost:3000/home.html
- **Login Page**: http://localhost:3000/login.html

### 🔧 Configuration Notes

**API Keys (for advanced features):**

The chatbot uses Google Gemini AI. To enable full functionality:
1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Replace the API key in `public/chatbot.js`:
   ```javascript
   const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
   ```

**Map Configuration:**
- The app uses OpenStreetMap (no API key required)
- Geolocation requires HTTPS in production (works on localhost for development)

---

## 🔌 API Endpoints

### Authentication Endpoints

#### POST `/sign_up`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phno": "9876543210",
  "passwordr": "securePassword123"
}
```

**Success Response:**
- **Status**: 302 (Redirect)
- **Redirect**: `/home.html`

**Error Responses:**
- **409**: User already exists
- **500**: Internal server error

---

#### POST `/login`
Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response:**
- **Status**: 302 (Redirect)
- **Redirect**: `/home.html`

**Error Responses:**
- **302**: Invalid credentials (redirect to `/login.html?error=Invalid email or password`)
- **500**: Internal server error

---

#### GET `/`
Serve landing page.

**Success Response:**
- **Status**: 302 (Redirect)
- **Redirect**: `/index.html`

---

### Client-Side API Integrations

#### Google Gemini AI (Chatbot)
```javascript
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

**Headers:**
```
Content-Type: application/json
```

**Request:**
```json
{
  "contents": [
    {
      "parts": [{"text": "User message"}]
    }
  ]
}
```

---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,        // Unique, validated
  phno: String,         // Phone number
  password: String,     // Plain text (⚠️ Note: Should be hashed in production)
  createdAt: Date,      // Auto-generated
  updatedAt: Date       // Auto-generated
}
```

**Indexes:**
- `email`: Unique index for fast lookup and preventing duplicates

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Satish Anadasu",
  "email": "satishanadasu8@gmail.com",
  "phno": "9876543210",
  "password": "mySecurePassword",
  "createdAt": "2024-10-24T10:30:00.000Z",
  "updatedAt": "2024-10-24T10:30:00.000Z"
}
```

### Products (JSON File)
Products are currently stored in `public/products.json`:

```json
{
  "id": 1,
  "name": "IPHONE 15",
  "price": "73,100",
  "image": "image/1.png",
  "discount": 15,
  "description": "Product description..."
}
```

**Future Enhancement**: Migrate to MongoDB collection for better scalability.

---

## 📁 Project Structure

```
Full-Stack-Online-Electronics-Marketplace/
│
├── 📁 Electronic-Store-Website-master/
│   ├── 📄 index.js                    # Express server & API routes
│   ├── 📄 package.json                # Dependencies & scripts
│   ├── 📄 package-lock.json           # Locked dependency versions
│   ├── 📄 .env                        # Environment variables (not in git)
│   ├── 📄 .gitignore                  # Git ignore rules
│   │
│   ├── 📁 public/                     # Static files served to client
│   │   ├── 📄 index.html              # Landing page
│   │   ├── 📄 home.html               # Main product catalog page
│   │   ├── 📄 login.html              # Authentication page
│   │   ├── 📄 adress.html             # Address input page
│   │   ├── 📄 location-delivery.html  # Map & delivery page
│   │   │
│   │   ├── 📄 script.js               # Main product catalog logic
│   │   ├── 📄 chatbot.js              # AI chatbot implementation
│   │   ├── 📄 location-delivery.js    # Map & geolocation logic
│   │   ├── 📄 map.js                  # Additional map utilities
│   │   │
│   │   ├── 📄 style.css               # Main stylesheet
│   │   ├── 📄 style1.css              # Additional styles
│   │   ├── 📄 enterance.css           # Landing page styles
│   │   ├── 📄 chatbot.css             # Chatbot widget styles
│   │   ├── 📄 adress.css              # Address form styles
│   │   ├── 📄 location-delivery.css   # Map page styles
│   │   │
│   │   ├── 📄 products.json           # Product catalog data
│   │   ├── 📄 img.png                 # Logo/brand image
│   │   │
│   │   └── 📁 image/                  # Product images
│   │       ├── 1.png (iPhone 15)
│   │       ├── 2.png (iQOO Z6 Lite)
│   │       ├── 3.png (Samsung S24 Ultra)
│   │       └── ... (24 product images total)
│   │
│   └── 📁 node_modules/               # Installed npm packages (not in git)
│
├── 📄 README.md                       # This file
└── 📄 .git/                           # Git repository data
```

### File Descriptions

| File | Purpose |
|------|---------|
| **index.js** | Express server configuration, API routes, database connection |
| **script.js** | Product listing, cart management, localStorage operations |
| **chatbot.js** | Google Gemini integration, conversation handling, product recommendations |
| **location-delivery.js** | Leaflet map initialization, geolocation, delivery zone calculations |
| **home.html** | Main shopping interface with navigation, product grid, and cart |
| **login.html** | Dual-purpose authentication page (login/signup forms) |
| **products.json** | Product database (24 items with specifications) |

---

## 💡 Interview Talking Points

### Technical Skills Demonstrated

#### 1. Full-Stack Development
- **Backend**: Built RESTful API with Express.js handling authentication and routing
- **Frontend**: Created responsive, interactive UI with vanilla JavaScript
- **Database**: Designed schema and implemented CRUD operations with MongoDB/Mongoose
- **Integration**: Connected all tiers seamlessly with proper error handling

#### 2. Problem-Solving Approach
- **Challenge**: Implementing real-time product recommendations
- **Solution**: Integrated Google Gemini AI API with context-aware conversation flow
- **Result**: Users can get personalized suggestions based on budget and needs

#### 3. API Integration
- **Multiple APIs**: Successfully integrated 3 external services (Gemini AI, OpenStreetMap, Geolocation)
- **Async Operations**: Handled promises and async/await for non-blocking operations
- **Error Handling**: Implemented fallback mechanisms for API failures

#### 4. UI/UX Design
- **Responsive Design**: Mobile-first approach using Bootstrap grid system
- **User Experience**: 
  - Loading spinners for async operations
  - Real-time cart updates without page refresh
  - Smooth animations and transitions
  - Intuitive navigation structure

#### 5. Security Considerations
- **Input Validation**: Client and server-side validation
- **Environment Variables**: Sensitive data stored in `.env` file
- **CORS Configuration**: Controlled cross-origin access
- **Future Improvements**: Password hashing (bcrypt), JWT tokens, input sanitization

### Project Scalability

#### Current Implementation
- Supports 24 products across multiple categories
- Handles user authentication and session management
- Processes real-time location data and delivery calculations

#### Scalability Improvements Identified
1. **Caching**: Implement Redis for frequently accessed product data
2. **Load Balancing**: Use PM2 or nginx for handling multiple server instances
3. **Database Optimization**: Add indexes, implement pagination for large datasets
4. **CDN Integration**: Serve static assets (images, CSS, JS) via CDN
5. **Microservices**: Separate authentication, products, and orders into individual services

### Code Quality
- **Modular Structure**: Separated concerns (routes, models, views)
- **Reusable Functions**: DRY principle applied throughout
- **Comments**: Code documented for maintainability
- **Version Control**: Git with meaningful commit messages
- **Error Handling**: Try-catch blocks and proper error responses

### Business Understanding
- **E-commerce Flow**: Complete purchase journey from landing to cart
- **Customer Support**: AI chatbot reduces customer service overhead
- **Delivery Optimization**: Zone-based pricing maximizes efficiency
- **Marketing Features**: Discount calculations, featured products, weather-based offers

---

## 🔮 Future Enhancements

### Phase 1 - Security & Authentication
- [ ] Implement **bcrypt** for password hashing
- [ ] Add **JWT tokens** for stateless authentication
- [ ] Implement **email verification** for new signups
- [ ] Add **password reset** functionality via email
- [ ] Implement **rate limiting** to prevent abuse
- [ ] Add **CSRF protection** for forms

### Phase 2 - E-Commerce Features
- [ ] **Payment Gateway Integration** (Razorpay, Stripe)
- [ ] **Order Management System**:
  - Order history
  - Order tracking
  - Invoice generation
- [ ] **Product Reviews & Ratings**
- [ ] **Wishlist Functionality**
- [ ] **Product Comparison Tool**
- [ ] **Advanced Filters**: Price range, brand, ratings, availability
- [ ] **Search Autocomplete** with suggestions

### Phase 3 - User Experience
- [ ] **User Profile Management**:
  - Edit profile
  - Saved addresses
  - Payment methods
- [ ] **Notifications System**:
  - Order updates
  - Delivery status
  - Promotional offers
- [ ] **Multiple Address Support**
- [ ] **Product Recommendations** based on browsing history
- [ ] **Recently Viewed Products**

### Phase 4 - Performance & Scalability
- [ ] **Database Migration**: Move products from JSON to MongoDB
- [ ] **Image Optimization**: Compress and lazy-load images
- [ ] **CDN Integration**: CloudFront or Cloudinary for assets
- [ ] **Server-Side Rendering (SSR)**: Improve SEO and initial load
- [ ] **Progressive Web App (PWA)**: Offline support, installability
- [ ] **Caching Strategy**: Redis for session and product data
- [ ] **API Pagination**: Implement cursor-based pagination

### Phase 5 - Admin Panel
- [ ] **Admin Dashboard**:
  - Sales analytics
  - User management
  - Product inventory management
- [ ] **Seller Portal**: Multi-vendor support
- [ ] **Content Management System (CMS)** for dynamic pages
- [ ] **Promotional Campaigns Management**

### Phase 6 - Advanced Features
- [ ] **Real-time Chat Support** (Socket.io)
- [ ] **Voice Search** integration
- [ ] **AR Product Preview** (for compatible devices)
- [ ] **Multi-language Support** (i18n)
- [ ] **Multi-currency Support**
- [ ] **Social Login**: Google, Facebook OAuth
- [ ] **Inventory Management**: Low stock alerts

### Phase 7 - Analytics & Monitoring
- [ ] **Google Analytics** integration
- [ ] **Error Monitoring**: Sentry or Rollbar
- [ ] **Performance Monitoring**: New Relic or DataDog
- [ ] **A/B Testing** framework
- [ ] **User Behavior Tracking**

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### How to Contribute
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Update README if adding new features
- Test thoroughly before submitting PR
- Ensure no breaking changes to existing functionality

### Areas Looking for Contributions
- Security improvements (password hashing, JWT)
- Payment gateway integration
- Additional product categories
- Mobile app development (React Native)
- Unit and integration tests
- Documentation improvements

---

## 📄 License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2024 Satish Anadasu (SP0496)

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

---

## 👨‍💻 Author

**Satish Anadasu**

- GitHub: [@SP0496](https://github.com/SP0496)
- Email: satishanadasu8@gmail.com
- LinkedIn: [Add your LinkedIn profile]
- Portfolio: [Add your portfolio link]

---

## 🙏 Acknowledgments

- **MongoDB** for the excellent NoSQL database
- **Express.js** community for the robust framework
- **Google Gemini AI** for powering the intelligent chatbot
- **OpenStreetMap** for free mapping services
- **Bootstrap** team for the responsive framework
- **Font Awesome & Bootstrap Icons** for the icon libraries

---

## 📞 Support

If you have any questions or need assistance:

1. **Open an Issue**: [GitHub Issues](https://github.com/SP0496/Full-Stack-Online-Electronics-Marketplace/issues)
2. **Email**: satishanadasu8@gmail.com
3. **Discussions**: [GitHub Discussions](https://github.com/SP0496/Full-Stack-Online-Electronics-Marketplace/discussions)

---

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

<div align="center">

### 🚀 Built with passion for learning and innovation

**Made with ❤️ by Satish Anadasu**

[⬆ Back to Top](#-full-stack-online-electronics-marketplace)

</div>
