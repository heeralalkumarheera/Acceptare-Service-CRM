# 🚀 ACCEPTARE CRM - COMPLETE API TESTING GUIDE
**Version:** 2.0 | **Updated:** January 15, 2026

---

## 📖 TABLE OF CONTENTS
1. [Getting Started](#getting-started)
2. [Environment Setup](#environment-setup)
3. [Authentication Flow](#authentication-flow)
4. [Testing Tools & Setup](#testing-tools--setup)
5. [API Endpoints Reference](#api-endpoints-reference)
6. [Step-by-Step Testing Workflow](#step-by-step-testing-workflow)
7. [Postman Collection](#postman-collection)
8. [Swagger/OpenAPI Documentation](#swaggeropenapi-documentation)
9. [Common Errors & Solutions](#common-errors--solutions)
10. [Performance Testing](#performance-testing)

---

## 🎯 GETTING STARTED

### Backend Server Status
```
Server: Express.js
Port: 5000
Environment: Development/Production
Base URL: http://localhost:5000/api
```

### Quick Start
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env and update values
cp .env.example .env

# Start development server
npm start

# Expected output:
# 🔥 Server is running on port 5000
# 📦 MongoDB connected successfully
```

---

## 🔧 ENVIRONMENT SETUP

### Required Environment Variables
Create a `.env` file in the backend folder:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/acceptare-crm
MONGO_DB_NAME=acceptare-crm

# JWT
JWT_SECRET=your_jwt_secret_key_here_min_32_chars
JWT_EXPIRE=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# WhatsApp Integration
WHATSAPP_API_KEY=your_whatsapp_api_key
WHATSAPP_PHONE_ID=your_phone_id

# Razorpay Integration
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# Rate Limiting
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Verify MongoDB Connection
```bash
# Test MongoDB connection
npm test

# Expected output:
# PASS  __tests__/health.test.js
# Test Suites: 2 passed, 2 total
# Tests: 4 passed, 4 total
```

---

## 🔐 AUTHENTICATION FLOW

### Authentication Architecture
```
Request → Validation Middleware → Auth Middleware → JWT Verification → Role Check → Controller
   ↓         (Joi Validation)      (Login Check)      (Token Valid)    (Permission)     ↓
                                                                                      Response
```

### Token-Based Authentication
All protected endpoints require a valid JWT token:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Role-Based Access Control (RBAC)
Three roles available:
- **admin** - Full access to all endpoints
- **sales** - Access to client, lead, quotation, invoice modules
- **support** - Access to follow-up, support, and client communication modules

---

## 🛠️ TESTING TOOLS & SETUP

### Option 1: Using Postman (Recommended)
#### Installation
1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new workspace: `Acceptare CRM`
3. Create a new collection: `Acceptare API Tests`

#### Environment Configuration in Postman
1. Click **Settings** → **Environments** → **Create**
2. Name: `Acceptare CRM - Local`
3. Add variables:

| Variable | Initial Value | Current Value |
|----------|---------------|---------------|
| `baseUrl` | http://localhost:5000/api | http://localhost:5000/api |
| `adminToken` | (empty) | (will be filled after login) |
| `salesToken` | (empty) | (will be filled after login) |
| `clientToken` | (empty) | (will be filled after login) |
| `clientId` | (empty) | (will be filled after creation) |
| `leadId` | (empty) | (will be filled after creation) |
| `invoiceId` | (empty) | (will be filled after creation) |

### Option 2: Using cURL (Command Line)
```bash
# Test API with cURL
curl -X GET http://localhost:5000/api/auth/health \
  -H "Content-Type: application/json"
```

### Option 3: Using Thunder Client (VS Code Extension)
1. Install Thunder Client extension in VS Code
2. Create a new collection
3. Add requests and test endpoints

---

## 📚 API ENDPOINTS REFERENCE

### Quick Reference Table

| Module | Endpoint | Method | Auth Required | Description |
|--------|----------|--------|---------------|-------------|
| **Auth** | `/auth/register` | POST | ❌ | Register new user |
| | `/auth/login` | POST | ❌ | User login |
| | `/auth/profile` | GET | ✅ | Get current user profile |
| **Client** | `/client` | GET | ✅ | List all clients |
| | `/client` | POST | ✅ | Create new client |
| | `/client/:id` | GET | ✅ | Get client details |
| | `/client/:id` | PUT | ✅ | Update client |
| | `/client/:id` | DELETE | ✅ | Delete client |
| **Lead** | `/lead` | GET | ✅ | List all leads |
| | `/lead` | POST | ✅ | Create new lead |
| | `/lead/pipeline` | GET | ✅ | Get lead pipeline |
| | `/lead/stage/:stage` | GET | ✅ | Get leads by stage |
| | `/lead/:id` | GET | ✅ | Get lead details |
| | `/lead/:id` | PUT | ✅ | Update lead |
| | `/lead/:id` | DELETE | ✅ | Delete lead |
| **Invoice** | `/invoice` | GET | ✅ | List all invoices |
| | `/invoice` | POST | ✅ | Create invoice |
| | `/invoice/:id` | GET | ✅ | Get invoice details |
| | `/invoice/:id/payment` | PUT | ✅ | Update payment status |
| **Quotation** | `/quotation` | GET | ✅ | List quotations |
| | `/quotation` | POST | ✅ | Create quotation |
| | `/quotation/:id` | GET | ✅ | Get quotation details |
| **Expense** | `/expense` | GET | ✅ | List expenses |
| | `/expense` | POST | ✅ | Create expense |
| | `/expense/analytics/monthly` | GET | ✅ | Monthly expense report |
| **Dashboard** | `/dashboard/summary` | GET | ✅ | Dashboard metrics |
| | `/dashboard/sales-trend` | GET | ✅ | Monthly sales trend |
| | `/dashboard/expense-trend` | GET | ✅ | Monthly expense trend |

---

## 🧪 STEP-BY-STEP TESTING WORKFLOW

### STEP 1: Server Health Check
Verify the backend is running before testing any endpoints.

**Request:**
```http
GET http://localhost:5000/api/auth/health
Content-Type: application/json
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

### STEP 2: USER REGISTRATION & LOGIN

#### 2.1 Register Admin User
**Request:**
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "Admin@123",
  "role": "admin"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "createdAt": "2026-01-15T10:30:00Z"
  }
}
```

#### 2.2 Login & Get Token
**Request:**
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTcwMjY0MDYwMH0.abcd1234..."
  }
}
```

**⚠️ Important:** Save this token for all subsequent requests.

---

### STEP 3: CLIENT MANAGEMENT

#### 3.1 Create New Client
**Request:**
```http
POST http://localhost:5000/api/client
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "companyName": "Tech Solutions Pvt Ltd",
  "contactPerson": "Rajesh Kumar",
  "email": "rajesh@techsolutions.com",
  "phone": "+91-9876543210",
  "address": "123 Business Park, Mumbai",
  "city": "Mumbai",
  "state": "Maharashtra",
  "zipCode": "400001",
  "gstNumber": "27AABCT1234H1Z0",
  "status": "active"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Client created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "companyName": "Tech Solutions Pvt Ltd",
    "contactPerson": "Rajesh Kumar",
    "email": "rajesh@techsolutions.com",
    "status": "active",
    "createdAt": "2026-01-15T10:35:00Z"
  }
}
```

#### 3.2 Get All Clients
**Request:**
```http
GET http://localhost:5000/api/client?page=1&limit=10
Content-Type: application/json
Authorization: Bearer <admin_token>
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "companyName": "Tech Solutions Pvt Ltd",
      "email": "rajesh@techsolutions.com",
      "status": "active"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

#### 3.3 Update Client
**Request:**
```http
PUT http://localhost:5000/api/client/507f1f77bcf86cd799439012
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "phone": "+91-9123456789",
  "status": "active"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Client updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "companyName": "Tech Solutions Pvt Ltd",
    "phone": "+91-9123456789"
  }
}
```

---

### STEP 4: LEAD MANAGEMENT

#### 4.1 Create New Lead
**Request:**
```http
POST http://localhost:5000/api/lead
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "clientId": "507f1f77bcf86cd799439012",
  "subject": "Web Development Project",
  "description": "Need a custom web application",
  "value": 50000,
  "stage": "qualification",
  "assignedTo": "507f1f77bcf86cd799439011"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "clientId": "507f1f77bcf86cd799439012",
    "subject": "Web Development Project",
    "value": 50000,
    "stage": "qualification",
    "createdAt": "2026-01-15T10:40:00Z"
  }
}
```

#### 4.2 Get Lead Pipeline
**Request:**
```http
GET http://localhost:5000/api/lead/pipeline
Content-Type: application/json
Authorization: Bearer <admin_token>
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "qualification": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "subject": "Web Development Project",
        "value": 50000
      }
    ],
    "proposal": [],
    "negotiation": [],
    "won": []
  }
}
```

#### 4.3 Update Lead Stage
**Request:**
```http
PUT http://localhost:5000/api/lead/507f1f77bcf86cd799439013/stage
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "stage": "proposal"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Lead stage updated to proposal",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "stage": "proposal"
  }
}
```

---

### STEP 5: QUOTATION MANAGEMENT

#### 5.1 Create Quotation
**Request:**
```http
POST http://localhost:5000/api/quotation
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "clientId": "507f1f77bcf86cd799439012",
  "leadId": "507f1f77bcf86cd799439013",
  "items": [
    {
      "description": "Web Development (100 hours)",
      "quantity": 100,
      "rate": 500
    },
    {
      "description": "Mobile App Development (50 hours)",
      "quantity": 50,
      "rate": 750
    }
  ],
  "gstRate": 18,
  "validityDays": 30,
  "notes": "Payment terms: 50% advance, 50% on delivery"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Quotation created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "quotationNumber": "QT/2026/001",
    "clientId": "507f1f77bcf86cd799439012",
    "items": [
      {
        "description": "Web Development (100 hours)",
        "quantity": 100,
        "rate": 500,
        "subtotal": 50000
      },
      {
        "description": "Mobile App Development (50 hours)",
        "quantity": 50,
        "rate": 750,
        "subtotal": 37500
      }
    ],
    "subtotal": 87500,
    "gstAmount": 15750,
    "totalAmount": 103250,
    "status": "draft",
    "createdAt": "2026-01-15T10:45:00Z"
  }
}
```

#### 5.2 Get Quotation Details
**Request:**
```http
GET http://localhost:5000/api/quotation/507f1f77bcf86cd799439014
Content-Type: application/json
Authorization: Bearer <admin_token>
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "quotationNumber": "QT/2026/001",
    "totalAmount": 103250,
    "status": "draft"
  }
}
```

---

### STEP 6: INVOICE MANAGEMENT

#### 6.1 Create Invoice from Quotation
**Request:**
```http
POST http://localhost:5000/api/invoice
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "quotationId": "507f1f77bcf86cd799439014",
  "clientId": "507f1f77bcf86cd799439012",
  "dueDate": "2026-02-15",
  "notes": "Payment Terms: 50% advance, 50% on delivery"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Invoice created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "invoiceNumber": "INV/2026/001",
    "clientId": "507f1f77bcf86cd799439012",
    "totalAmount": 103250,
    "paymentStatus": "unpaid",
    "dueDate": "2026-02-15",
    "createdAt": "2026-01-15T10:50:00Z"
  }
}
```

#### 6.2 Update Payment Status
**Request:**
```http
PUT http://localhost:5000/api/invoice/507f1f77bcf86cd799439015/payment
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "paymentStatus": "partial",
  "amountPaid": 51625,
  "paymentDate": "2026-01-15",
  "paymentMethod": "bank_transfer",
  "transactionId": "TXN/2026/001"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Payment status updated",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "paymentStatus": "partial",
    "amountPaid": 51625,
    "remainingAmount": 51625
  }
}
```

---

### STEP 7: EXPENSE TRACKING

#### 7.1 Create Expense
**Request:**
```http
POST http://localhost:5000/api/expense
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "category": "Travel",
  "description": "Client visit - Mumbai to Bangalore",
  "amount": 5000,
  "expenseDate": "2026-01-15",
  "paymentMethod": "credit_card",
  "receipt": "RCP/2026/001"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Expense created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439016",
    "category": "Travel",
    "amount": 5000,
    "expenseDate": "2026-01-15",
    "createdAt": "2026-01-15T10:55:00Z"
  }
}
```

#### 7.2 Get Monthly Expense Report
**Request:**
```http
GET http://localhost:5000/api/expense/analytics/monthly
Content-Type: application/json
Authorization: Bearer <admin_token>
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "month": "January 2026",
    "totalExpenses": 5000,
    "byCategory": {
      "Travel": 5000,
      "Office": 0,
      "Marketing": 0
    },
    "expenses": [
      {
        "_id": "507f1f77bcf86cd799439016",
        "category": "Travel",
        "amount": 5000
      }
    ]
  }
}
```

---

### STEP 8: FOLLOW-UP MANAGEMENT

#### 8.1 Create Follow-Up
**Request:**
```http
POST http://localhost:5000/api/followup
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "clientId": "507f1f77bcf86cd799439012",
  "leadId": "507f1f77bcf86cd799439013",
  "subject": "Discuss Project Requirements",
  "notes": "Need to finalize timeline and budget",
  "nextFollowUpDate": "2026-01-20",
  "priority": "high"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Follow-up created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439017",
    "clientId": "507f1f77bcf86cd799439012",
    "subject": "Discuss Project Requirements",
    "status": "pending",
    "nextFollowUpDate": "2026-01-20"
  }
}
```

#### 8.2 Get Pending Follow-Ups
**Request:**
```http
GET http://localhost:5000/api/followup/pending
Content-Type: application/json
Authorization: Bearer <admin_token>
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439017",
      "subject": "Discuss Project Requirements",
      "status": "pending",
      "nextFollowUpDate": "2026-01-20"
    }
  ]
}
```

---

### STEP 9: DASHBOARD & ANALYTICS

#### 9.1 Get Dashboard Summary
**Request:**
```http
GET http://localhost:5000/api/dashboard/summary
Content-Type: application/json
Authorization: Bearer <admin_token>
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalClients": 1,
      "totalLeads": 1,
      "totalExpenses": 5000,
      "totalInvoiceAmount": 103250,
      "paidInvoiceAmount": 51625,
      "pendingFollowUps": 1,
      "overdueFollowUps": 0
    },
    "leadsByStage": [
      {
        "_id": "proposal",
        "count": 1
      }
    ]
  }
}
```

#### 9.2 Get Monthly Sales Trend
**Request:**
```http
GET http://localhost:5000/api/dashboard/sales-trend
Content-Type: application/json
Authorization: Bearer <admin_token>
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": [
    { "month": "Jan", "value": 103250 },
    { "month": "Feb", "value": 0 },
    { "month": "Mar", "value": 0 }
  ]
}
```

#### 9.3 Get Monthly Expense Trend
**Request:**
```http
GET http://localhost:5000/api/dashboard/expense-trend
Content-Type: application/json
Authorization: Bearer <admin_token>
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": [
    { "month": "Jan", "value": 5000 },
    { "month": "Feb", "value": 0 }
  ]
}
```

---

### STEP 10: CLIENT PORTAL TESTING

#### 10.1 Client Login
**Request:**
```http
POST http://localhost:5000/api/client-auth/login
Content-Type: application/json

