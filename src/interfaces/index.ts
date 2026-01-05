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
  brands?: IBrand | null;
  categories?: ICategory | null;
  price: number;
  discountPrice: number;
  stock: number;
  specs: JSON;
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
  users: IUser;
}
