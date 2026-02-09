# DoneVia-todo-taskmanager
Angular+Spring Boot Task Management Application

## Project Description
The Task Management Application is a full-stack web application designed to help users manage daily tasks efficiently.  
Users can create, update, delete, and track tasks based on their completion status.  
The frontend is built using Angular, while the backend is implemented using Spring Boot with REST APIs and MySQL for persistent storage.

---

## Key Objectives
- Improve task organization and productivity
- Provide clear visibility of pending and completed tasks
- Enable task tracking using due dates
- Persist user and task data using a relational database

---

## Core Functionalities
- User login functionality
- Create new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed or pending
- Filter tasks by status (All / Pending / Completed)
- View overdue, today, and upcoming tasks
- REST API-based frontend and backend integration

---

## Technology Stack

### Frontend
- Angular
- HTML, CSS, TypeScript

### Backend
- Spring Boot
- Spring Data JPA
- RESTful Web Services

### Database
- MySQL

### DevOps & Cloud
- Docker
- Azure Container Instances

---

## Application Architecture
- Angular frontend communicates with Spring Boot backend via REST APIs
- Backend handles authentication, business logic, and database operations
- Spring Data JPA manages MySQL persistence
- Application properties store database configuration securely
- Docker is used to containerize the backend
- Azure is used for cloud deployment

---

## Database Configuration
- Database: MySQL
- Configuration is defined in application.properties
- Tables are auto-created using JPA entity mappings

---

## REST API Endpoints (Sample)

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/auth/login | User authentication |
| GET | /api/tasks/user/{userId} | Fetch tasks for user |
| POST | /api/tasks/user/{userId} | Create new task |
| PUT | /api/tasks/{taskId} | Update task |
| DELETE | /api/tasks/{taskId} | Delete task |

---

## How to Run the Application (Local Setup)

### Backend
1. Configure MySQL database and credentials in application.properties
2. Run the Spring Boot application
3. Backend runs on:
4. http://localhost:8082

5. ### Frontend
6. Navigate to angular project directory
7. Run: ng serve
8. open browser
9. http://localhost:4200

### Docker & Deployment
1.Dockerfile is created to containerize the Spring Boot backend
2.Docker image is built locally
3.Docker container runs the backend application
4.The container is deployed to Azure Container Instances

### Future Enhancements
1.JWT-based authentication
2.Role-based authorization
3.CI/CD pipeline using Jenkins
