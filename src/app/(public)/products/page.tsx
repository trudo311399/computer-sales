"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductFilters from "@/components/user/product/ProductFilters";
import ProductCard from "@/components/user/product/ProductCard";
import { ISearchParams } from "@/interfaces";
import { getProducts } from "./getProducts";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");

  const [search, setSearch] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [brand, setBrand] = useState<string>();
  const [price, setPrice] = useState<number[]>();
  const [data, setData] = useState<any[] | null>();
  const [totalPages, setTotalPages] = useState<number>();
  const [pg, setPg] = useState<number>();

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts({
        page,
        search,
        category,
        brand,
        price,
      });

      if (!result.data || !result.data.length) setData([]);
      else {
        setData([...result.data]);
      }
      setTotalPages(result.totalPages);
      setPg(result.pg);
    };

    fetchProducts();
  });

  // console.log(data);

  return (
    <div className="container mx-auto grid grid-cols-1 gap-6 py-8 md:grid-cols-4">
      {/* Filters */}
      <aside className="md:col-span-1">
        <ProductFilters
          search={search}
          setSearch={setSearch}
          setCategory={setCategory}
          setBrand={setBrand}
          setPrice={setPrice}
        />
      </aside>

      {/* Products */}
      <section className="md:col-span-3">
        {data?.length === 0 && (
          <p className="text-muted-foreground">Không có sản phẩm phù hợp.</p>
        )}

        {/* !!! Error: Search product ny name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((e) => (
            <ProductCard
              key={e.id}
              id={e.products.id}
              name={e.products.name}
              price={e.products.price}
              discountPrice={e.products.discount_price}
              stock={e.products.stock}
              url={e.url}
              altText={e.altText}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <a
              key={i}
              href={`/products?page=${i + 1}`}
              className={`rounded px-3 py-1 text-sm ${
                pg === i + 1
                  ? "bg-primary text-white"
                  : "border text-muted-foreground"
              }`}
            >
              {i + 1}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
