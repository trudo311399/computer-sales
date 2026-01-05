-- ============================================================
-- DỮ LIỆU MỞ RỘNG CHO WEBSITE BÁN MÁY TÍNH ONLINE
-- Dùng cho Supabase (PostgreSQL)
-- ============================================================

TRUNCATE TABLE order_items, orders, cart_items, carts,
product_images, products, categories, brands, reviews, users, coupons RESTART IDENTITY CASCADE;

-- ============================================================
-- NGƯỜI DÙNG
-- ============================================================
INSERT INTO users (id, email, password_hash, full_name, phone, role)
VALUES 
  ('00000000-0000-0000-0000-000000000001'::uuid, 'admin@shop.vn', '$2b$10$adminhash', 'Admin', '0909000001', 'admin'),
  ('00000000-0000-0000-0000-000000000002'::uuid, 'user1@shop.vn', '$2b$10$userhash', 'Nguyen Van A', '0909123456', 'customer'),
  ('00000000-0000-0000-0000-000000000003'::uuid, 'user2@shop.vn', '$2b$10$userhash', 'Tran Thi B', '0909333444', 'customer'),
  ('00000000-0000-0000-0000-000000000004'::uuid, 'user3@shop.vn', '$2b$10$userhash', 'Le Van C', '0909555666', 'customer');

-- ============================================================
-- THƯƠNG HIỆU
-- ============================================================
INSERT INTO brands (id, name, slug)
VALUES
  (gen_random_uuid(), 'ASUS', 'asus'),
  (gen_random_uuid(), 'Dell', 'dell'),
  (gen_random_uuid(), 'MSI', 'msi'),
  (gen_random_uuid(), 'Apple', 'apple'),
  (gen_random_uuid(), 'HP', 'hp');

-- ============================================================
-- DANH MỤC
-- ============================================================
INSERT INTO categories (id, name, slug)
VALUES
  (gen_random_uuid(), 'Laptop', 'laptop'),
  (gen_random_uuid(), 'PC', 'pc'),
  (gen_random_uuid(), 'Phụ kiện', 'phu-kien'),
  (gen_random_uuid(), 'Màn hình', 'man-hinh');

-- ============================================================
-- SẢN PHẨM (12 sản phẩm)
-- ============================================================
INSERT INTO products (id, sku, name, description, brand_id, category_id, price, discount_price, stock, specs)
VALUES
  (gen_random_uuid(), 'LAP001', 'ASUS Vivobook 15', 'Laptop văn phòng, chip i5, RAM 8GB, SSD 512GB',
    (SELECT id FROM brands WHERE name = 'ASUS'),
    (SELECT id FROM categories WHERE name = 'Laptop'),
    15990000, 14990000, 20,
    '{"CPU":"Intel i5-1240P","RAM":"8GB","SSD":"512GB","Màn hình":"15.6 inch FHD"}'::jsonb
  ),
  (gen_random_uuid(), 'LAP002', 'Dell Inspiron 14', 'Laptop nhỏ gọn, pin trâu',
    (SELECT id FROM brands WHERE name = 'Dell'),
    (SELECT id FROM categories WHERE name = 'Laptop'),
    18990000, NULL, 15,
    '{"CPU":"Intel i7-1255U","RAM":"16GB","SSD":"512GB"}'::jsonb
  ),
  (gen_random_uuid(), 'LAP003', 'MSI GF63 Thin', 'Laptop gaming giá rẻ',
    (SELECT id FROM brands WHERE name = 'MSI'),
    (SELECT id FROM categories WHERE name = 'Laptop'),
    20990000, 19990000, 10,
    '{"CPU":"Intel i5-12450H","GPU":"RTX 2050","RAM":"16GB"}'::jsonb
  ),
  (gen_random_uuid(), 'MAC001', 'MacBook Air M2 2024', 'Laptop cao cấp, chip M2, macOS Sonoma',
    (SELECT id FROM brands WHERE name = 'Apple'),
    (SELECT id FROM categories WHERE name = 'Laptop'),
    28990000, NULL, 8,
    '{"CPU":"Apple M2","RAM":"8GB","SSD":"256GB"}'::jsonb
  ),
  (gen_random_uuid(), 'LAP004', 'HP Pavilion 15', 'Laptop học tập, giá tốt',
    (SELECT id FROM brands WHERE name = 'HP'),
    (SELECT id FROM categories WHERE name = 'Laptop'),
    13990000, 12990000, 25,
    '{"CPU":"Intel i5-1135G7","RAM":"8GB","SSD":"512GB"}'::jsonb
  ),
  (gen_random_uuid(), 'PC001', 'PC Gaming ASUS ROG', 'PC gaming cao cấp RTX 4070',
    (SELECT id FROM brands WHERE name = 'ASUS'),
    (SELECT id FROM categories WHERE name = 'PC'),
    35990000, 33990000, 5,
    '{"CPU":"Intel i7-13700K","GPU":"RTX 4070","RAM":"32GB"}'::jsonb
  ),
  (gen_random_uuid(), 'PC002', 'PC Văn phòng Dell OptiPlex', 'Máy tính văn phòng hiệu suất ổn định',
    (SELECT id FROM brands WHERE name = 'Dell'),
    (SELECT id FROM categories WHERE name = 'PC'),
    9990000, NULL, 12,
    '{"CPU":"Intel i5-10400","RAM":"8GB","SSD":"256GB"}'::jsonb
  ),
  (gen_random_uuid(), 'MN001', 'Màn hình MSI 27 inch 2K 165Hz', 'Màn hình chơi game cong, tần số quét cao',
    (SELECT id FROM brands WHERE name = 'MSI'),
    (SELECT id FROM categories WHERE name = 'Màn hình'),
    6990000, 6490000, 30,
    '{"Kích thước":"27 inch","Độ phân giải":"2560x1440","Tần số quét":"165Hz"}'::jsonb
  ),
  (gen_random_uuid(), 'MN002', 'Màn hình Dell Ultrasharp 24', 'Chất lượng hình ảnh cao, chuẩn màu tốt',
    (SELECT id FROM brands WHERE name = 'Dell'),
    (SELECT id FROM categories WHERE name = 'Màn hình'),
    5990000, NULL, 15,
    '{"Kích thước":"24 inch","Độ phân giải":"1920x1200"}'::jsonb
  ),
  (gen_random_uuid(), 'AC001', 'Chuột Logitech G102', 'Chuột gaming có dây, DPI cao',
    (SELECT id FROM brands WHERE name = 'HP'),
    (SELECT id FROM categories WHERE name = 'Phụ kiện'),
    490000, 390000, 50,
    '{"Loại":"Chuột","Kết nối":"USB","DPI":"8000"}'::jsonb
  ),
  (gen_random_uuid(), 'AC002', 'Bàn phím cơ Keychron K6', 'Bàn phím cơ Bluetooth nhỏ gọn',
    (SELECT id FROM brands WHERE name = 'Apple'),
    (SELECT id FROM categories WHERE name = 'Phụ kiện'),
    2190000, 1990000, 40,
    '{"Loại":"Cơ","Kết nối":"Bluetooth","LED":"RGB"}'::jsonb
  ),
  (gen_random_uuid(), 'AC003', 'Tai nghe HyperX Cloud II', 'Tai nghe gaming âm thanh vòm 7.1',
    (SELECT id FROM brands WHERE name = 'MSI'),
    (SELECT id FROM categories WHERE name = 'Phụ kiện'),
    2390000, 2190000, 35,
    '{"Loại":"Over-ear","Kết nối":"USB","Âm thanh":"7.1"}'::jsonb
  );

