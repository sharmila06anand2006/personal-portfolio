# Sharmila A - Full-Stack Personal Portfolio

A modern, full-stack personal portfolio website for Sharmila A, an Electronics and Communication Engineering student. This project demonstrates frontend, backend, database integration, CRUD operations, and is deployment-ready.

## 🎯 Features

### Frontend
- **Modern UI/UX**: Responsive design with dark theme and cyan/blue accents
- **Animations**: Smooth scrolling, typing animations, fade-in effects
- **Sections**: Home, About, Education, Skills, Projects, Internship, Achievements, Certifications, Contact
- **Mobile Responsive**: Fully responsive design for all devices

### Backend
- **Node.js & Express.js**: RESTful API architecture
- **MongoDB Integration**: NoSQL database for projects, messages, and admin data
- **Authentication**: JWT-based admin authentication
- **CRUD Operations**: Complete create, read, update, delete functionality

### Database
- **Projects Collection**: Store and manage portfolio projects
- **Messages Collection**: Store contact form submissions
- **Admin Collection**: Secure admin user management with bcrypt hashing

### Admin Dashboard
- **Admin Login**: Secure authentication with JWT tokens
- **Project Management**: Add, edit, delete projects
- **Message Management**: View and manage contact messages
- **Responsive Admin Panel**: Works on all devices

## 📁 Project Structure

```
PersonalPortfolio/
├── public/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Global styles
│   └── script.js           # Frontend JavaScript
├── models/
│   ├── Project.js          # Project MongoDB schema
│   ├── Message.js          # Message MongoDB schema
│   └── Admin.js            # Admin MongoDB schema
├── routes/
│   ├── projects.js         # Projects API endpoints
│   ├── contact.js          # Contact API endpoints
│   └── auth.js             # Authentication endpoints
├── server.js               # Express server configuration
├── package.json            # Project dependencies
├── .env                    # Environment variables (local)
├── .env.example            # Environment variables template
├── vercel.json             # Vercel deployment config
├── Procfile                # Heroku/Render deployment config
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v14 or higher
- **npm**: v6 or higher
- **MongoDB**: Local instance or MongoDB Atlas account

### Local Development Setup

1. **Clone the repository**
   ```bash
   cd PersonalPortfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the values in `.env`:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/portfolio
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5000
   JWT_SECRET=your-secret-key
   ```

4. **Start MongoDB** (if using local MongoDB)
   ```bash
   # Windows
   mongod

   # macOS
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod
   ```

5. **Start the development server**
   ```bash
   npm start
   # or with auto-reload (if nodemon is installed)
   npm run dev
   ```

6. **Open in browser**
   - Navigate to `http://localhost:5000`

## 📚 API Documentation

### Projects API

#### GET /api/projects
Fetch all projects
```bash
curl http://localhost:5000/api/projects
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "Project Title",
      "description": "Description",
      "technologies": ["Tech1", "Tech2"],
      "image": "/images/project.jpg",
      "githubLink": "https://github.com/...",
      "date": "2025-06-05T00:00:00.000Z"
    }
  ]
}
```

#### POST /api/projects
Create a new project (requires valid request body)
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Project",
    "description": "Description",
    "technologies": ["Tech1", "Tech2"],
    "image": "/images/project.jpg",
    "githubLink": "https://github.com/..."
  }'
```

#### PUT /api/projects/:id
Update a project
```bash
curl -X PUT http://localhost:5000/api/projects/PROJECT_ID \
  -H "Content-Type: application/json" \
  -d '{ "title": "Updated Title" }'
```

#### DELETE /api/projects/:id
Delete a project
```bash
curl -X DELETE http://localhost:5000/api/projects/PROJECT_ID
```

### Contact API

#### POST /api/contact
Submit a contact message
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Your Name",
    "email": "your@email.com",
    "subject": "Subject",
    "message": "Your message"
  }'
```

#### GET /api/contact
Fetch all messages (admin only)
```bash
curl http://localhost:5000/api/contact \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Authentication API

#### POST /api/auth/register
Register a new admin (one-time setup)
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@email.com",
    "password": "secure_password"
  }'
```

