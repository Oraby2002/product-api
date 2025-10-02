# Simple Shop API

## Tech Stack
- Node.js
- TypeScript
- Sequelize ORM
- PostgreSQL



## Environment Variables
Create a `.env` file in the root of the backend project with the following variables:

DB_NAME=product
DB_USER=postgres
DB_PASSWORD=123
DB_HOST=localhost
DB_PORT=5432
DB_SCHEMA=public
PORT=4000
 
> Make sure to add `.env` to `.gitignore` to avoid committing sensitive data.

## How to Run
```bash
npm install
npm run dev

API Endpoints
Get All Products

GET /products

Returns all products with variants

Get Single Product

GET /products/:id

Returns product by ID

Filter by Category

GET /products?category=Audio

Returns products in that category

Create Product (POST)

POST /products

Body example (JSON):
{
  "name": "Aurora Wireless Headset",
  "description": "Immersive sound with ANC",
  "price": 219.00,
  "category": "Audio",
  "stock": 11,
  "imageUrl": "headphones.jpg",
  "variants": [
    { "name": "Color", "value": "Black" },
    { "name": "Color", "value": "White" }
  ]
}

Notes

Although the task suggested Prisma, this project was implemented using Sequelize ORM with PostgreSQL.

API tested using Postman.

The backend uses environment variables from .env for database configuration.