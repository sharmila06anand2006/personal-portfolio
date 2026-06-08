# 🏗️ Backend Architecture & Code Explanation

## 📌 Quick Overview

Your backend is a **RESTful API** that:
- Stores projects and contact messages in MongoDB
- Provides API endpoints for frontend to fetch/submit data
- Uses Express.js to handle HTTP requests
- Validates all incoming data
- Returns JSON responses

---

## 🔄 Request-Response Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Browser)                       │
│  - HTML page with contact form                              │
│  - JavaScript to call API endpoints                         │
└────────────────────┬────────────────────────────────────────┘
                     │ fetch() call
                     ↓
┌─────────────────────────────────────────────────────────────┐
│               EXPRESS SERVER (Node.js)                      │
│  - Receives HTTP request                                    │
│  - Routes to correct handler                                │
│  - Validates data                                           │
│  - Queries/updates MongoDB                                  │
└────────────────────┬────────────────────────────────────────┘
                     │ MongoDB query
                     ↓
┌─────────────────────────────────────────────────────────────┐
│          MONGODB (Cloud Database)                           │
│  - Stores project documents                                 │
│  - Stores contact messages                                  │
│  - Returns matching documents                               │
└────────────────────┬────────────────────────────────────────┘
                     │ returns data
                     ↓
┌─────────────────────────────────────────────────────────────┐
│               EXPRESS SERVER                                │
│  - Sends JSON response with 200 status                      │
└────────────────────┬────────────────────────────────────────┘
                     │ JSON response
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND                                 │
│  - Receives JSON data                                       │
│  - JavaScript displays it on page                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 File-by-File Explanation

### 1. **server.js** - Main Application File

```javascript
// ===== IMPORTS =====
const express = require('express');      // Web framework
const cors = require('cors');            // Allow cross-origin requests
const mongoose = require('mongoose');    // MongoDB driver
require('dotenv').config();              // Load .env variables

// ===== MIDDLEWARE =====
app.use(cors());                         // Enable CORS
app.use(express.json());                 // Parse JSON body
app.use(express.static('public'));       // Serve static files

// ===== DATABASE CONNECTION =====
mongoose.connect(MONGODB_URI)            // Connect to MongoDB

// ===== ROUTES =====
app.use('/api/projects', projectRoutes); // Project endpoints
app.use('/api/contact', contactRoutes);  // Contact endpoints

// ===== START SERVER =====
app.listen(PORT)                         // Listen on port
```

**Key Concepts:**
- `require()` - Import npm packages
- `app.use()` - Add middleware
- `app.listen()` - Start server

---

### 2. **models/Project.js** - Project Database Schema

```javascript
// Define what a project looks like in the database
const projectSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide a project title'],  // Validation
        maxlength: [100, 'Title too long']                   // Max 100 chars
    },
    description: {
        type: String,
        required: true
    },
    technologies: {
        type: [String],  // Array of strings
        required: true
    },
    githubLink: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'Invalid URL']  // Must start with http/https
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

// Creates the "Project" collection in database
module.exports = mongoose.model('Project', projectSchema);
```

**Example Project Document in Database:**
```json
{
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "E-Commerce Website",
    "description": "Full-stack shopping platform",
    "technologies": ["React", "Node.js", "MongoDB"],
    "githubLink": "https://github.com/user/shop",
    "image": "https://example.com/shop.jpg",
    "date": "December 2023",
    "createdAt": "2024-01-10T12:00:00Z",
    "updatedAt": "2024-01-10T12:00:00Z"
}
```

---

### 3. **models/Contact.js** - Contact Form Schema

```javascript
// Define what a contact message looks like
const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        maxlength: [50, 'Name too long']
    },
    email: {
        type: String,
        required: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email']
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        maxlength: [2000, 'Message too long']
    }
});

// Creates the "Contact" collection in database
module.exports = mongoose.model('Contact', contactSchema);
```

**Example Contact Document:**
```json
{
    "_id": "65a2c3d4e5f6g7h8i9j0k1l2",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I'm interested in your services...",
    "createdAt": "2024-01-15T10:35:00Z",
    "updatedAt": "2024-01-15T10:35:00Z"
}
```

---

