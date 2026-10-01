# EventHorizon API

EventHorizon is a RESTful API built with **Node.js and Express.js**. It provides user authentication, email verification, JWT-based authorization, and user profile functionality.

## Packages Needed

* **Express.js**
* **MongoDB** 
* **Mongoose** 
* **Joi** 
* **bcryptjs** 
* **JSON Web Token (JWT)** 
* **Nodemailer** 

---

## Features

* User registration
* Password hashing
* Email verification
* User login
* JWT authentication
* Protected user profile endpoint
* MongoDB database integration
* Request validation
* Environment variable configuration
* Health-check endpoint

---



# Getting Started

## Deplyed render link: https://eventhorizon-api-qv9y.onrender.com
## 1. Prerequisites

Before running the project, make sure you have installed:

* Node.js
* npm
* MongoDB
* Git

You can check whether Node.js and npm are installed by running:

```bash
node -v
npm -v
```

---



## 2. Install Dependencies


---

# Environment Variables

The project uses environment variables to store configuration and sensitive information.

Create a file named:

```text
.env
```

in the root directory of the project.

Your `.env` file should contain:

```env
PORT=6000

MONGO_URI=mongodb://localhost:27017/EventHorizon

JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d

VERIFICATION_TOKEN_EXPIRES_IN_MINUTES=30

BACKEND_URL=http://localhost:6000

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password
EMAIL_FROM=your_email@gmail.com
```

## Environment Variable Explanation

| Variable                                | Purpose                                            |
| --------------------------------------- | -------------------------------------------------- |
| `PORT`                                  | Port on which the Express server runs              |
| `MONGO_URI`                             | MongoDB connection string                          |
| `JWT_SECRET`                            | Secret key used to sign JWT authentication tokens  |
| `JWT_EXPIRES_IN`                        | How long an authentication token remains valid     |
| `VERIFICATION_TOKEN_EXPIRES_IN_MINUTES` | How long an email verification token remains valid |
| `SMTP_HOST`                             | SMTP server used to send emails                    |
| `SMTP_PORT`                             | SMTP port                                          |
| `SMTP_USER`                             | Email account used to send emails                  |
| `SMTP_PASS`                             | Email account password/app password                |
| `EMAIL_FROM`                            | Email address displayed as the sender              |

### Important



---

# MongoDB Setup

The application uses MongoDB.

The local database connection is:

```text
mongodb://localhost:27017/EventHorizon
```

The database name is:

```text
EventHorizon
```

Make sure MongoDB is running before starting the application.

If MongoDB is running locally, the application should be able to connect using the `MONGO_URI` value in `.env`.

---

# Email Configuration

EventHorizon uses **Nodemailer** to send emails, including email verification messages.

The current configuration uses Gmail's SMTP server:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
```

The email account is configured using:

```env
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password
EMAIL_FROM=your_email@gmail.com
```

For Gmail, use an **App Password** where required rather than putting your normal Gmail password in the project.

---

# Running the Application

After installing dependencies and configuring `.env`, start the application.

For development:

```bash
npm run dev
```


The API will normally be available at:

```text
http://localhost:6000
```

---

# API Endpoints

## Health Check

### `GET /health`

Checks whether the API is running.



# Authentication

## Register User

### `POST /api/auth/register`

Creates a new user account.

```

The request body should contain the registration information required by the API.

After registration, the user receives an email containing a verification link.

---

## Verify Email

### `GET /api/auth/verify-email`

Verifies a user's email address using the verification token.


The token is supplied as a query parameter.

---

## Login

### `POST /api/auth/login`

Authenticates a registered user.

```

A successful login returns an authentication token.

The token can then be used to access protected endpoints.

---

# User Profile

## Get User Profile

### `GET /api/user/profile`

Returns information for the authenticated user.

This is a protected route and requires a valid JWT.

Include the token in the request header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

The format must be exactly:

```text
Bearer <token>
```

For example:

```text
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

There should be **one space** between `Bearer` and the token.

---


---

# Testing With Postman

The API can be tested using Postman.

### 1. Start the server

```bash
npm run dev
```

### 2. Test the health endpoint

Send:

```text
GET http://localhost:6000/health
```

### 3. Register a user

Send a `POST` request to:

```text
http://localhost:6000/api/auth/register
```

Set the request body to JSON and provide the required registration fields.

### 4. Verify the email

Use the verification link/token received through email.

### 5. Login

Send a `POST` request to:

```text
http://localhost:6000/api/auth/login
```

Save the JWT returned by the login request.

### 6. Access the profile

Send:

```text
GET http://localhost:6000/api/user/profile
```

Under the Authorization settings, use:

```text
Bearer Token
```

and paste the JWT token.

Alternatively, manually set:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# Common Issues

## `Authorization format must be Bearer <token>`

Make sure the header follows this exact format:

```text
Authorization: Bearer <token>
```

Do not include quotation marks around the token.



---

## MongoDB Connection Error

If the application cannot connect to MongoDB:

1. Make sure MongoDB is running.
2. Check the `MONGO_URI` in `.env`.
3. Make sure the database name is correct.



---

## Email Not Sending

Check the following variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password
EMAIL_FROM=your_email@gmail.com
```

Make sure the email credentials are correct and that the SMTP account allows the application to send email.

---

Since there is no frontend yet, i used BACKEND_URL with localhost:6000 as link being sent as email with the verification token.
