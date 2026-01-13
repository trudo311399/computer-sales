"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import ProductImageUpload from "./ProductImageUpload";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { IBrand, ICategory } from "@/interfaces";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ProductCreateForm = ({
  open,
  imageUrl,
  setImageUrl,
  onClose,
}: {
  open: boolean;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  onClose: () => void;
}) => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const [form, setForm] = useState({
    sku: "",
    name: "",
    description: "",
    brand_id: "",
    category_id: "",
    price: 0,
    discount_price: 0,
    stock: 0,
    specs: "",
  });

  useEffect(() => {
    const fetchBrandCategory = async () => {
      const supabase = await createClient();

      const [{ data: brands }, { data: categories }] = await Promise.all([
        supabase.from("brands").select("*"),
        supabase.from("categories").select("*"),
      ]);

      setBrands([...(brands ?? [])]);
      setCategories([...(categories ?? [])]);
    };

    fetchBrandCategory();
  }, []);

  const handleSumnit = async () => {
    const supabase = await createClient();
    const { data: product, error } = await supabase
      .from("products")
      .insert({ ...form, specs: JSON.parse(form.specs || "{}") })
      .select()
      .single();

    if (error) {
      return alert(error.message);
    }

    if (imageUrl) {
      await supabase
        .from("product_images")
        .insert({ product_id: product.id, url: imageUrl, alt_text: imageUrl });
    }

    alert("Thêm sản phẩm thành công!");
    onClose();
    location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-semibold">Thêm mới sản phẩm</h2>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hình ảnh */}
          <ProductImageUpload onUploaded={setImageUrl} />

          {imageUrl && (
            <Image
              src={imageUrl}
              className="h-40 rounded-lg object-cover"
              width={300}
              height={300}
              alt={imageUrl}
            />
          )}

          {/* SKU + Tên */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Mã hàng hóa (SKU)"
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
            />
            <Input
              placeholder="Tên sản phẩm"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <Textarea
            placeholder="Mô tả sản phẩm"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {/* Brand + Category */}
          <div className="grid grid-cols-2 gap-4">
            <Select onValueChange={(v) => setForm({ ...form, brand_id: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn thương hiệu" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(v) => setForm({ ...form, category_id: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Giá */}
          <div className="grid grid-cols-3 gap-4">
            <Input
              type="number"
              placeholder="Giá"
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
            />
            <Input
              type="number"
              placeholder="Giá giảm"
              onChange={(e) =>
                setForm({ ...form, discount_price: Number(e.target.value) })
              }
            />
            <Input
              type="number"
              placeholder="Tồn kho"
              onChange={(e) =>
                setForm({ ...form, stock: Number(e.target.value) })
              }
            />
          </div>

          {/* Thông số kỹ thuật */}
          <Textarea
            placeholder='Thông số kỹ thuật (JSON) ví dụ: {"CPU":"i7","RAM":"16GB"}'
            onChange={(e) => setForm({ ...form, specs: e.target.value })}
          />

          <Button className="w-full" onClick={handleSumnit}>
            Thêm sản phẩm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCreateForm;
