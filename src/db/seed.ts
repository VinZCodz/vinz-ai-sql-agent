import { db } from './client';
import { products, sales } from './schema';
import { InferInsertModel } from 'drizzle-orm';

// --- 1. Define Seed Data Structures ---

// Use Drizzle's utility type to ensure the seed data matches the table structure
type NewProduct = InferInsertModel<typeof products>;
type NewSale = InferInsertModel<typeof sales>;

// 1.1. Product Seed Data (15 Records)
const productSeeds: NewProduct[] = [
    { id: 1, name: 'Mechanical Keyboard', description: '104-key, Brown switches', price: 99.99, stock_quantity: 50, created_at: '2025-09-01 10:00:00' },
    { id: 2, name: 'Wireless Mouse', description: 'Ergonomic, 6 buttons', price: 25.50, stock_quantity: 120, created_at: '2025-09-01 10:05:00' },
    { id: 3, name: '4K Monitor (27")', description: 'IPS Panel, 144Hz refresh', price: 349.00, stock_quantity: 30, created_at: '2025-09-02 11:30:00' },
    { id: 4, name: 'USB-C Hub (7-in-1)', description: 'HDMI, PD, 3x USB 3.0', price: 45.00, stock_quantity: 200, created_at: '2025-09-03 14:00:00' },
    { id: 5, name: 'Noise-Cancelling Headphones', description: 'Over-ear, 30-hour battery', price: 199.99, stock_quantity: 75, created_at: '2025-09-05 09:15:00' },
    { id: 6, name: 'Portable SSD (1TB)', description: 'USB 3.1 Gen 2', price: 89.50, stock_quantity: 90, created_at: '2025-09-07 16:20:00' },
    { id: 7, name: 'Laptop Sleeve (15")', description: 'Neoprene protection', price: 15.00, stock_quantity: 150, created_at: '2025-09-10 08:45:00' },
    { id: 8, name: 'Gaming Mousepad', description: 'XL size, non-slip base', price: 19.99, stock_quantity: 180, created_at: '2025-09-11 11:10:00' },
    { id: 9, name: 'Webcam (1080p)', description: 'Built-in microphone', price: 35.00, stock_quantity: 110, created_at: '2025-09-12 13:55:00' },
    { id: 10, name: 'Rechargeable Battery Pack', description: '10,000mAh capacity', price: 29.99, stock_quantity: 130, created_at: '2025-09-15 17:00:00' },
    { id: 11, name: 'Smart Watch', description: 'Fitness tracking, GPS', price: 120.00, stock_quantity: 60, created_at: '2025-09-18 10:30:00' },
    { id: 12, name: 'E-reader', description: '6-inch display, backlight', price: 79.99, stock_quantity: 45, created_at: '2025-09-20 12:40:00' },
    { id: 13, name: 'Bluetooth Speaker', description: 'Portable, waterproof', price: 55.00, stock_quantity: 85, created_at: '2025-09-22 15:50:00' },
    { id: 14, name: 'Stylus Pen', description: 'Fine-tip, for touchscreens', price: 12.50, stock_quantity: 250, created_at: '2025-09-25 09:00:00' },
    { id: 15, name: 'Mesh Wi-Fi Router', description: 'Dual-band, 3-pack', price: 179.99, stock_quantity: 40, created_at: '2025-09-28 11:25:00' },
];

// 1.2. Sales Seed Data (15 Records)
const saleSeeds: NewSale[] = [
    { id: 1, product_id: 1, quantity_sold: 1, sale_price_per_unit: 99.99, total_revenue: 99.99, sale_date: '2025-10-01 12:00:00' },
    { id: 2, product_id: 3, quantity_sold: 1, sale_price_per_unit: 349.00, total_revenue: 349.00, sale_date: '2025-10-01 14:30:00' },
    { id: 3, product_id: 2, quantity_sold: 2, sale_price_per_unit: 25.50, total_revenue: 51.00, sale_date: '2025-10-02 09:15:00' },
    { id: 4, product_id: 5, quantity_sold: 1, sale_price_per_unit: 199.99, total_revenue: 199.99, sale_date: '2025-10-03 16:50:00' },
    { id: 5, product_id: 1, quantity_sold: 1, sale_price_per_unit: 99.99, total_revenue: 99.99, sale_date: '2025-10-04 10:20:00' },
    { id: 6, product_id: 7, quantity_sold: 5, sale_price_per_unit: 15.00, total_revenue: 75.00, sale_date: '2025-10-04 11:35:00' },
    { id: 7, product_id: 4, quantity_sold: 3, sale_price_per_unit: 45.00, total_revenue: 135.00, sale_date: '2025-10-05 13:10:00' },
    { id: 8, product_id: 10, quantity_sold: 4, sale_price_per_unit: 29.99, total_revenue: 119.96, sale_date: '2025-10-06 18:05:00' },
    { id: 9, product_id: 6, quantity_sold: 1, sale_price_per_unit: 89.50, total_revenue: 89.50, sale_date: '2025-10-07 14:45:00' },
    { id: 10, product_id: 9, quantity_sold: 2, sale_price_per_unit: 35.00, total_revenue: 70.00, sale_date: '2025-10-08 08:30:00' },
    { id: 11, product_id: 11, quantity_sold: 1, sale_price_per_unit: 120.00, total_revenue: 120.00, sale_date: '2025-10-09 15:25:00' },
    { id: 12, product_id: 12, quantity_sold: 1, sale_price_per_unit: 79.99, total_revenue: 79.99, sale_date: '2025-10-10 17:15:00' },
    { id: 13, product_id: 15, quantity_sold: 1, sale_price_per_unit: 179.99, total_revenue: 179.99, sale_date: '2025-10-11 11:00:00' },
    { id: 14, product_id: 8, quantity_sold: 6, sale_price_per_unit: 19.99, total_revenue: 119.94, sale_date: '2025-10-12 13:40:00' },
    { id: 15, product_id: 13, quantity_sold: 2, sale_price_per_unit: 55.00, total_revenue: 110.00, sale_date: '2025-10-13 09:55:00' },
];

// --- 2. Seeding Function ---

async function seed() {
    console.log('--- Starting Database Seeding ---');

    try {
        // Step 1: Clear existing data (optional, but good for repeatable seeding)
        console.log('Clearing existing sales and products data...');
        // Order matters: delete sales first due to the foreign key constraint
        await db.delete(sales);
        await db.delete(products);
        console.log('Tables cleared.');

        // Step 2: Insert Products
        console.log(`Inserting ${productSeeds.length} products...`);
        await db.insert(products).values(productSeeds);
        console.log('Products inserted successfully.');

        // Step 3: Insert Sales
        console.log(`Inserting ${saleSeeds.length} sales records...`);
        await db.insert(sales).values(saleSeeds);
        console.log('Sales records inserted successfully.');

    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    } finally {
        console.log('--- Database Seeding Complete ---');
        // If you need to manually close the connection, do it here
        // (Turso client often handles this, but may vary by setup)
        // db.close();
    }
}

seed();