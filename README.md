# E-commerce Clothing Store Database Design Documentation

## 1. System Overview

This database design implements a scalable e-commerce platform specialized for clothing retail, with built-in flexibility for future expansion. The system supports complex product hierarchies, variant management, and comprehensive product information storage.

## 2. Database Schema Overview

Updated Database Schema Documentation:

# Database Schema Documentation for DressRealm

## 1. Users Table

**Purpose:** Store user information and credentials.

| Column Name   | Data Type    | Constraints | Description                                 |
|---------------|--------------|-------------|---------------------------------------------|
| user_id       | INT          | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each user |
| username      | VARCHAR(50)  | NOT NULL, UNIQUE | User's username for login |
| email         | VARCHAR(100) | NOT NULL, UNIQUE | User's email address |
| password_hash | VARCHAR(255) | NOT NULL    | Hashed password for security |
| first_name    | VARCHAR(50)  | NOT NULL    | User's first name |
| last_name     | VARCHAR(50)  | NOT NULL    | User's last name |
| phone_number  | VARCHAR(20)  | NULL        | User's phone number |
| address       | VARCHAR(255) | NULL        | User's shipping address |
| created_at    | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Timestamp of user registration |
| updated_at    | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last user update |

## 2. Categories Table

**Purpose:** Store product category information.

| Column Name | Data Type    | Constraints | Description                                 |
|-------------|--------------|-------------|---------------------------------------------|
| category_id | INT          | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each category |
| name        | VARCHAR(50)  | NOT NULL, UNIQUE | Name of the category |
| description | VARCHAR(255) | NULL        | Brief description of the category |
| created_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Timestamp of category creation |
| updated_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last category update |

## 3. Products Table

**Purpose:** Store product information.

| Column Name   | Data Type    | Constraints | Description                                 |
|---------------|--------------|-------------|---------------------------------------------|
| product_id    | INT          | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each product |
| category_id   | INT          | FOREIGN KEY (Categories.category_id) | ID of the category the product belongs to |
| name          | VARCHAR(100) | NOT NULL    | Name of the product |
| description   | TEXT         | NULL        | Detailed description of the product |
| price         | DECIMAL(10,2)| NOT NULL    | Price of the product |
| stock_level   | INT          | NOT NULL    | Current stock level of the product |
| created_at    | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Timestamp of product creation |
| updated_at    | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last product update |

## 4. ProductVariants Table

**Purpose:** Store variations of a product (e.g., size, color).

| Column Name   | Data Type    | Constraints | Description                                 |
|---------------|--------------|-------------|---------------------------------------------|
| variant_id    | INT          | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each product variant |
| product_id    | INT          | FOREIGN KEY (Products.product_id) | ID of the product the variant belongs to |
| name          | VARCHAR(100) | NOT NULL    | Name of the variant (e.g., size, color) |
| stock_level   | INT          | NOT NULL    | Current stock level of the variant |
| created_at    | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Timestamp of variant creation |
| updated_at    | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last variant update |

## 5. ProductImages Table

**Purpose:** Store images associated with products.

| Column Name | Data Type    | Constraints | Description                                 |
|-------------|--------------|-------------|---------------------------------------------|
| image_id    | INT          | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each product image |
| product_id  | INT          | FOREIGN KEY (Products.product_id) | ID of the product the image belongs to |
| image_url   | VARCHAR(255) | NOT NULL    | URL of the product image |
| alt_text    | VARCHAR(255) | NULL        | Alternative text for the image |
| created_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Timestamp of image upload |

## 6. Orders Table

**Purpose:** Store order information.

| Column Name   | Data Type    | Constraints | Description                                 |
|---------------|--------------|-------------|---------------------------------------------|
| order_id      | INT          | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each order |
| user_id       | INT          | FOREIGN KEY (Users.user_id) | ID of the user who placed the order |
| order_date    | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Timestamp of order placement |
| status        | VARCHAR(20)  | NOT NULL    | Current status of the order (e.g., pending, shipped) |
| total_amount  | DECIMAL(10,2)| NOT NULL    | Total amount of the order |

## 7. OrderItems Table

**Purpose:** Store individual items within an order.

| Column Name   | Data Type    | Constraints | Description                                 |
|---------------|--------------|-------------|---------------------------------------------|
| order_item_id | INT          | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each order item |
| order_id      | INT          | FOREIGN KEY (Orders.order_id) | ID of the order the item belongs to |
| variant_id    | INT          | FOREIGN KEY (ProductVariants.variant_id) | ID of the product variant |
| quantity      | INT          | NOT NULL    | Quantity of the item ordered |
| price         | DECIMAL(10,2)| NOT NULL    | Price of the item at the time of order |

## Relationships

- Each `User` can place multiple `Orders`.
- Each `Order` belongs to one `User`.
- Each `Order` can have multiple `OrderItems`.
- Each `OrderItem` belongs to one `Order` and one `ProductVariant`.
- Each `Product` belongs to one `Category`.
- Each `Product` can have multiple `ProductVariants` and `ProductImages`.
- Each `ProductVariant` belongs to one `Product`.
- Each `ProductImage` belongs to one `Product`.

This updated schema and documentation include the `ProductImages` table and its relationship with the `Products` table. The `ProductImages` table stores the images associated with each product, allowing for multiple images per product.

The relationships between the tables remain the same, with the addition of the one-to-many relationship between `Product` and `ProductImage`.

I apologize for the previous oversight, and I hope this updated schema and documentation meet your requirements for the DressRealm e-commerce platform.


## Tech Stack

- [Next.js 14](https://nextjs.org/) - The React Framework for the Web
- [React 18](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) - Re-usable components built using Radix UI and Tailwind CSS
- [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
- [PostgreSQL](https://www.postgresql.org/) - Open source object-relational database

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.