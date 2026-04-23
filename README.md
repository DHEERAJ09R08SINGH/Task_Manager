
# 📌 Task Management System (Django REST + React)

A full-stack **Task Management System** built using **Django REST Framework (JWT Authentication + Role-Based Access Control)** and **React.js frontend**.

---

# 🚀 Live Features

## 🔐 Authentication System

* User Registration
* Login with JWT (Access + Refresh tokens)
* Secure password hashing

## 👥 Role-Based Access Control

* Admin & User roles
* Admin dashboard access
* Protected routes based on roles

## 📝 Task Management (CRUD)

* Create tasks
* View user-specific tasks
* Update tasks
* Delete tasks (admin/user rules applied)

## 🎨 Frontend (React)

* Login / Register pages
* Protected Dashboard
* Task CRUD UI
* Role-based UI rendering
* Logout functionality

## 🔒 Security Features

* JWT authentication
* Protected APIs
* User-specific data isolation
* Input validation via serializers

## 📚 API Documentation

* Swagger UI available:

```
http://127.0.0.1:8000/swagger/
```

---

# 🛠 Tech Stack

### Backend:

* Django
* Django REST Framework
* SimpleJWT
* drf-yasg (Swagger)

### Frontend:

* React.js
* Axios
* React Router DOM

### Database:

* SQLite (Development)
* PostgreSQL (Production ready)

---

# 📂 Project Structure

## Backend

```
TaskMan/
│── TaskMan/
│   ├── settings.py
│   ├── urls.py
│
│── TaskManApp/
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   ├── permissions.py
│   ├── urls.py
│
│── manage.py
│── requirements.txt
```

---

## Frontend

```
src/
│── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Tasks.jsx
│
│── components/
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│
│── api/
│   ├── axios.js
│
│── App.js
```

---

# ⚙️ Setup Instructions

## 🔧 Backend Setup

```bash
git clone https://github.com/your-username/task-manager.git

cd backend

python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate

python manage.py runserver
```

---

## 🌐 Frontend Setup

```bash
cd frontend

npm install

npm start
```

---

# 🔑 API Endpoints

## Authentication

```
POST /api/v1/register/
POST /api/v1/login/
```

## Tasks CRUD

```
GET    /api/v1/tasks/
POST   /api/v1/tasks/
GET    /api/v1/tasks/<id>/
PUT    /api/v1/tasks/<id>/
PATCH  /api/v1/tasks/<id>/
DELETE /api/v1/tasks/<id>/
```

## Admin

```
GET /api/v1/admin-dashboard/
```

---

# 🔐 Authentication Flow

1. User registers
2. User logs in
3. JWT token generated
4. Token stored in localStorage
5. Token used in API requests
6. Backend validates token

---

# 👑 Role-Based Access

| Role  | Access                         |
| ----- | ------------------------------ |
| User  | Create, View, Update own tasks |
| Admin | Full access + admin dashboard  |

---

# 📊 API Documentation (Swagger)

```
http://127.0.0.1:8000/swagger/
```

✔ Test APIs directly in browser
✔ View request/response structure

---

# 🚀 Scalability Highlights

* Stateless JWT authentication
* Modular Django app structure
* Easily extendable to microservices
* PostgreSQL-ready schema
* Redis caching support (future upgrade)
* Frontend-backend decoupled architecture

---

# 🧠 Key Learnings

* REST API design
* JWT authentication flow
* Role-based authorization
* Full-stack integration (React + Django)
* Secure backend development

---

# 👨‍💻 Author

**Dheeraj R. Singh**
Full Stack Developer (Python + React)

---

# 🏁 Project Status

✔ Authentication Complete
✔ Role-Based Access Complete
✔ CRUD APIs Working
✔ Frontend Connected
✔ Swagger Docs Ready
✔ Production-Ready Structure

---




