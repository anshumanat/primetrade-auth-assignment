# 🔐 Primetrade Backend Assignment  
Scalable REST API with Authentication & Role-Based Access

---

## 📌 Overview

This project implements a secure and scalable REST API using **FastAPI** and **PostgreSQL**.

It includes:

- User Registration & Login
- JWT Authentication
- Role-Based Access Control (User vs Admin)
- CRUD APIs for Tasks (secondary entity)
- Ownership enforcement
- Structured error handling
- Logging
- Versioned API (`/api/v1`)

The architecture is modular and designed for scalability and future extension.

---

## 🏗 Tech Stack

- **FastAPI**
- **PostgreSQL**
- **SQLAlchemy ORM**
- **JWT (python-jose)**
- **Passlib (bcrypt)**
- **Pydantic**
- **Uvicorn**

---

## 📂 Project Structure

app/
│
├── api/v1/endpoints/ # Route definitions
├── core/ # Config, security, dependencies
├── db/ # Database session & models
├── schemas/ # Pydantic schemas
└── main.py # Application entry point


---

## 🔐 Authentication Flow

### 1️⃣ Register
`POST /api/v1/auth/register`

- Validates email
- Hashes password using bcrypt
- Stores user in database

### 2️⃣ Login
`POST /api/v1/auth/login`

- Verifies credentials
- Generates JWT access token
- Embeds:
  - user id (`sub`)
  - email
  - role

### 3️⃣ Protected Routes

All task endpoints require:

Authorization: Bearer <token>


JWT is validated and user is fetched from database.

---

## 🛡 Role-Based Access Control

Two roles:

- `user`
- `admin`

Rules:

- Users can CRUD only their own tasks.
- Admins can access all tasks.
- Unauthorized access returns proper HTTP status codes (403 / 404).

---

## 📦 Task CRUD Endpoints

| Method | Endpoint | Description |
|--------|----------|------------|
| POST   | `/api/v1/tasks/` | Create task |
| GET    | `/api/v1/tasks/` | Get all tasks (role-aware) |
| GET    | `/api/v1/tasks/{id}` | Get single task |
| PUT    | `/api/v1/tasks/{id}` | Update task |
| DELETE | `/api/v1/tasks/{id}` | Delete task |

Ownership is strictly enforced.

# Project Documentation

---

## ⚠️ Error Handling
Global exception handlers provide consistent structured responses:

{
  "success": false,
  "error": "Task not found"
}

Validation errors include detailed feedback.

---

## 📊 Logging
The system logs:
- Application startup  
- User registration  
- Successful login  
- Failed login attempts  

This improves observability and debugging.

---

## 🧱 Database Schema


Users Table
- UUID (Primary Key)
- email (unique)
- username
- hashed_password
- role
- is_active
- created_at

Tasks Table
- UUID (Primary Key)
- title
- description
- owner_id (Foreign Key → users.id)
- created_at
- updated_at

---

## 🚀 Running the Project
1️⃣ Clone repository
git clone <your-repo-url>
cd backend

2️⃣ Create virtual environment
python -m venv venv
venv\Scripts\activate

3️⃣ Install dependencies
pip install -r requirements.txt

4️⃣ Configure environment variables
Create .env file:
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/primetrade_db
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

5️⃣ Run server
uvicorn app.main:app --reload

Swagger documentation available at: http://127.0.0.1:8000/docs

---

## 📈 Scalability Considerations
This project is structured to scale:
- Modular architecture supports additional entities easily.
- API versioning allows backward-compatible upgrades.
- JWT-based stateless authentication supports horizontal scaling.
- PostgreSQL allows indexing and optimization.
- Can be containerized using Docker.
- Redis can be added for caching frequently accessed queries.
- Can be extended into microservices (Auth Service, Task Service).

---

## 🧠 Future Improvements
- Refresh token mechanism
- Rate limiting
- Redis caching
- Docker & Docker Compose setup
- CI/CD pipeline
- Unit & integration tests

---

## ✅ Assignment Requirements Covered
✔ User registration & login with password hashing
✔ JWT authentication
✔ Role-based access control
✔ CRUD APIs for secondary entity (Tasks)
✔ API versioning
✔ Database schema design
✔ Error handling & validation
✔ Logging
✔ Swagger documentation