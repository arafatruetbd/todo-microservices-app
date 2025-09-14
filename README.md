# 🛠️ Full-Stack Todo App with Authentication & Docker

This repository contains a full-stack application built to demonstrate skills in backend development, authentication, containerization, testing, and inter-service communication using Docker.

---

## 📌 Objective

The goal is to develop a simple system composed of:

- Two backend services with PostgreSQL databases
- One minimal frontend
- End-to-end (E2E) tests for flows across services
- All components containerized with Docker and orchestrated using Docker Compose

---

## 🔧 Tech Stack

### Backend
- Node.js + TypeScript
- Express.js
- PostgreSQL (`pg` + TypeORM)
- JWT authentication
- CORS
- Jest + Supertest (unit & integration testing)

### Frontend
- Vite + React 19 + TypeScript
- Tailwind CSS
- Redux Toolkit
- React Router v7
- React Hook Form
- React Hot Toast
- ESLint

### DevOps
- Docker
- Docker Compose
- GitHub Actions (CI for unit + E2E tests)
- Playwright (E2E testing)

---

## 📁 Project Structure


root/
├── user-service/          # Auth service (register/login)
├── todo-service/          # Todo CRUD service
├── client/                # Minimal frontend
├── e2e/                   # End-to-end Playwright tests
│   ├── tests/             # Test specs
│   │   ├── backend-flows.spec.ts   # Auth + Todo API flows
│   │   └── client-flow\.spec.ts     # Frontend user flows
│   ├── playwright.config.ts
│   ├── package.json
│   └── yarn.lock
├── docker-compose.yml
├── .env.example
└── README.md

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/arafatruetbd/todo-microservices-app.git
cd todo-microservices-app
````

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# =========================
# Database Configuration
# =========================
DB_USER=postgres
DB_PASS=password

# Database Names
USER_DB_NAME=user_db
TODO_DB_NAME=todo_db

# Host Ports
USER_DB_PORT=5440
TODO_DB_PORT=5441

# =========================
# JWT Authentication
# =========================
JWT_SECRET=your_jwt_secret_here
```

### 3. Build and Run with Docker Compose

```bash
docker compose up --build
```

### 4. Access the Services

* **Frontend**: [http://localhost:3000](http://localhost:3000)
* **User API**: [http://localhost:5000](http://localhost:5000)
* **Todo API**: [http://localhost:5001](http://localhost:5001)

---

## 🔐 Authentication Flow

1. Users register and login via User Service
2. JWT returned on login
3. Todo Service validates JWT on all requests

---

## 🧪 Testing

### 🔹 Unit & Integration Tests

Run per service:

```bash
# Inside user-service/
yarn install
yarn test

# Inside todo-service/
yarn install
yarn test
```

### 🔹 End-to-End Tests (E2E)

These tests spin up the full stack (frontend + backend + databases) and validate real flows.

```bash
# Inside e2e/
yarn install
npx playwright install --with-deps
yarn test
```

👉 Reports are saved in `e2e/test-results/` (HTML report viewable with `npx playwright show-report`).

---

## 🧾 API Documentation

* Postman Collection: `/docs/postman_collection.json`

---

## ✅ User Stories

### User Service

1. Register with email + password
2. Login and receive JWT

### Todo Service

1. Create todo (JWT required)
2. Read all todos for authenticated user
3. Update existing todo (only owner)
4. Delete todo (only owner)

---

## 🧼 Best Practices

* Password hashing with bcrypt
* JWT includes user UUID + expiry
* Secure REST APIs with CORS
* Clean `.env` config management
* Fully containerized microservices

---

## 📬 Contact

For questions/issues, open an issue or reach out to me.
