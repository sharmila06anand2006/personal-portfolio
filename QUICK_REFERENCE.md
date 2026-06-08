# ⚡ Quick Reference Guide

## 🚀 Quick Start (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Create .env file with MongoDB URI
# MONGODB_URI=mongodb+srv://...
# PORT=5000

# 3. Start server
npm run dev

# 4. Open browser
# http://localhost:5000
```

---

## 📡 API Endpoints Quick Reference

### Projects

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create new project |

### Contact

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/contact` | Submit contact message |
| GET | `/api/contact` | Get all messages |

### Health

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Check server status |

---

## 🔧 Command Reference

```bash
# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start

# Install a new package
npm install package-name

# List all dependencies
npm list

# Update dependencies
npm update
```

---

## 📝 Request/Response Examples

### GET /api/projects
```bash
curl http://localhost:5000/api/projects
```

Response:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "65a1b2c3...",
      "title": "E-Commerce",
      "description": "Shopping platform",
      "technologies": ["React", "Node.js"],
      "githubLink": "https://github.com/user/ecommerce",
      "image": "https://example.com/image.jpg",
      "date": "December 2023",
      "createdAt": "2024-01-10T12:00:00Z"
    }
  ]
}
```

---

### POST /api/projects
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "A great project",
    "technologies": ["React", "MongoDB"],
    "githubLink": "https://github.com/user/project",
    "image": "https://example.com/image.jpg",
    "date": "January 2024"
  }'
```

---

### POST /api/contact
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "I am interested in your services"
  }'
```

---

### GET /api/contact
```bash
curl http://localhost:5000/api/contact
```

---

## 🗄️ MongoDB Schema Quick Reference

### Project Schema
```javascript
{
  title: String (required, max 100)
  description: String (required, max 1000)
  technologies: [String] (required, array)
  githubLink: String (required, valid URL)
  image: String (required)
  date: String (required)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

### Contact Schema
```javascript
{
  name: String (required, max 50)
  email: String (required, valid email)
  subject: String (required, max 100)
  message: String (required, max 2000)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

---

## 📂 File Locations

```
├── server.js ..................... Main server file
├── package.json .................. Dependencies
├── .env .......................... Environment variables
├── .env.example .................. Environment template
├── models/
│   ├── Project.js ............... Project schema
│   └── Contact.js ............... Contact schema
├── routes/
│   ├── projects.js .............. Project routes
│   └── contact.js ............... Contact routes
└── public/
    └── script.js ................ Frontend API code
```

---

## 🆘 Common Issues & Fixes

### Issue: "Cannot find module"
```bash
Solution: npm install
```

### Issue: "MONGODB_URI not found"
```bash
Solution: Check .env file has MONGODB_URI variable
```

### Issue: "Connection refused"
```bash
Solution: Check MongoDB cluster is active in Atlas
```

### Issue: "CORS error"
```bash
Solution: Backend CORS is enabled, check frontend URL
```

### Issue: "Validation error"
```bash
Solution: Check all required fields are provided
```

---

## 🧪 Postman Collection

### Import Steps

1. Open Postman
2. Click **Import**
3. Click **Raw text**
4. Paste this:

```json
{
  "info": {
    "name": "Portfolio API",
    "description": "Personal Portfolio Backend API"
  },
  "item": [
    {
      "name": "Get All Projects",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/projects"
      }
    },
    {
      "name": "Create Project",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/projects",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"title\":\"Project\",\"description\":\"Description\",\"technologies\":[\"Tech1\"],\"githubLink\":\"https://github.com\",\"image\":\"https://example.com/img.jpg\",\"date\":\"January 2024\"}"
        }
      }
    },
    {
      "name": "Submit Contact",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/contact",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"name\":\"John\",\"email\":\"john@example.com\",\"subject\":\"Subject\",\"message\":\"Message\"}"
        }
      }
    },
    {
      "name": "Get All Messages",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/contact"
      }
    },
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/health"
      }
    }
  ]
}
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `BACKEND_SETUP_GUIDE.md` | Complete setup instructions |
| `CODE_EXPLANATION.md` | How code works (detailed) |
| `DEPLOYMENT_GUIDE.md` | How to deploy and submit |
| `QUICK_REFERENCE.md` | This file - quick lookup |

---

## 🔑 Environment Variables Checklist

```
MONGODB_URI = ✅ MongoDB connection string
PORT = ✅ Server port (default 5000)
NODE_ENV = ✅ development or production
```

---

## ✨ Frontend API Integration

### In `script.js`:

```javascript
// API Base URL (change for production)
const API_BASE_URL = 'http://localhost:5000/api';

// Load projects
async function loadProjectsFromDB() {
    const response = await fetch(`${API_BASE_URL}/projects`);
    const data = await response.json();
    // Display projects...
}

// Submit contact form
contactForm.addEventListener('submit', async (e) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    const data = await response.json();
    // Show result...
});
```

---

## 📊 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid data |
| 404 | Not Found - Route doesn't exist |
| 500 | Server Error - Internal error |

---

## 🎯 Testing Checklist

- [ ] Backend starts without errors
- [ ] GET /api/projects returns data
- [ ] POST /api/projects creates project
- [ ] POST /api/contact saves message
- [ ] GET /api/contact returns messages
- [ ] Frontend loads projects from API
- [ ] Contact form submits successfully
- [ ] No console errors
- [ ] MongoDB has data stored

---

## 🚀 Deployment URLs

After deployment:

```
Frontend: https://yourproject.vercel.app
API:      https://yourproject.vercel.app/api/projects
Health:   https://yourproject.vercel.app/api/health
```

Update frontend:
```javascript
const API_BASE_URL = 'https://yourproject.vercel.app/api';
```

---

## 💻 Development Tips

### Auto-reload on Changes
```bash
npm run dev
# Uses nodemon to auto-restart on file changes
```

### View Database Data
1. Go to MongoDB Atlas
2. Click Collections
3. Browse documents
4. View all projects and contacts

### Debug with Console
```javascript
console.log('Debug message');  // Frontend
console.error('Error:', error); // Backend
```

### Test with Browser DevTools
```javascript
// In browser console:
fetch('http://localhost:5000/api/projects')
  .then(r => r.json())
  .then(d => console.log(d));
```

---

## 📞 Quick Support

**Error in backend:**
1. Check terminal output for error message
2. Verify MongoDB is connected
3. Check request body format
4. Try again

**Error in frontend:**
1. Check browser console
2. Open DevTools (F12)
3. Check network tab
4. Verify API URL is correct

**Database issues:**
1. Login to MongoDB Atlas
2. Check cluster is running
3. Check Network Access allows your IP
4. Verify connection string in .env

---

**This is a quick reference - see other guides for detailed explanations!**
