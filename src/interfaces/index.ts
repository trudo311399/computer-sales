import { LucideIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export interface IBrand {
  id: string;
  name: string;
  slug: string;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
}

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
  specs: Record<string, string>;
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

export interface IProductCard {
  id: string;
  name: string;
  price: number;
  discountPrice?: number | null;
  stock: number;
  url?: string | null;
  altText: string | null;
  onAddToCart?: () => void;
}

export interface IProductFilters {
  search?: string;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  setCategory: Dispatch<SetStateAction<string | undefined>>;
  setBrand: Dispatch<SetStateAction<string | undefined>>;
  setPrice: Dispatch<SetStateAction<number[] | undefined>>;
}

export interface ISearchParams {
  page?: number;
  search?: string;
  category?: string;
  brand?: string;
  price?: number[];
}

export interface IProductInfo {
  name: string;
  description: string | null;
  brands: { name: string }[] | null | undefined;
  categories: { name: string }[] | null | undefined;
  price: number;
  discountPrice: number;
  stock: number;
  specs: Record<string, string>;
}

export interface IUser {
  id: string;
  email: string;
  password_hash: string;
  full_name?: string | null;
  phone?: string | null;
  role: string;
}

export interface IReview {
  id: string;
  rating: number;
  comment: string;
  product_id?: string | null;
  users: { full_name?: string | null };
}

export interface IProductDetail {
  name: string;
  description?: string | null;
  price: number;
  discount_price?: number | null;
  stock: number;
  specs?: Record<string, string> | null;
  categories?: { name: string }[] | null;
  brands?: { name: string }[] | null;
}

export interface IDetailProduct {
  id: string;
  product_id?: string | null;
  url: string;
  alt_text?: string | null;
  products: IProductDetail[];
}

export interface IStatCard {
  title: string;
  value: number;
  icon: LucideIcon;
}

export interface IAdminProductTable {
  id: string;
  name: string;
  price: number;
  stock: number;
  created_at: string;
}
export interface IAdminProductForm {
  id?: string;
  name: string;
  price: number;
  stock: number;
}
