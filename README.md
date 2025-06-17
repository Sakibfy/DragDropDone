# 📦 DragDropDone – Smart Kanban Board

## 🚀 Project Overview
**TaskFlow** is a MERN‑stack Kanban board app designed for task management with smooth drag‑and‑drop interfaces. Users can register, log in, and organize tasks across **To Do**, **In Progress**, and **Completed** columns.

---

## ⚙️ Tech Stack
- **Frontend**: React, Tailwind CSS, React Router, Framer Motion  
- **Backend**:  Express.js  
- **Database**: MongoDB 
- **Authentication**: Firebase Auth (email/password )  
- **HTTP Client**: Axios (with Axios hook)  
- **Deployment**: Frontend on Vercel, Backend on Render/Heroku  
- **Notifications**: react-toastify, SweetAlert2

---

## 🛠️ Setup Instructions

### 1. Clone & Prepare
```bash
git clone Saver side: https://github.com/Sakibfy/DragDropDone-server.git
git clone Clint side: https://github.com/Sakibfy/DragDropDone.git


Frontend Setup

cd ../client
npm install
cp .env.example .env
# Set:
# VITE_API_URL=http://localhost:5000
npm run dev

 Backend Setup

cd server
npm install
cp .env.example .env
# Set environment variables:
# MONGO_URI=your-mongodb-uri
# PORT=3000
npm run dev



Live Link : https://task-haven-6fa59.web.app