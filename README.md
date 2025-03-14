# Automate Email Application

This project is a full-stack web application that allows users to automate email sending. It utilizes React for the frontend, Node.js with Express for the backend, MongoDB for data storage, and integrates NodeMailer and node-schedule for email automation.

## Features

* **User Authentication:** Secure signup and signin functionality.
* **Email Automation:**
    * Send emails immediately.
    * Schedule emails for future delivery.
* **MongoDB Integration:** Stores user data and scheduled email information.
* **NodeMailer:** Handles email sending.
* **Node-Schedule:** Manages scheduled email delivery.
* **Responsive Design:** User interface optimized for various screen sizes.

## Technologies Used

* **Frontend:**
    * React
    * Tailwind CSS
    * React Router DOM
* **Backend:**
    * Node.js
    * Express.js
    * MongoDB
    * Mongoose
    * NodeMailer
    * node-schedule
    * cors
    * dotenv
* **Deployment:**
    * Render.com

## Setup Instructions

1.  **Clone the Repository:**

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Backend Setup:**

    * Navigate to the `backend` directory:

        ```bash
        cd backend
        ```

    * Install dependencies:

        ```bash
        npm install
        ```

    * Create a `.env` file in the `backend` directory and add your environment variables:

        ```
        MONGO_URI=<your-mongodb-connection-string>
        FRONTEND_URL=<your-frontend-url>
        PORT=<port-number> #optional
        ```

    * Run the backend server:

        ```bash
        npm start
        ```

3.  **Frontend Setup:**

    * Navigate to the `frontend` directory:

        ```bash
        cd ../frontend
        ```

    * Install dependencies:

        ```bash
        npm install
        ```

    * Create a `.env.local` file in the `frontend` directory and add your environment variables:

        ```
        REACT_APP_BACKEND_URL=<your-backend-url> #if using create-react-app
        VITE_BACKEND_URL=<your-backend-url> #if using vite
        ```

    * Run the frontend application:

        ```bash
        npm start
        ```

4.  **MongoDB Setup:**

    * Create a MongoDB Atlas account and set up a cluster.
    * Obtain your MongoDB connection string.
    * Add the connection string to your backend's `.env` file.

5.  **NodeMailer Setup:**

    * To use Nodemailer with gmail, you will need to create an app password.
    * Go to your google account -> security -> app passwords.
    * Create a new app password.
    * Add the email address and app password to your backend's .env file.

6.  **Deployment (Render.com):**

    * Create a Render.com account.
    * Connect your GitHub repository to Render.
    * Set up two services: one for the backend and one for the frontend.
    * Configure environment variables in Render.
    * Deploy your application.
    * Make sure that the backend cors origin is set to the frontends url.

## Project Structure
AutomateEmail/
├── backend/
│   ├── config/
│   ├── controller/
│   ├── routes/
│   ├── models/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env.local
├── .gitignore
└── README.md
