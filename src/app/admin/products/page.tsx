"use client";

import ProductTable from "@/components/admin/ProductTable";
import { IAdminProductTable } from "@/interfaces";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const AdminProductsPage = () => {
  const [products, setProducts] = useState<IAdminProductTable[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient();

      const { data } = await supabase
        .from("products")
        .select("id, name, price, stock, created_at")
        .order("created_at", { ascending: false });

      setProducts([...(data ?? [])]);
    };

    fetchProducts();
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
      <ProductTable initialProducts={products ?? []} />
    </div>
  );
};

export default AdminProductsPage;