-- ============================================================
-- ẢNH SẢN PHẨM (đơn giản hóa)
-- ============================================================
INSERT INTO product_images (product_id, url, alt_text)
SELECT id, 'https://cdn.example.com/' || lower(replace(sku, ' ', '-')) || '.jpg', name FROM products;

-- ============================================================
-- GIỎ HÀNG (mỗi user 1 giỏ hàng)
-- ============================================================
INSERT INTO carts (user_id)
SELECT id FROM users WHERE role = 'customer';

-- ============================================================
-- MỤC GIỎ HÀNG
-- ============================================================
INSERT INTO cart_items (cart_id, product_id, quantity)
SELECT 
  (SELECT id FROM carts WHERE user_id = '00000000-0000-0000-0000-000000000002'),
  (SELECT id FROM products WHERE sku = 'LAP001'), 1
UNION ALL
SELECT 
  (SELECT id FROM carts WHERE user_id = '00000000-0000-0000-0000-000000000003'),
  (SELECT id FROM products WHERE sku = 'AC001'), 2
UNION ALL
SELECT 
  (SELECT id FROM carts WHERE user_id = '00000000-0000-0000-0000-000000000004'),
  (SELECT id FROM products WHERE sku = 'MN001'), 1;

-- ============================================================
-- ĐƠN HÀNG & CHI TIẾT
-- ============================================================
INSERT INTO orders (user_id, order_number, total_amount, status, shipping_address, payment_method)
VALUES
  ('00000000-0000-0000-0000-000000000002', 'ORD20251025-001', 28990000, 'completed', '12 Nguyễn Văn Bảo, Gò Vấp, TP.HCM', 'COD'),
  ('00000000-0000-0000-0000-000000000003', 'ORD20251025-002', 14990000, 'processing', '21 Nguyễn Trãi, Quận 1, TP.HCM', 'MOMO');

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT 
  (SELECT id FROM orders WHERE order_number = 'ORD20251025-001'),
  (SELECT id FROM products WHERE sku = 'MAC001'), 1, 28990000
UNION ALL
SELECT 
  (SELECT id FROM orders WHERE order_number = 'ORD20251025-002'),
  (SELECT id FROM products WHERE sku = 'LAP001'), 1, 14990000;

-- ============================================================
-- ĐÁNH GIÁ
-- ============================================================
INSERT INTO reviews (product_id, user_id, rating, comment)
VALUES
  ((SELECT id FROM products WHERE sku = 'LAP001'), '00000000-0000-0000-0000-000000000002', 5, 'Máy chạy mượt, pin ổn.'),
  ((SELECT id FROM products WHERE sku = 'MAC001'), '00000000-0000-0000-0000-000000000003', 5, 'Thiết kế đẹp, hiệu năng tốt.'),
  ((SELECT id FROM products WHERE sku = 'AC002'), '00000000-0000-0000-0000-000000000004', 4, 'Bàn phím gõ êm, pin lâu.');

-- ============================================================
-- MÃ GIẢM GIÁ
-- ============================================================
INSERT INTO coupons (code, discount_type, value, valid_from, valid_to, is_active)
VALUES
  ('GIAM10', 'percent', 10, NOW(), NOW() + INTERVAL '30 days', TRUE),
  ('SALE500K', 'fixed', 500000, NOW(), NOW() + INTERVAL '15 days', TRUE),
  ('FREESHIP', 'fixed', 30000, NOW(), NOW() + INTERVAL '60 days', TRUE),
  ('NEWUSER', 'percent', 5, NOW(), NOW() + INTERVAL '90 days', TRUE);

-- ============================================================
-- KẾT THÚC
-- ============================================================
COMMENT ON DATABASE current_database() IS 'Extended seed data for Supabase Laptop E-Commerce project';