#### POST /api/auth/login
Admin login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "secure_password"
  }'
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "...",
    "username": "admin",
    "email": "admin@email.com"
  }
}
```

## 🔐 Admin Dashboard Access

### Default Admin Credentials (First Time Setup)

1. **Register Admin (One-time)**
   ```bash
   # Use the API or admin registration form
   POST /api/auth/register
   {
     "username": "sharmila",
     "email": "sharmilaanand0612@gmail.com",
     "password": "secure_password"
   }
   ```

2. **Login to Admin Dashboard**
   - Navigate to `/admin` in your browser
   - Enter credentials
   - Manage projects and messages

### Admin Features
- ✅ Add new projects
- ✅ Edit existing projects
- ✅ Delete projects
- ✅ View contact messages
- ✅ Mark messages as read/replied
- ✅ Delete messages

## 🌍 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Set Environment Variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A strong random string
     - `NODE_ENV`: production

3. **Deploy**
   - Click "Deploy"
   - Your site will be live!

### Deploy to Render

1. **Push to GitHub** (same as above)

2. **Create a Render Service**
   - Go to [render.com](https://render.com)
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Set the Build Command: `npm install`
   - Set the Start Command: `npm start`

3. **Set Environment Variables**
   - Add `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV`

4. **Deploy**
   - Click "Create Web Service"

### Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_secret_key
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **View Logs**
   ```bash
   heroku logs --tail
   ```

## 🗄️ Database Setup

### Using MongoDB Atlas (Recommended for Production)

1. **Create Account**: Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)

2. **Create Cluster**
   - Create a free cluster
   - Choose your region

3. **Get Connection String**
   - Click "Connect"
   - Copy the connection string
   - Replace `<username>` and `<password>`

4. **Update .env**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

### Using Local MongoDB

1. **Install MongoDB**
   - Download from [mongodb.com/try/download/community](https://mongodb.com/try/download/community)

2. **Start MongoDB**
   ```bash
   mongod
   ```

3. **Use Local Connection**
   ```
   MONGODB_URI=mongodb://localhost:27017/portfolio
   ```

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome Icons
- Google Fonts

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs (Password Hashing)

### Deployment
- Vercel
- Render
- Heroku
- MongoDB Atlas

## 📋 Portfolio Data

### Projects Included
1. **Intelligent Smart Access and Visitor Management System**
   - Technologies: ESP32, Embedded C, OpenCV
   - Face-detection based access control

2. **Underground Vacuum Collection System**
   - Technologies: ESP32, Arduino IDE, IoT Sensors
   - IoT-based waste management

3. **Deep Learning-Driven Crop Disease Management System**
   - Technologies: Python, Machine Learning, Deep Learning
   - Real-time disease detection

### Skills
- **Programming**: Java, Python, Embedded C
- **Web**: HTML, CSS, JavaScript, MySQL
- **Tools**: GitHub, VS Code, Figma, Canva, Google Cloud

### Achievements
- Research Publication at ICTCS 2025 Springer LNNS
- 2nd Place in Paper Presentation at SVEC College
- Top 50 in Visa AI Hackathon 2026 at IIT Madras
- Special Mention & 4th Place in SSN Envision Hackathon 2025

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Environment variable protection
- ✅ Input validation
- ✅ CORS configuration
- ✅ Error handling

## 📱 Responsive Design

- ✅ Mobile (320px and up)
- ✅ Tablet (768px and up)
- ✅ Desktop (1024px and up)
- ✅ Large screens (1440px and up)

## 🐛 Troubleshooting

### MongoDB Connection Error
- **Solution**: Ensure MongoDB is running or check your connection string

### Port Already in Use
```bash
# Find and kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID PID_NUMBER /F

# macOS/Linux
lsof -i :5000
kill -9 PID_NUMBER
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Environment Variables Not Loading
- Ensure `.env` file exists in root directory
- Check for typos in variable names
- Restart the server after changing `.env`

## 📄 License

This project is open source and available under the ISC License.

## 👤 Author

**Sharmila A**
- Email: sharmilaanand0612@gmail.com
- LinkedIn: [linkedin.com/in/sharmilaanand06](https://linkedin.com/in/sharmilaanand06)
- GitHub: [github.com/sharmila06anand2006](https://github.com/sharmila06anand2006)

## 🙏 Acknowledgments

- Built for internship placement requirements
- Demonstrates full-stack development capabilities
- Deployment-ready production code

---

**Last Updated**: June 5, 2026

For questions or support, contact: sharmilaanand0612@gmail.com
