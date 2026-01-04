"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { IProductFilters } from "@/interfaces";
import { Search } from "lucide-react";
import { getCategoryList } from "./getCategoryList";
import { getBrandList } from "./getBrandList";
import { getMinPrice } from "./getMinPrice";
import { getMaxPrice } from "./getMaxPrice";

const ProductFilters = ({
  search,
  setSearch,
  setCategory,
  setBrand,
  setPrice,
}: IProductFilters) => {
  const [categoryList, setCategoryList] = useState<string[]>();
  const [brandList, setBrandList] = useState<string[]>();
  const [minPrice, setMinPrice] = useState<string>();
  const [maxPrice, setMaxPrice] = useState<string>();

  useEffect(() => {
    const fetchFilters = async () => {
      const resCategoryList = await getCategoryList();
      const resBrandList = await getBrandList();
      const resMinPrice = await getMinPrice();
      const resMaxPrice = await getMaxPrice();

      setCategoryList(resCategoryList);
      setBrandList(resBrandList);
      setMinPrice(resMinPrice);
      setMaxPrice(resMaxPrice);
    };

    fetchFilters();
  });

  const handleSearch = (value?: string) => setSearch(value);
  const handleCategory = (value?: string) => setCategory(value);
  const handleBrand = (value?: string) => setBrand(value);
  const handlePrice = (value?: number[]) => {
    if (value) setPrice([...value]);
  };

  return (
    <div className="space-y-4 rounded-lg border p-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm sản phẩm..."
          className="pl-8"
          value={search || ""}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Category */}
      <Select onValueChange={(e) => handleCategory(e)}>
        <SelectTrigger>
          <SelectValue placeholder="Danh mục" />
        </SelectTrigger>
        <SelectContent>
          {categoryList?.map((e) => (
            <SelectItem key={e} value={e}>
              {e}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Brand */}
      <Select onValueChange={(e) => handleBrand(e)}>
        <SelectTrigger>
          <SelectValue placeholder="Thương hiệu" />
        </SelectTrigger>
        <SelectContent>
          {brandList?.map((e) => (
            <SelectItem key={e} value={e}>
              {e}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Price */}
      <div>
        <p className="mb-2 text-sm font-medium">
          Giá: {minPrice?.toLocaleString()}₫ – {maxPrice?.toLocaleString()}₫
        </p>
        <Slider
          min={+(minPrice ?? 0)}
          max={+(maxPrice ?? 0)}
          step={1}
          value={[+(minPrice ?? 0), +(maxPrice ?? 0)]}
          onValueChange={(e) => handlePrice(e)}
        />
      </div>
    </div>
  );
};

export default ProductFilters;
