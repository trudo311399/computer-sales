import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ProductSearch = ({
  setSearch,
  handleSearch,
}: {
  setSearch: (value: string) => void;
  handleSearch: () => void;
}) => {
  return (
    <div className="flex realative max-w-sm">
      <Input
        className="pl-8"
        placeholder="Tìm kiếm theo tên sản phẩm..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button onClick={() => handleSearch()} className="gap-2">
        <Search className="h-4 w-4" />
        Tìm kiếm
      </Button>
    </div>
  );
};

export default ProductSearch;
