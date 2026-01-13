"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import ProductUpdateForm from "./ProductUpdateForm";
import ProductCreateForm from "./ProductCreateForm";
import ProductSearch from "./ProductSearch";
import { IAdminProductTable } from "@/interfaces";
import { createClient } from "@/utils/supabase/client";

const ProductTable = ({
  initialProducts,
}: {
  initialProducts: IAdminProductTable[];
}) => {
  const [products, setProducts] =
    useState<IAdminProductTable[]>(initialProducts);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [editing, setEditing] = useState<IAdminProductTable | null>(null);
  const [search, setSearch] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (products.length === 0 && initialProducts.length > 0) {
      setProducts(initialProducts);
    }
  }, [initialProducts, products.length]);

  const handleSearch = async () => {
    if (!search) {
      setProducts(initialProducts);
      return;
    }

    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("id, name, price, stock, created_at")
      .ilike("name", `%${search}%`);

    setProducts([...(data ?? [])]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) return;

    const supabase = await createClient();
    await supabase.from("products").delete().eq("id", id);

    const { data } = await supabase
      .from("products")
      .select("id, name, price, stock, created_at")
      .order("created_at", { ascending: false });
    setProducts([...(data ?? [])]);

    alert("Xóa sản phẩm thành công!");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <ProductSearch setSearch={setSearch} handleSearch={handleSearch} />

        <Button onClick={() => setOpenAdd(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Thêm sản phẩm
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Tồn kho</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.price.toLocaleString()}₫</TableCell>
              <TableCell>{p.stock}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setEditing(p);
                    setOpenUpdate(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(p.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ProductUpdateForm
        open={openUpdate}
        product={editing}
        onClose={() => {
          setOpenUpdate(false);
          setEditing(null);
        }}
      />

      <ProductCreateForm
        open={openAdd}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        onClose={() => {
          setOpenAdd(false);
          setImageUrl("");
        }}
      />
    </div>
  );
};

export default ProductTable;
