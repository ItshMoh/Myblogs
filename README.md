# 🖥️ DAILY_LOG - Retro Terminal Blog

A stunning retro CRT-styled blog application with the MERN stack (MongoDB, Express, React, Node.js). Features a vintage terminal aesthetic with scanlines, flicker effects, and paper-like light mode design.

## ✨ Features

- **Retro CRT Interface**: Authentic terminal aesthetics with scanline effects, screen flicker, and VT323 monospace font
- **Boot Sequence**: Nostalgic OS loader animation on startup
- **Micro-Posts**: Twitter-style short posts for quick thoughts
- **Long-Form Articles**: Full article creation and reading system
- **Real-time Updates**: Seamless API integration with MongoDB
- **Responsive Design**: Works beautifully on desktop and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd /home/kayden/Downloads/code/fullStack/blogSite
   ```

2. **Set up the Backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure MongoDB**
   
   Edit `server/.env.example` and add your MongoDB connection string:
   ```env
   MONGODB_URI=your_mongodb_connection_string_here
   PORT=5000
   NODE_ENV=development
   ```
   
   Then rename `.env.example` to `.env` (or copy it):
   ```bash
   cp .env.example .env
   # Edit .env with your actual MongoDB URI
   ```

4. **Set up the Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the Backend Server** (in `server/` directory):
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the Frontend** (in `client/` directory, in a new terminal):
   ```bash
   npm run dev
   ```
   App will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## 📁 Project Structure

```
blogSite/
├── client/                 # Vite + React frontend
│   ├── src/
│   │   ├── api/           # API client functions
│   │   │   └── client.ts  # REST API calls
│   │   ├── App.tsx        # Main application component
│   │   ├── main.tsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── index.html         # HTML template
│   ├── package.json
│   └── vite.config.ts
│
├── server/                # Express + Node.js backend
│   ├── src/
│   │   ├── models/        # MongoDB schemas
│   │   │   ├── Post.ts
│   │   │   └── Article.ts
│   │   ├── routes/        # API routes
│   │   │   ├── posts.ts
│   │   │   └── articles.ts
│   │   └── index.ts       # Server entry point
│   ├── .env               # Environment variables (create from .env.example)
│   ├── package.json
│   └── tsconfig.json
│
└── .gitignore
```

## 🔌 API Endpoints

### Posts
- `GET /api/posts` - Fetch all micro-posts
- `POST /api/posts` - Create a new post
  ```json
  { "content": "Your post content here" }
  ```

### Articles
- `GET /api/articles` - Fetch all articles
- `POST /api/articles` - Create a new article
  ```json
  {
    "title": "Article Title",
    "content": "Article content..."
  }
  ```

## 🎨 Design Philosophy

This application embraces a "paper and ink" aesthetic with a retro CRT twist:
- **Light Mode Terminal**: Near-black text on paper-white background
- **Subtle Effects**: Light scanlines and flicker for authenticity
- **Clean Typography**: VT323 monospace font for terminal feel
- **Micro-animations**: Hover effects and smooth transitions
- **Brutalist UI**: Bold borders, strong shadows, and clear hierarchy

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for blazing-fast development
- Lucide React for icons
- Custom CSS for retro effects

**Backend:**
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- CORS enabled for development

## 📝 Usage

### Creating a Post
1. Navigate to `/MICRO_LOGS` tab
2. Type your message in the input field
3. Click "SEND"
4. Your post appears instantly

### Creating an Article
1. Switch to `/ARTICLES` tab
2. Click "+ CREATE_FILE"
3. Enter title and content
4. Click "SAVE_TO_DISK"
5. Article is saved and appears in the directory

### Reading Articles
1. In `/ARTICLES` tab, click any article
2. Navigate with "< BACK_TO_ROOT" button

## 🤝 Contributing

Built by **mohan** as a retro-styled blogging platform.

## 📄 License

ISC

---

**Made with ❤️ and nostalgia for the terminal era**
