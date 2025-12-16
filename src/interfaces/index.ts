export interface IProduct {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  brand_id: string | null;
  category_id: string | null;
  price: number;
  discount_price: number;
  stock: number;
  specs: JSON;
  created_at: string;
  updated_at: string;
}

export interface IProductImage {
  id: string;
  product_id: string;
  products: IProduct;
  url: string;
  alt_text: string | null;
}
