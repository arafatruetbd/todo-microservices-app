# 🛠️ Full-Stack Todo App with Authentication & Docker

This repository contains a full-stack application built to demonstrate skills in backend development, authentication, containerization, and inter-service communication using Docker.

## 📌 Objective

The goal is to develop a simple system composed of:

* Two backend services with databases
* One minimal frontend
* All components containerized with Docker and orchestrated using Docker Compose

---

## 🔧 Tech Stack

### Backend

* Node.js  
* TypeScript  
* Express.js  
* PostgreSQL (via `pg` library)  
* TypeORM (Object–Relational Mapping)  
* JWT (JSON Web Token) authentication  
* CORS support  
* Jest + Supertest (unit & integration testing)  

### Frontend (Optional):

 * Vite – Lightning-fast development server and build tool
 * React 19 – Component-based UI framework
 * TypeScript – Static typing for JavaScript
 * Tailwind CSS – Utility-first CSS framework
 * Redux Toolkit – Simplified global state management 
 * React Hook Form – Forms with built-in validation and performance
 * React Router v7 – Declarative routing for React apps
 * React Hot Toast – Beautiful, customizable toast notifications
 * ESLint – Code quality and linting
 * Vite Plugin React – Fast refresh and React-specific optimizations

### DevOps:

* Docker
* Docker Compose

---

## 📁 Project Structure

```
root/
├── user-service/          # Auth service (register/login)
│   ├── src/
│   └── Dockerfile
│
├── todo-service/          # Todo CRUD service
│   ├── src/
│   └── Dockerfile
│
├── client/                # Minimal frontend
│   ├── src/
│   └── Dockerfile
│
├── docker-compose.yml
├── README.md
└── ...
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repo-url>
cd <repo-name>
```

### 2. Build and Run with Docker Compose

```bash
docker-compose up --build
```

### 3. Access the Services

* **Frontend**: [http://localhost:3000](http://localhost:3000)
* **User API**: [http://localhost:5000](http://localhost:5000)
* **Todo API**: [http://localhost:5001](http://localhost:5001)

---

## 🔐 Authentication Flow

* Users can register and login via the User Service
* On successful login, a JWT is returned
* Todo Service validates JWT for all requests

---

## 🧪 Test Instructions

Each service has unit tests for its core functionalities.

### Run Tests:

```bash
# Inside user-service/
yarn test

# Inside todo-service/
yarn test
```

---

## 🧾 API Documentation

Available via:

* Postman Collection (in `/docs/postman_collection.json`)

---


## ✅ User Stories Covered

### User Service

1. **Register** with email + password
2. **Login** and receive JWT

### Todo Service

1. **Create** todo (JWT required)
2. **Read** all todos for authenticated user
3. **Update** existing todo (only owner)
4. **Delete** todo (only owner)

---

## 🧼 Best Practices

* Passwords are hashed using bcrypt
* JWT includes user UUID and expires appropriately
* All APIs are RESTful and secure
* CORS and environment configs are managed cleanly
* Fully containerized microservices with isolated responsibilities

---

## 📦 Environment Variables

Create a .env file in the root directory of this project. This file stores sensitive configuration values for your databases and JWT authentication.

```env
# =========================
# Database Configuration
# =========================
DB_USER=postgres
DB_PASS=password

# Database Names
USER_DB_NAME=user_db
TODO_DB_NAME=todo_db

# Host Ports (host:container mapping)
USER_DB_PORT=5440   # Host port for User DB (maps to container 5432)
TODO_DB_PORT=5441   # Host port for Todo DB (maps to container 5432)

# =========================
# JWT Authentication
# =========================
JWT_SECRET=your_jwt_secret_here

```

---

## 📬 Contact

For any questions or issues, feel free to open an issue or contact the me.
