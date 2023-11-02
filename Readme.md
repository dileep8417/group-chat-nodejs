# Group Chat Application Documentation

## Overview

This repository contains the source code for a simple Group Chat Application built using Node.js. The application provides web services for group chat management, user authentication, and message handling.

## Project Structure

The project follows a modular structure, separating concerns into routes and controllers. Here's an overview:

- **config.js**: To configure database, admin and test user credentials.
- **routes**: Contains route definitions for different functionalities.
- **controllers**: Implements the business logic for each functionality.
- **services**: Handles data-related operations.
- **middlewares**: Contains middleware functions for authentication and authorization.
- **helpers**: Includes utility functions for validation, JWT creation, etc.
- **constants**: Defines status codes used throughout the application.
- **db**: Contains DB connection and SQL file.

## Roles

1. **Admin**
   - Predefined user who has elevated privileges.
   - Admin has the capability to add and edit users within the application.
2. **Normal User**
   - Normal Users are regular users added by Admin.
   - These users have the ability to create, manage groups, and send messages within those groups.

## Setup

To run the application locally, follow these steps:

1. Clone the repository

2. Install dependencies:
    ```bash
    npm install
    ```
3. Create the database and necessary tables using .sql file from **db/**.
   
4. In **config.js** configure your database credentials.

## Testing

The application includes end-to-end functional tests written in Node.js to ensure the APIs are working as expected. To run the tests:

```bash
npm run test
```

## Usage

### Authentication

- **Login User**
    ```bash
    POST /auth/login
    ```

- **Logout User**
    ```bash
    POST /auth/logout
    ```

### Admin Operations

- **Add User (Admin Only)**
    ```bash
    POST /admin/addUser
    ```

- **Edit User Details (Admin Only)**
    ```bash
    PUT /admin/editUser/:userId
    ```

### Group Operations

- **Create Chat Group**
    ```bash
    POST /group/new
    ```

- **Delete Chat Group**
    ```bash
    DELETE /group/remove/:groupId
    ```

- **Add User to Chat Group**
    ```bash
    POST /group/addUser/:groupId/:userId
    ```

- **Remove User from Chat Group**
    ```bash
    DELETE /group/removeUser/:groupId/:userId
    ```

- **Search Users by Name**
    ```bash
    GET /group/search/:searchName
    ```

### Message Operations

- **Send Message in Group**
    ```bash
    POST /message/send
    ```

- **Like Message**
    ```bash
    PATCH /message/like/:messageId
    ```
---
