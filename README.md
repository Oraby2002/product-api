# Simple Shop API

## Tech Stack
- Node.js
- TypeScript
- Sequelize ORM
- PostgreSQL

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

The server runs locally on http://localhost:4000.

API tested using Postman.