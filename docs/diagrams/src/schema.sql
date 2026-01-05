-- ============================================================
-- SCHEMA: Website bán máy tính online
-- Tương thích: Supabase (PostgreSQL)
-- Ngày tạo: 2025-10-25
-- ============================================================

-- Xóa bảng cũ (nếu cần reset)
DROP TABLE IF EXISTS order_items, orders, cart_items, carts,
    product_images, reviews, products, categories, brands,
    coupons, users CASCADE;

-- ============================================================
-- BẢNG NGƯỜI DÙNG
-- ============================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    phone TEXT,
    role TEXT DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BẢNG DANH MỤC SẢN PHẨM
-- ============================================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL
);

-- ============================================================
-- BẢNG THƯƠNG HIỆU
-- ============================================================
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE
);

-- ============================================================
-- BẢNG SẢN PHẨM
-- ============================================================
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    price NUMERIC(12,2) NOT NULL,
    discount_price NUMERIC(12,2),
    stock INT DEFAULT 0,
    specs JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BẢNG ẢNH SẢN PHẨM
-- ============================================================
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text TEXT
);

-- ============================================================
-- BẢNG GIỎ HÀNG
-- ============================================================
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BẢNG CHI TIẾT GIỎ HÀNG
-- ============================================================
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INT DEFAULT 1 CHECK (quantity > 0)
);

-- ============================================================
-- BẢNG ĐƠN HÀNG
-- ============================================================
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    order_number TEXT UNIQUE NOT NULL,
    total_amount NUMERIC(12,2) NOT NULL,
    status TEXT DEFAULT 'pending'
        CHECK (status IN ('pending', 'confirmed', 'shipping', 'completed', 'cancelled')),
    shipping_address TEXT,
    payment_method TEXT DEFAULT 'COD',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BẢNG CHI TIẾT ĐƠN HÀNG
-- ============================================================
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INT DEFAULT 1 CHECK (quantity > 0),
    unit_price NUMERIC(12,2) NOT NULL
);

-- ============================================================
-- BẢNG ĐÁNH GIÁ SẢN PHẨM
-- ============================================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BẢNG MÃ GIẢM GIÁ
-- ============================================================
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    discount_type TEXT CHECK (discount_type IN ('percent', 'fixed')),
    value NUMERIC(10,2) NOT NULL,
    valid_from TIMESTAMPTZ,
    valid_to TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE
);

-- ============================================================
-- TRIGGER: TỰ CẬP NHẬT updated_at CHO PRODUCTS
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trg_update_products_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- VIEW: Tổng hợp doanh thu đơn hàng (cho trang admin)
-- ============================================================
CREATE OR REPLACE VIEW v_order_summary AS
SELECT
    o.id AS order_id,
    o.order_number,
    u.full_name AS customer_name,
    o.total_amount,
    o.status,
    o.created_at
FROM orders o
LEFT JOIN users u ON u.id = o.user_id;

-- ============================================================
-- INDEX TỐI ƯU TÌM KIẾM
-- ============================================================
CREATE INDEX idx_products_name ON products USING GIN (to_tsvector('simple', name));
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);

-- ============================================================
-- KẾT THÚC
-- ============================================================
COMMENT ON DATABASE current_database() IS 'Schema for Laptop E-Commerce Website';
