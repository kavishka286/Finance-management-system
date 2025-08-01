# Finance management system

## Setup Instructions

1. *Set up environment variables:*
   Create a .env file in the root directory and add the necessary environment variables.   
   PORT=5000
   MONGO_URI='mongodb+srv://kavishka:Kavishka!2002@cluster0.5unfk.mongodb.net/AF'

2. *Run the application:*

   node server

## API Endpoint Documentation

1.We will add Postman collection document  
 ```bash
User APIs
POST - /api/users/register (Register User)
POST - /api/users/login (User Login)
Transaction APIs
POST - /api/transactions (Create Transaction)
GET - /api/transactions/{id} (Get Transaction by ID)
PUT - /api/transactions/{id} (Update Transaction)
Budget APIs
POST - /api/budgets (Create Budget)
GET - /api/budgets (Get Budgets)
PUT - /api/budgets/{id} (Update Budget)
GET - /api/budgets/recommendations (Get Budget Recommendations)
Goal APIs
POST - /api/goals (Create Goal)
GET - /api/goals (Get All Goals)
PUT - /api/goals/{id} (Update Goal)
PUT - /api/goals/{id}/add-savings (Add Savings to Goal)
Report APIs
GET - /api/reports/income-vs-expenses?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD (Income vs Expenses Report)
GET - /api/reports/budget-summary?startDate=YYYY-MM&endDate=YYYY-MM (Budget Summary Report)
Admin Dashboard APIs
GET - /api/dashboard/admin (Admin Dashboard Data)
User Dashbord APIs
GET - /api/dashboard/admin (User Dashboard Data)
    ```