### 4. **routes/projects.js** - Project Endpoints

#### GET /api/projects
```javascript
router.get('/', async (req, res) => {
    // Step 1: Find all projects in database
    const projects = await Project.find().sort({ date: -1 });
    
    // Step 2: Send response
    res.json({
        success: true,
        count: projects.length,
        data: projects
    });
});
```

**What happens:**
1. Frontend sends: `GET /api/projects`
2. Server searches MongoDB for all projects
3. Sorts by date (newest first)
4. Sends back JSON with all projects
5. Frontend receives and displays them

#### POST /api/projects
```javascript
router.post('/', async (req, res) => {
    // Step 1: Get data from request body
    const { title, description, technologies, githubLink, image, date } = req.body;
    
    // Step 2: Validate data
    if (!title || !description) {
        return res.status(400).json({ success: false, message: 'Missing fields' });
    }
    
    // Step 3: Create new project
    const newProject = new Project({
        title: title.trim(),
        description: description.trim(),
        technologies,
        githubLink,
        image,
        date
    });
    
    // Step 4: Save to database
    const savedProject = await newProject.save();
    
    // Step 5: Send response
    res.status(201).json({
        success: true,
        message: 'Project created',
        data: savedProject
    });
});
```

**What happens:**
1. Frontend sends: `POST /api/projects` with project data
2. Server receives data from request body
3. Server validates all required fields exist
4. Creates new Project object
5. Saves to MongoDB
6. Sends back the saved project with ID
7. Frontend shows success message

---

### 5. **routes/contact.js** - Contact Endpoints

#### POST /api/contact
```javascript
router.post('/', async (req, res) => {
    // Get form data from request
    const { name, email, subject, message } = req.body;
    
    // Validate
    if (!name || !email) return res.status(400).json({ success: false });
    
    // Create new contact
    const newContact = new Contact({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim()
    });
    
    // Save to database
    const saved = await newContact.save();
    
    // Send response
    res.status(201).json({
        success: true,
        message: 'Message sent successfully!',
        data: saved
    });
});
```

#### GET /api/contact
```javascript
router.get('/', async (req, res) => {
    // Find all contacts, sorted newest first
    const messages = await Contact.find().sort({ createdAt: -1 });
    
    res.json({
        success: true,
        count: messages.length,
        data: messages
    });
});
```

---

### 6. **public/script.js** - Frontend API Integration

#### Loading Projects Dynamically
```javascript
async function loadProjectsFromDB() {
    // Step 1: Fetch from API
    const response = await fetch(`${API_BASE_URL}/projects`);
    const data = await response.json();
    
    // Step 2: Display projects
    if (data.success && data.data.length > 0) {
        displayProjects(data.data);
    }
}

function displayProjects(projects) {
    // Step 1: Clear old projects
    projectsGrid.innerHTML = '';
    
    // Step 2: Loop through projects
    projects.forEach(project => {
        // Step 3: Create HTML for each project
        const html = `
            <div class="project-card">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ...
            </div>
        `;
        
        // Step 4: Add to page
        projectsGrid.appendChild(html);
    });
}
```

#### Submitting Contact Form
```javascript
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        message: messageInput.value
    };
    
    // Send to backend
    const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    // Show result to user
    if (data.success) {
        showMessage('✅ Message sent!', 'success');
        contactForm.reset();
    } else {
        showMessage('❌ Error: ' + data.message, 'error');
    }
});
```

---

## 🔐 Error Handling

### How Errors Are Handled

```javascript
try {
    // Try to do something
    const result = await Project.find();
    res.json(result);
} catch (error) {
    // If error occurs, catch it
    console.error('Error:', error.message);
    
    // Send error response
    res.status(500).json({
        success: false,
        message: 'Server error occurred',
        error: error.message
    });
}
```

### Common HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Project fetched successfully |
| 201 | Created | New project added |
| 400 | Bad Request | Missing required field |
| 404 | Not Found | Route doesn't exist |
| 500 | Server Error | Database connection failed |

---

## 🔑 Data Validation

### Server-Side Validation (In Models)

```javascript
{
    title: {
        type: String,
        required: [true, 'Title required'],        // Must exist
        maxlength: [100, 'Too long'],              // Max 100 chars
        trim: true                                 // Remove spaces
    },
    email: {
        type: String,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email']  // Must be email format
    }
}
```

