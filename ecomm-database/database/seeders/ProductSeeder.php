<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $categories = [
            'Men\'s Apparel' => [
                'barcode_prefix' => 101,
                'products' => [
                    ['name' => 'Hololive Pekora T-shirt (Men Size)', 'description' => 'Comfortable and stylish Hololive-themed shirt for men.'],
                    ['name' => 'Nike Dri-FIT Shorts', 'description' => 'Lightweight shorts designed for high-performance workouts.'],
                    ['name' => 'Adidas Running Jacket', 'description' => 'Stay warm and dry with this sleek running jacket.'],
                ],
            ],
            'Women\'s Apparel' => [
                'barcode_prefix' => 102,
                'products' => [
                    ['name' => 'Zara Summer Dress', 'description' => 'Breezy and elegant summer dress for any occasion.'],
                    ['name' => 'Uniqlo Activewear Top', 'description' => 'Versatile and comfortable activewear top.'],
                    ['name' => 'Forever21 Denim Jacket', 'description' => 'Classic and trendy denim jacket for women.'],
                ],
            ],
            'Mobile & Gadgets' => [
                'barcode_prefix' => 202,
                'products' => [
                    ['name' => 'Apple iPhone 14 Pro', 'description' => 'The latest in cutting-edge smartphone technology.'],
                    ['name' => 'Samsung Galaxy S23', 'description' => 'A premium Android smartphone with stunning performance.'],
                    ['name' => 'Xiaomi Redmi Note 12', 'description' => 'Affordable and reliable smartphone for everyday use.'],
                ],
            ],
            'Laptops & Computers' => [
                'barcode_prefix' => 201,
                'products' => [
                    ['name' => 'Razer Blade 15', 'description' => 'Powerful gaming laptop with stunning visuals.'],
                    ['name' => 'Dell XPS 13', 'description' => 'Compact and efficient ultrabook for professionals.'],
                    ['name' => 'HP Pavilion Gaming', 'description' => 'Affordable gaming laptop with excellent performance.'],
                ],
            ],
            'Accessories' => [
                'barcode_prefix' => 103,
                'products' => [
                    ['name' => 'Casio Digital Watch', 'description' => 'Durable and stylish digital watch with multiple features.'],
                    ['name' => 'Ray-Ban Aviator Sunglasses', 'description' => 'Iconic sunglasses for a classic look.'],
                    ['name' => 'Leather Wallet by Coach', 'description' => 'Elegant and premium leather wallet for everyday use.'],
                ],
            ],
            'Appliances' => [
                'barcode_prefix' => 205,
                'products' => [
                    ['name' => 'Dyson V15 Vacuum', 'description' => 'Advanced cordless vacuum for efficient cleaning.'],
                    ['name' => 'Instant Pot Duo 7-in-1', 'description' => 'Multi-functional cooker for convenient meal preparation.'],
                    ['name' => 'Philips Air Fryer XXL', 'description' => 'Cook healthier meals with this large-capacity air fryer.'],
                ],
            ],
            'Hobbies & Stationaries' => [
                'barcode_prefix' => 301,
                'products' => [
                    ['name' => 'Staedtler Colored Pencils', 'description' => 'Vibrant and smooth colored pencils for artists.'],
                    ['name' => 'Moleskine Notebook', 'description' => 'Premium notebook for notes, sketches, and ideas.'],
                    ['name' => 'LEGO Creator Set', 'description' => 'Build and create with this versatile LEGO set.'],
                ],
            ],
            'Shoes' => [
                'barcode_prefix' => 103,
                'products' => [
                    ['name' => 'Converse Chuck Taylor', 'description' => 'Classic sneakers for timeless style.'],
                    ['name' => 'Vans Old Skool', 'description' => 'Stylish skate shoes for everyday wear.'],
                    ['name' => 'Puma Running Shoes', 'description' => 'Lightweight and comfortable shoes for running.'],
                ],
            ],
            'Pet Care' => [
                'barcode_prefix' => 302,
                'products' => [
                    ['name' => 'Whiskas Cat Food', 'description' => 'Nutritious and delicious food for your cat.'],
                    ['name' => 'Pedigree Dog Biscuits', 'description' => 'Healthy treats to keep your dog happy.'],
                    ['name' => 'Aquarium Fish Filter', 'description' => 'Keep your aquarium clean and fresh with this filter.'],
                ],
            ],
            'Gaming' => [
                'barcode_prefix' => 203,
                'products' => [
                    ['name' => 'Razer DeathAdder V3 Mouse', 'description' => 'Ergonomic gaming mouse with precise tracking.'],
                    ['name' => 'Logitech G Pro Keyboard', 'description' => 'Compact mechanical keyboard for e-sports.'],
                    ['name' => 'HyperX Cloud II Headset', 'description' => 'Immersive sound for gaming and communication.'],
                ],
            ],
            'Audio' => [
                'barcode_prefix' => 204,
                'products' => [
                    ['name' => 'Sony WH-1000XM5 Headphones', 'description' => 'Noise-canceling headphones with premium sound.'],
                    ['name' => 'JBL Flip 6 Speaker', 'description' => 'Portable speaker with powerful bass.'],
                    ['name' => 'Bose QuietComfort Earbuds', 'description' => 'Comfortable and high-quality earbuds.'],
                ],
            ],
            'Groceries' => [
                'barcode_prefix' => 303,
                'products' => [
                    ['name' => 'Dole Pineapple Chunks', 'description' => 'Sweet and juicy pineapple chunks in syrup.'],
                    ['name' => 'Nestle Coffee-Mate', 'description' => 'Rich and creamy coffee creamer.'],
                    ['name' => 'Kellogg’s Corn Flakes', 'description' => 'Crispy and delicious breakfast cereal.'],
                ],
            ],
        ];

        foreach ($categories as $category => $details) {
            foreach ($details['products'] as $product) {
                DB::table('products')->insert([
                    'name' => $product['name'],
                    'category' => $category,
                    'barcode' => $details['barcode_prefix'] . str_pad(mt_rand(0, 9999), 4, '0', STR_PAD_LEFT),
                    'price' => mt_rand(100, 5000), // Random price between 100 and 5000
                    'avail_quantity' => mt_rand(5, 100), // Random stock between 5 and 100
                    'description' => $product['description'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