{
  "email": "rajesh@techsolutions.com",
  "password": "ClientPassword@123"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Client login successful",
  "data": {
    "client": {
      "_id": "507f1f77bcf86cd799439012",
      "companyName": "Tech Solutions Pvt Ltd",
      "email": "rajesh@techsolutions.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 10.2 Client View Their Invoices
**Request:**
```http
GET http://localhost:5000/api/client-portal/invoices
Content-Type: application/json
Authorization: Bearer <client_token>
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "invoiceNumber": "INV/2026/001",
      "totalAmount": 103250,
      "paymentStatus": "partial"
    }
  ]
}
```

---

## 📮 POSTMAN COLLECTION

### Import Collection (JSON)
Create a file named `Acceptare_CRM_API.postman_collection.json`:

```json
{
  "info": {
    "name": "Acceptare CRM API",
    "description": "Complete API collection for Acceptare CRM",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\"name\":\"Admin\",\"email\":\"admin@test.com\",\"password\":\"Admin@123\",\"role\":\"admin\"}"
            },
            "url": {"raw": "{{baseUrl}}/auth/register", "host": ["{{baseUrl}}"], "path": ["auth", "register"]}
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"admin@test.com\",\"password\":\"Admin@123\"}"
            },
            "url": {"raw": "{{baseUrl}}/auth/login", "host": ["{{baseUrl}}"], "path": ["auth", "login"]}
          }
        }
      ]
    },
    {
      "name": "Client",
      "item": [
        {
          "name": "Create Client",
          "request": {
            "method": "POST",
            "header": [
              {"key": "Content-Type", "value": "application/json"},
              {"key": "Authorization", "value": "Bearer {{adminToken}}"}
            ],
            "body": {
              "mode": "raw",
              "raw": "{\"companyName\":\"Tech Corp\",\"contactPerson\":\"John\",\"email\":\"john@techcorp.com\",\"phone\":\"+91-9999999999\"}"
            },
            "url": {"raw": "{{baseUrl}}/client", "host": ["{{baseUrl}}"], "path": ["client"]}
          }
        }
      ]
    }
  ]
}
```

### Import Steps in Postman
1. Open Postman
2. Click **Import**
3. Select **Raw text** tab
4. Paste the JSON above
5. Click **Import**
6. Set environment to `Acceptare CRM - Local`
7. Start testing!

---

## 📋 SWAGGER/OPENAPI DOCUMENTATION

### Swagger Setup

#### Installation
```bash
npm install swagger-ui-express swagger-jsdoc
```

#### Create `swagger.js` in root:
```javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Acceptare CRM API',
      version: '1.0.0',
      description: 'Comprehensive CRM Backend API Documentation'
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development Server'
      },
      {
        url: 'https://acceptare-service-crm.onrender.com/api',
        description: 'Production Server'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
```

#### Update `server.js`:
```javascript
const { swaggerUi, specs } = require('./swagger');

// Add swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
```

#### Access Documentation
```
http://localhost:5000/api-docs
```

### Add Swagger Annotations to Routes

Example for Auth Routes:
```javascript
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with email and password
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, sales, support]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post('/register', registerValidation, authController.register);
```

---

## ⚠️ COMMON ERRORS & SOLUTIONS

### Error 1: Invalid Token
```
{
  "success": false,
  "message": "Invalid or expired token"
}
```
**Solution:** 
- Copy the token from login response exactly
- Ensure token is added in `Authorization: Bearer <token>`
- Token expires after 7 days, login again to get new token

### Error 2: MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running locally or MongoDB Atlas is accessible
- Check `MONGO_URI` in `.env` is correct
- Verify network access in MongoDB Atlas IP whitelist

### Error 3: Validation Error
```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["companyName is required"]
}
```
**Solution:**
- Check required fields in request body
- Match field names exactly (case-sensitive)
- Verify data types (string, number, date, etc.)

### Error 4: Insufficient Permissions
```json
{
  "success": false,
  "message": "Unauthorized: Insufficient permissions"
}
```
**Solution:**
- Verify user role matches endpoint requirements
- Admin can access all endpoints
- Sales role limited to specific modules
- Support role limited to follow-ups and communications

### Error 5: Rate Limit Exceeded
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```
**Solution:**
- Wait 15 minutes before making new requests
- Limit to 100 requests per 15 minutes
- Implement request batching in production

---

## 📊 PERFORMANCE TESTING

### Load Testing with Apache JMeter

#### Installation
```bash
# Download from https://jmeter.apache.org/download_jmeter.html
# Extract and run
jmeter.bat  # Windows
```

#### Create Performance Test Plan
1. Create new test plan
2. Add thread group (100 users, ramp-up 10s)
3. Add HTTP request sampler
4. Add listeners (response time, throughput)

### Load Testing Scenarios

#### Scenario 1: Normal Load
- 10 concurrent users
- Ramp-up: 10 seconds
- Duration: 5 minutes
- Request: Get clients list

#### Scenario 2: Peak Load
- 100 concurrent users
- Ramp-up: 30 seconds
- Duration: 10 minutes
- Request: Create invoices

#### Scenario 3: Stress Testing
- 500 concurrent users
- Ramp-up: 60 seconds
- Duration: 20 minutes
- Mixed requests

### Expected Performance Metrics
| Metric | Target | Status |
|--------|--------|--------|
| Average Response Time | < 500ms | ✅ |
| 95th Percentile | < 1000ms | ✅ |
| 99th Percentile | < 2000ms | ✅ |
| Throughput | > 50 req/s | ✅ |
| Error Rate | < 0.5% | ✅ |

---

## 🧬 AUTOMATION TESTING WITH JEST

### Run All Tests
```bash
npm test
```

### Run Specific Test
```bash
npm test -- auth.test.js
```

### Run with Coverage
```bash
npm test -- --coverage
```

### Expected Output
```
Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        21.801 s
```

---

## 📱 TESTING CHECKLIST

Use this checklist to ensure complete API testing:

### Authentication
- [ ] Register new user with valid data
- [ ] Register fails with duplicate email
- [ ] Login with correct credentials
- [ ] Login fails with wrong password
- [ ] Get profile with valid token
- [ ] Endpoints fail with invalid token

### Clients
- [ ] Create client with valid data
- [ ] List all clients with pagination
- [ ] Get specific client
- [ ] Update client information
- [ ] Delete client
- [ ] Cannot create duplicate clients

### Leads
- [ ] Create lead for existing client
- [ ] View lead pipeline
- [ ] Update lead stage
- [ ] Get leads by stage
- [ ] Cannot create lead without client

### Quotations & Invoices
- [ ] Create quotation with items
- [ ] Calculate GST correctly
- [ ] Convert quotation to invoice
- [ ] Track payment status
- [ ] Update payment information

### Expenses & Dashboard
- [ ] Create expense records
- [ ] Generate monthly reports
- [ ] View dashboard metrics
- [ ] Check sales vs expense comparison

### Follow-ups
- [ ] Create follow-up tasks
- [ ] Mark as pending/completed
- [ ] View overdue follow-ups
- [ ] Schedule next follow-up

### Client Portal
- [ ] Client registration
- [ ] Client login
- [ ] View own invoices
- [ ] View quotations
- [ ] Cannot access other client data

### Security
- [ ] Rate limiting works
- [ ] CORS properly configured
- [ ] JWT tokens expire
- [ ] Role-based access enforced
- [ ] Audit logs created

---

## 🚀 PRODUCTION DEPLOYMENT CHECKLIST

Before deploying to production:

- [ ] Set `NODE_ENV=production` in environment
- [ ] Use MongoDB Atlas (not local)
- [ ] Configure SMTP for email
- [ ] Set up WhatsApp integration
- [ ] Configure Razorpay keys
- [ ] Enable CORS for frontend domain
- [ ] Set strong JWT_SECRET (min 32 chars)
- [ ] Run full test suite
- [ ] Enable HTTPS
- [ ] Set up monitoring and alerting
- [ ] Configure backup strategy
- [ ] Set up error tracking (Sentry)
- [ ] Enable request logging

---

## 📞 SUPPORT & CONTACT

For issues or questions:
1. Check [Common Errors & Solutions](#common-errors--solutions)
2. Review code documentation in route files
3. Check MongoDB aggregation pipelines
4. Test with Postman/cURL
5. Enable debug logging: `DEBUG=* npm start`

**Backend Repository:** [Acceptare-Service-CRM](https://github.com/your-org/acceptare-service-crm)

---

**Last Updated:** January 15, 2026  
**Version:** 2.0  
**Status:** ✅ Production Ready
