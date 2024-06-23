# Chat Application

This is a real-time chat application built with React, Node.js, Express, MongoDB, and Socket.io. It supports user registration, login, and real-time messaging.

## Features

- User registration with password hashing
- User login with authentication
- Real-time messaging using Socket.io
- Messages are stored in MongoDB

## Project Structure

- **client**: Contains the React frontend code
- **server**: Contains the Node.js backend code
- **models**: Contains the Mongoose models for User and Chat

### :warning: Login Credentials to Mariadb: 
I am fully aware that there are login credentials in the project itself to a MariaDB instance , but , since it's based on the localhost network, there is no need to change it or take it out. This is also for the better and easier understanding and changing of the code in the project.
## Prerequisites

- Node.js (v18 or later)
- MongoDB
- Docker (optional, for running the application in a containerized environment)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Laevate1n/chatting_app.git
cd chat-application
