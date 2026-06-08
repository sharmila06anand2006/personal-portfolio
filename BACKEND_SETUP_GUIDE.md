# 📚 Personal Portfolio Backend - Complete Setup Guide

## 📋 Table of Contents
1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Installation & Setup](#installation--setup)
4. [MongoDB Atlas Setup](#mongodb-atlas-setup)
5. [Running the Backend](#running-the-backend)
6. [API Documentation](#api-documentation)
7. [Testing with Postman](#testing-with-postman)
8. [Frontend Integration](#frontend-integration)
9. [Troubleshooting](#troubleshooting)

---

## 🗂️ Project Structure

```
PersonalPortfolio/
├── server.js                 # Main Express server
├── package.json             # Project dependencies
├── .env.example             # Environment variables template
├── .env                     # Your actual environment variables (NOT in git)
│
├── models/
│   ├── Project.js          # Project database schema
│   └── Contact.js          # Contact form schema
│
├── routes/
│   ├── projects.js         # Project API routes
│   └── contact.js          # Contact API routes
│
└── public/
    ├── index.html          # Main website
    ├── script.js           # Frontend JavaScript with API calls
    ├── style.css           # Website styling
    └── ...other files
```

---

## ✅ Prerequisites

Before starting, make sure you have:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **MongoDB Atlas Account** (Free tier available)
   - Sign up at: https://www.mongodb.com/cloud/atlas
   - Free tier: 512 MB storage, perfect for learning

4. **Code Editor** (VS Code recommended)
   - Download from: https://code.visualstudio.com/

5. **Postman** (For testing APIs)
   - Download from: https://www.postman.com/downloads/

---

## 🚀 Installation & Setup

### Step 1: Install Node.js Dependencies

Navigate to your project folder and install all required packages:

```bash
cd path/to/PersonalPortfolio
npm install
```

This will install:
- **express** - Web framework
- **mongoose** - MongoDB driver
- **cors** - Cross-origin requests
- **dotenv** - Environment variables
- **nodemon** - Auto-reload during development

### Step 2: Create Environment Variables

Copy the `.env.example` file to `.env`:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

Open `.env` file and add your MongoDB connection string (we'll get this next).

---

## 📦 MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up" (use Google/GitHub for quick signup)
3. Verify your email

### Step 2: Create a Cluster

1. Click "Create" button on the left sidebar
2. Choose **Free Tier** (M0 - Sandbox)
3. Select your nearest region
4. Click "Create Cluster"
5. Wait 2-3 minutes for cluster creation

### Step 3: Create Database User

1. Go to **Security → Database Access**
2. Click "Add New Database User"
3. Choose **Password** authentication
4. Username: `admin` (or your choice)
5. Password: Create a strong password (save it!)
6. Click "Add User"

**Important:** Save your username and password!

### Step 4: Get Connection String

1. Go to **Deployment → Databases**
2. Click "Connect" button on your cluster
3. Choose "Drivers"
4. Copy the connection string (Node.js driver)

It will look like:
```
mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 5: Add Connection String to .env

Replace `<password>` with your actual password:

```env
MONGODB_URI=mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

**Note:** If your password has special characters, URL-encode them:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`

### Step 6: Allow All IP Addresses (For Testing)

1. Go to **Security → Network Access**
2. Click "Edit" next to the IP entry
3. Change IP to `0.0.0.0/0` (Allow all)
4. Click "Confirm"

⚠️ **For production:** Only allow specific IP addresses

---

## ▶️ Running the Backend

### Development Mode (with auto-reload)

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running at http://localhost:5000
📁 Static files served from /public
```

### Production Mode

```bash
npm start
```

### Check if Server is Running

Open your browser and visit: `http://localhost:5000/api/health`

You should see:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 📡 API Documentation

### 1. Get All Projects
**Endpoint:** `GET /api/projects`

**Request:**
```bash
curl http://localhost:5000/api/projects
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "title": "E-Commerce Platform",
      "description": "Online shopping platform with payment integration",
      "technologies": ["React", "Node.js", "MongoDB"],
      "githubLink": "https://github.com/username/ecommerce",
      "image": "https://example.com/image.jpg",
      "date": "December 2023",
      "createdAt": "2024-01-10T12:00:00.000Z",
      "updatedAt": "2024-01-10T12:00:00.000Z"
    }
  ]
}
```

---

### 2. Create New Project
**Endpoint:** `POST /api/projects`

**Request Body:**
```json
{
  "title": "My Awesome Project",
  "description": "A brief description of what the project does",
  "technologies": ["React", "Node.js", "MongoDB"],
  "githubLink": "https://github.com/username/project",
  "image": "https://example.com/project-image.jpg",
  "date": "January 2024"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "My Awesome Project",
    "description": "A brief description of what the project does",
    "technologies": ["React", "Node.js", "MongoDB"],
    "githubLink": "https://github.com/username/project",
    "image": "https://example.com/project-image.jpg",
    "date": "January 2024",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 3. Submit Contact Form
**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in discussing your services..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully. Thank you for contacting!",
  "data": {
    "_id": "65a2c3d4e5f6g7h8i9j0k1l2",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I'm interested in discussing your services...",
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

---

### 4. Get All Contact Messages
**Endpoint:** `GET /api/contact`

**Request:**
```bash
curl http://localhost:5000/api/contact
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "65a2c3d4e5f6g7h8i9j0k1l2",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Project Inquiry",
      "message": "I'm interested in discussing your services...",
      "createdAt": "2024-01-15T10:35:00.000Z",
      "updatedAt": "2024-01-15T10:35:00.000Z"
    }
  ]
}
```

---

## 🧪 Testing with Postman

### Step 1: Open Postman
- Launch Postman application
- Click "New" → "HTTP Request"

### Step 2: Test GET Projects

1. **Method:** Select `GET`
2. **URL:** `http://localhost:5000/api/projects`
3. Click **Send**

Expected: See all projects in JSON format

### Step 3: Test POST Project

1. **Method:** Select `POST`
2. **URL:** `http://localhost:5000/api/projects`
3. **Headers:** 
   - Key: `Content-Type`
   - Value: `application/json`
4. **Body:** Click "raw" → "JSON" → Paste:
```json
{
  "title": "My Portfolio Project",
  "description": "A great project I built",
  "technologies": ["HTML", "CSS", "JavaScript"],
  "githubLink": "https://github.com/yourname/project",
  "image": "https://via.placeholder.com/300x200",
  "date": "January 2024"
}
```
5. Click **Send**

Expected: Project created with success: true

### Step 4: Test POST Contact

1. **Method:** Select `POST`
2. **URL:** `http://localhost:5000/api/contact`
3. **Headers:**
   - Key: `Content-Type`
   - Value: `application/json`
4. **Body:** Click "raw" → "JSON" → Paste:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "subject": "Testing the API",
  "message": "This is a test message from Postman"
}
```
5. Click **Send**

Expected: Message saved successfully

### Step 5: Test GET Contact Messages

1. **Method:** Select `GET`
2. **URL:** `http://localhost:5000/api/contact`
3. Click **Send**

Expected: See all contact messages

---

## 🌐 Frontend Integration

### How the Frontend Works

Your `script.js` file in `/public` has been updated with:

1. **Loading Projects Dynamically**
   - Fetches from `/api/projects`
   - Displays in projects grid
   - Shows technologies and GitHub link

2. **Contact Form Submission**
   - Collects form data
   - Validates email format
   - Sends to `/api/contact`
   - Shows success/error messages

### How It Works Together

```
Frontend (HTML/CSS/JS)
    ↓
Fetch API Call
    ↓
Backend Server (Express)
    ↓
MongoDB (Store Data)
    ↓
Response Back to Frontend
    ↓
Display Data on Page
```

### Testing Integration

1. **Start backend:**
   ```bash
   npm run dev
   ```

2. **Open website:** `http://localhost:5000`

3. **Test Projects:**
   - Projects should load dynamically from database
   - If you added projects via Postman, they'll appear

4. **Test Contact Form:**
   - Fill in contact form
   - Click submit
   - You should see "Thank you!" message
   - Check database with `/api/contact` endpoint

---

## ❓ Troubleshooting

### Issue: "Cannot find module 'mongoose'"

**Solution:**
```bash
npm install
```

Make sure you're in the project directory.

---

### Issue: "MONGODB_URI not found in .env file"

**Solution:**
1. Check if `.env` file exists in project root
2. Make sure you have this line:
   ```
   MONGODB_URI=mongodb+srv://...
   ```
3. Restart server after creating `.env`

---

### Issue: "MongoDB Connection Error"

**Possible causes:**

1. **Wrong connection string** - Copy it again from MongoDB Atlas
2. **Wrong password** - Check special characters are URL-encoded
3. **IP not whitelisted** - Go to Network Access and add your IP
4. **Database doesn't exist** - MongoDB creates it automatically, no action needed

---

### Issue: "CORS error" / "Access to fetch blocked"

**Check:**
1. Is backend running on `http://localhost:5000`?
2. Is frontend fetching from correct URL?
3. Backend has CORS enabled (it does by default)

---

### Issue: "404 - Route not found"

**Check API endpoints:**
- GET `/api/projects` ✅
- POST `/api/projects` ✅
- POST `/api/contact` ✅
- GET `/api/contact` ✅

Make sure you're using exact URL.

---

## 📚 Code Structure Explanation

### server.js
- **Purpose:** Main Express server setup
- **Does:** Connects MongoDB, registers routes, starts server
- **Key lines:** Line 40 (MongoDB connection), Line 55-58 (routes)

### models/Project.js
- **Purpose:** Define project database structure
- **Fields:** title, description, technologies, githubLink, image, date
- **Validates:** Required fields, max lengths, valid URLs

### models/Contact.js
- **Purpose:** Define contact form structure
- **Fields:** name, email, subject, message
- **Validates:** Required fields, valid email format

### routes/projects.js
- **GET /:** Fetch all projects
- **POST /:** Create new project

### routes/contact.js
- **POST /:** Save contact message
- **GET /:** Fetch all messages

### public/script.js
- **Functions:**
  - `loadProjectsFromDB()` - Fetch and display projects
  - `initializeContactForm()` - Handle form submission
  - Various other UI functions

---

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Set up MongoDB Atlas
3. ✅ Configure `.env` file
4. ✅ Start backend server
5. ✅ Test APIs with Postman
6. ✅ Add sample projects
7. ✅ Test contact form
8. ✅ Deploy (Vercel/Heroku/Railway)

---

## 📞 Support

**Issues?** Check:
- Console for error messages
- MongoDB Atlas cluster status
- Network connectivity
- API endpoint URLs in script.js

---

## 📝 Summary

You now have a **complete, simple, and professional backend** for your portfolio:

✅ MongoDB database (Cloud-hosted)
✅ RESTful API with 4 endpoints
✅ Project management system
✅ Contact form with validation
✅ Beginner-friendly code with comments
✅ Frontend integration ready

**This is perfect for:**
- Student internship submission
- Portfolio website
- Learning full-stack development
- Demonstrating backend skills

---

**Good luck with your portfolio! 🚀**
