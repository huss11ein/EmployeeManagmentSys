# Vue .NET Project

This project is a Vue frontend integrated with a .NET backend. The backend is designed to run on Docker (preferably with `docker-compose`) through Visual Studio due to its seamless integration.

## Features

### Backend (APIs):
1. **Authentication (JWT)**:
   - User registration and login functionality using JWT authentication.

2. **CRUD System for Employees**:
   - Manage employee records with the following properties:
     - **Name**
     - **Email**
     - **Phone Number**
     - **Grad/Undergrad** (dropdown selection)
     - **Upload Image**

3. **User Privileges**:
   - **Admin Users**:
     - Can edit and delete any employee data listed in the table.
   - **Normal Users**:
     - Can create new employees.
     - Can only list employees they have created.

## Setup Instructions

### Prerequisites
- Docker
- Docker Compose
- Visual Studio (for Docker integration)
- Node.js (for Vue.js)

### Running the Project

#### **Using Docker (Preferred)**
1. Open the project in Visual Studio.
2. Ensure Docker Desktop is running.
3. Select the `docker-compose` project in the Visual Studio solution explorer.
4. Run the project.
   - Visual Studio will handle port setup and environment configuration.

#### **Without Docker**
1. Open the backend project in Visual Studio.
2. Update the `appsettings.json` file to configure the:
   - **Port**
   - **Connection Strings**
3. Run the backend project.

### Running the Front End Project

1. Navigate to the frontend folder in your terminal and install dependencies:
   ```bash
   npm install  npm run serve
    
