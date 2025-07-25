# 🧾 Asset Management System

A full-stack web application to streamline and digitize the management of organizational assets ranging from IT hardware and software to general inventory. The system provides tools for tracking asset lifecycles, managing vendor and branch data, processing Goods Receipt Notes, and generating detailed reports.

---

## 📘 Project Summary

This system is designed to help organizations efficiently track their assets from acquisition to retirement. It includes features for:

- Adding and managing assets
- Vendor and branch management
- GRN (Goods Receipt Note) creation and processing
- Generating Excel reports with filter options (date, vendor, branch)

---

## 🏗️ Application Architecture

The project is structured using a modular architecture with a focus on maintainability and scalability.

- **Frontend:** React with TypeScript
- **Backend:** Node.js (TypeScript) with Express.js
- **Database:** MySQL
- **Architecture Pattern:** MVC combined with Repository pattern

---

## 🔧 Technology Stack

### Frontend
- React.js + TypeScript
- Tailwind CSS
- Axios
- React Hook Form + Yup
- MUI (for UI components)

### Backend
- Node.js + Express.js (TypeScript)
- MySQL + Sequelize ORM
- JWT-based authentication (if applicable)
- ExcelJS (for Excel report exports)

---


## ⚙️ Backend Setup (Docker)

> The backend is fully containerized for easy setup and testing.

### Steps:

```bash
# Clone the repo
git clone https://github.com/muhammed-mashood-alungal/Hopchat.git
cd Hopchat
cd backend

# Start backend and MySQL via Docker
docker-compose up --build
```
## 💻 Frontend Setup
React app runs separately using Vite

```bash
# Clone the repo
cd frontend
npm install
npm run dev
```
