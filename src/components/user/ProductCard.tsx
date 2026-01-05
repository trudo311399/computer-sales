import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IProductImage } from "@/interfaces";

const ProductCard = ({
  id,
  product_id,
  products,
  url,
  alt_text,
}: IProductImage) => {
  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-card">
      <CardHeader className="p-0 relative aspect-square bg-muted/20">
        {/* Badge giảm giá hoặc Mới */}
        {products.discount_price && (
          <Badge className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600">
            -
            {Math.floor(100 - (products.discount_price * 100) / products.price)}
            %
          </Badge>
        )}

        {/* Ảnh sản phẩm với hiệu ứng zoom nhẹ khi hover */}
        <div className="relative w-full h-full flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500">
          <Image
            src={url}
            alt={alt_text || ""}
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4 h-1/3">
        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors h-1/4">
          {products.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2 h-1/4">
          {products.description}
        </p>

        {/* Thông số kỹ thuật tóm tắt */}
        <div className="flex flex-wrap gap-2 mb-4 text-xs text-muted-foreground h-1/4">
          {products.specs.CPU && products.specs.RAM && products.specs.SSD && (
            <>
              <span className="bg-secondary px-2 py-1 rounded">
                CPU {products.specs.CPU}
              </span>
              <span className="bg-secondary px-2 py-1 rounded">
                RAM {products.specs.RAM}
              </span>
              <span className="bg-secondary px-2 py-1 rounded">
                SSD {products.specs.SSD}
              </span>
            </>
          )}
        </div>

        <div className="flex items-baseline gap-2 h-1/4">
          {products.discount_price ? (
            <>
              <span className="font-bold text-xl">
                {products.discount_price.toLocaleString("de-DE")}₫
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {products.price.toLocaleString("de-DE")}₫
              </span>
            </>
          ) : (
            <span className="font-bold text-xl">
              {products.price.toLocaleString("de-DE")}₫
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full font-semibold">Thêm vào giỏ</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
