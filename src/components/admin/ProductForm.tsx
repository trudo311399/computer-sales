"use client";

import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { IAdminProductForm } from "@/interfaces";

const ProductForm = ({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product?: IAdminProductForm | null;
}) => {
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product?.price ?? 0);
  const [stock, setStock] = useState(product?.stock ?? 0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
    }
  }, [product]);

  const handleSubmit = async () => {
    const supabase = await createClient();
    if (product?.id) {
      await supabase
        .from("products")
        .update({ name, price, stock })
        .eq("id", product.id);
    } else {
      await supabase.from("products").insert({
        name,
        price,
        stock,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
      });
    }
    location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-semibold">
            {product ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
          </h2>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Tên sản phẩm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Giá"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Tồn kho"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />

          <Button className="w-full" onClick={handleSubmit}>
            Lưu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
