import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// --- Products Table ---

/**
 * Defines the structure for the 'products' table.
 * It stores information about the items available for sale.
 */
export const products = sqliteTable('products', {
    // Primary key for the products table. Auto-increments.
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),

    // Name of the product (e.g., "Laptop", "Coffee Mug").
    name: text('name').notNull(),

    // A brief description of the product.
    description: text('description'),

    // The current price of the product. Uses 'real' for floating-point numbers.
    price: real('price').notNull(),

    // The current stock quantity.
    stock_quantity: integer('stock_quantity').notNull().default(0),

    // Timestamp for when the product record was created.
    created_at: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// --- Sales Table ---

/**
 * Defines the structure for the 'sales' table.
 * It records individual sales transactions.
 * Includes a foreign key relationship to the 'products' table.
 */
export const sales = sqliteTable('sales', {
    // Primary key for the sales table. Auto-increments.
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),

    // Foreign key linking to the 'products' table.
    // This column indicates which product was sold.
    product_id: integer('product_id').notNull().references(() => products.id),

    // The quantity of the product sold in this transaction.
    quantity_sold: integer('quantity_sold').notNull(),

    // The price at which the product was sold (may differ from current price in 'products').
    sale_price_per_unit: real('sale_price_per_unit').notNull(),

    // The total revenue for this specific sale item (quantity_sold * sale_price_per_unit).
    total_revenue: real('total_revenue').notNull(),

    // Timestamp for when the sale occurred.
    sale_date: text('sale_date').notNull().default(sql`CURRENT_TIMESTAMP`),
});