### Frontend Validation (In script.js)

```javascript
// Check if empty
if (!name || !email) {
    showMessage('All fields required', 'error');
    return;
}

// Check email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    showMessage('Invalid email', 'error');
    return;
}
```

**Why both?**
- Frontend: Quick feedback to user
- Server: Security (prevent invalid data in database)

---

## 🚀 Deployment Considerations

### Environment Variables

**Development (.env):**
```env
MONGODB_URI=mongodb+srv://admin:password@cluster.mongodb.net/portfolio
PORT=5000
NODE_ENV=development
```

**Production (.env on server):**
```env
MONGODB_URI=mongodb+srv://admin:SecurePassword123@cluster.mongodb.net/portfolio
PORT=5000
NODE_ENV=production
```

### CORS Policy

Currently, the backend allows requests from all origins:
```javascript
app.use(cors()); // Allow all origins
```

For production, specify allowed origins:
```javascript
app.use(cors({
    origin: 'https://yourportfolio.com',
    credentials: true
}));
```

---

## 🔍 How MongoDB Works

### Collections & Documents

```
┌──────────────────────────────────────┐
│         Portfolio Database           │
├──────────────────────────────────────┤
│  Projects Collection                 │
│  ├─ Document 1: E-Commerce Website   │
│  ├─ Document 2: Chat Application     │
│  └─ Document 3: IoT Dashboard        │
├──────────────────────────────────────┤
│  Contacts Collection                 │
│  ├─ Document 1: John's Message       │
│  ├─ Document 2: Jane's Message       │
│  └─ Document 3: Bob's Message        │
└──────────────────────────────────────┘
```

### CRUD Operations

| Operation | Method | Purpose |
|-----------|--------|---------|
| **C**reate | POST | Add new document |
| **R**ead | GET | Fetch documents |
| **U**pdate | PUT/PATCH | Modify document |
| **D**elete | DELETE | Remove document |

Your backend currently supports:
- ✅ Create projects (POST)
- ✅ Read projects (GET)
- ✅ Create contacts (POST)
- ✅ Read contacts (GET)

---

## 📊 Database Query Examples

### Find All Projects
```javascript
const all = await Project.find();
// Returns all projects
```

### Find Projects by Technology
```javascript
const reactProjects = await Project.find({
    technologies: 'React'
});
// Returns projects that use React
```

### Find and Sort
```javascript
const recent = await Project.find().sort({ date: -1 });
// Returns projects newest first
```

### Update Project
```javascript
await Project.findByIdAndUpdate(id, {
    title: 'New Title'
});
// Updates the project's title
```

### Delete Project
```javascript
await Project.findByIdAndDelete(id);
// Removes the project
```

---

## 🧪 Testing Checklist

- [ ] Backend starts without errors
- [ ] `/api/health` returns status ok
- [ ] `/api/projects` returns empty array `[]`
- [ ] Can POST a new project
- [ ] Can GET all projects (includes posted project)
- [ ] Can POST a contact message
- [ ] Can GET all contacts
- [ ] Frontend loads projects dynamically
- [ ] Contact form submits successfully
- [ ] Error messages show for invalid data

---

## 💡 Best Practices Used

1. **Async/Await** - Modern JavaScript for handling async operations
2. **Try-Catch** - Proper error handling
3. **Comments** - Explaining what each section does
4. **Validation** - Both server and client side
5. **Status Codes** - Proper HTTP responses
6. **REST API** - Standard endpoint naming
7. **Middleware** - Centralizing common tasks
8. **Environment Variables** - Secure configuration
9. **Separation of Concerns** - Models, routes, server separate
10. **Beginner-Friendly** - Clear code, good documentation

---

## 🎓 Learning Outcomes

After understanding this backend, you can:

✅ Build REST APIs with Express.js
✅ Work with MongoDB databases
✅ Handle HTTP requests and responses
✅ Validate form data
✅ Manage errors properly
✅ Integrate backend with frontend
✅ Deploy applications
✅ Write clean, documented code

---

**This backend demonstrates professional full-stack development principles suitable for internship submission!**
