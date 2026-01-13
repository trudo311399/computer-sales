"use client";

import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { IAdminProductForm } from "@/interfaces";

const ProductUpdateForm = ({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product?: IAdminProductForm | null;
}) => {
  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState(product?.price);
  const [stock, setStock] = useState(product?.stock);

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

      alert("Cập nhật thông tin sản phẩm thành công!");
    }
    location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-semibold">Cập nhật sản phẩm</h2>
        </DialogHeader>

        <div className="space-y-4">
          <h3 className="text-base font-semibold m-2">Tên sản phẩm</h3>
          <Input
            placeholder="Tên sản phẩm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h3 className="text-base font-semibold m-2">Giá</h3>
          <Input
            type="number"
            placeholder="Giá"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <h3 className="text-base font-semibold m-2">Tồn kho</h3>
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

export default ProductUpdateForm;
