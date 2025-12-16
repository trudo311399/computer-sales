-- ============================================================
-- RLS POLICIES for Supabase E-Commerce Project
-- (Thiết kế website bán máy tính online)
-- ============================================================

-- ========== BẬT RLS CHO TOÀN BỘ CÁC BẢNG ==========
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- USERS
-- ============================================================

-- User chỉ xem và cập nhật thông tin của chính họ
CREATE POLICY "Users can view their own profile"
ON users
FOR SELECT
USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
ON users
FOR UPDATE
USING (id = auth.uid());

-- Admin có thể xem và chỉnh sửa tất cả người dùng
CREATE POLICY "Admin can manage all users"
ON users
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users AS u WHERE u.id = auth.uid() AND u.role = 'admin'
  )
);

-- ============================================================
-- PRODUCTS
-- ============================================================

-- Ai cũng có thể xem danh sách sản phẩm
CREATE POLICY "Anyone can view products"
ON products
FOR SELECT
USING (true);

-- Chỉ admin được thêm, sửa, xóa sản phẩm
CREATE POLICY "Only admin can manage products"
ON products
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ============================================================
-- CATEGORIES & BRANDS
-- ============================================================

CREATE POLICY "Anyone can view categories"
ON categories
FOR SELECT
USING (true);

CREATE POLICY "Anyone can view brands"
ON brands
FOR SELECT
USING (true);

CREATE POLICY "Only admin can manage categories"
ON categories
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Only admin can manage brands"
ON brands
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ============================================================
-- CARTS
-- ============================================================

CREATE POLICY "User can view their own cart"
ON carts
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "User can modify their own cart"
ON carts
FOR ALL
USING (user_id = auth.uid());

-- ============================================================
-- CART ITEMS
-- ============================================================

CREATE POLICY "User can manage their own cart items"
ON cart_items
FOR ALL
USING (
  cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid())
);

-- ============================================================
-- ORDERS
-- ============================================================

-- User chỉ được xem và thêm đơn hàng của mình
CREATE POLICY "User can view own orders"
ON orders
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "User can insert own order"
ON orders
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Admin được xem, cập nhật, xóa tất cả đơn hàng
CREATE POLICY "Admin can manage all orders"
ON orders
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ============================================================
-- ORDER ITEMS
-- ============================================================

CREATE POLICY "User can view items of their own orders"
ON order_items
FOR SELECT
USING (
  order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
);

CREATE POLICY "Admin can manage all order items"
ON order_items
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ============================================================
-- REVIEWS
-- ============================================================

CREATE POLICY "Anyone can read reviews"
ON reviews
FOR SELECT
USING (true);

CREATE POLICY "User can write review for product"
ON reviews
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "User can update/delete own review"
ON reviews
FOR UPDATE, DELETE
USING (user_id = auth.uid());

-- ============================================================
-- COUPONS
-- ============================================================

CREATE POLICY "Anyone can view active coupons"
ON coupons
FOR SELECT
USING (is_active = TRUE);

CREATE POLICY "Admin can manage coupons"
ON coupons
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ============================================================
-- KIỂM TRA POLICY
-- ============================================================
-- SELECT * FROM pg_policies;
-- ============================================================
