# Planning Poker

## Introduction
Planning Poker is a web application designed to facilitate voting among Scrum team members during Agile estimation sessions. The application allows a **Scrum Master** to initiate a session, and team members can join to participate in the voting process for various user stories.

## Features
- **Scrum Master Role**: Only one person can act as the Scrum Master who starts the session.
- **Team Participation**: Team members can enter the session and cast their votes.
- **Multiple Voting Systems**: Supports different voting methodologies for story estimation.
- **Multiple Stories**: Team members can vote on different user stories.
- **Real-Time Communication**: Uses WebSockets for instant updates.
- **Fast Compilation**: Utilizes Vite for quick frontend builds.

## Technologies Used
- **Frontend**: React.js (with Vite for faster compilation and development)
- **Backend**: Java (Spring Boot)
- **Database**: PostgreSQL (deployed using Docker/Podman)
- **RESTful APIs**: Facilitates communication between the frontend and backend.
- **WebSockets**: Ensures real-time synchronization between users.

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Docker or Podman** (for containerized database management)
- **Node.js & npm** (for React frontend)
- **Java (JDK 17 or later)** (for Spring Boot backend)
- **Maven** (for backend dependency management)

### Steps to Run the Application

#### 1. Clone the Repository
```sh
 git clone https://github.com/EslamMetawie20/Planning_Pocker.git
 cd planning-poker
```

#### 2. Set Up the Database
Using Docker:
```sh
docker-compose up -d
```
Using Podman:
```sh
podman-compose up -d
```

#### 3. Run the Backend
```sh
cd backend
mvn spring-boot:run
```

#### 4. Run the Frontend
```sh
cd frontend
npm install
npm run dev
```
(Note: Vite is used for fast compilation and hot module replacement.)

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/auth/login` | User login |
| POST   | `/api/auth/register` | User registration |

### Session Management
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/session/start` | Start a new session (Scrum Master only) |
| GET    | `/api/session/join/{sessionId}` | Join an existing session |
| POST   | `/api/session/vote` | Submit a vote |
| GET    | `/api/session/results/{sessionId}` | Get voting results |

## WebSocket Communication
- **`/ws/session/{sessionId}`**: Handles real-time updates of voting results.



