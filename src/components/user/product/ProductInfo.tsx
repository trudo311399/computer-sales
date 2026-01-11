import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IProductInfo } from "@/interfaces";
import { ShoppingCart, Star } from "lucide-react";

const ProductInfo = ({
  name,
  description,
  brands,
  categories,
  price,
  discountPrice,
  stock,
  specs,
}: IProductInfo) => {

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{name}</h1>

      {/* Rating */}
      {/* <div className="flex items-center gap-1 text-yellow-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.round(avgRating) ? "fill-yellow-500" : ""
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          ({avgRating.toFixed(1)})
        </span>
      </div> */}

      {/* Price */}
      <div className="flex items-center gap-3">
        {discountPrice ? (
          <>
            <span className="text-3xl font-bold text-destructive">
              {discountPrice.toLocaleString()}₫
            </span>
            <span className="text-muted-foreground line-through">
              {price.toLocaleString()}₫
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold">{price.toLocaleString()}₫</span>
        )}
      </div>

      {/* Stock */}
      <Badge variant={stock > 0 ? "default" : "destructive"}>
        {stock > 0 ? "Còn hàng" : "Hết hàng"}
      </Badge>

      {/* Brand */}
      <p className="text-muted-foreground">{brands?.name}</p>

      {/* Category */}
      <p className="text-muted-foreground">{categories?.name}</p>

      {/* Description */}
      <p className="text-muted-foreground">{description}</p>

      {/* Spec */}
      {specs["CPU"] && (
        <p className="text-muted-foreground">CPU: {specs["CPU"]}</p>
      )}
      {specs["Màn hình"] && (
        <p className="text-muted-foreground">Màn hình: {specs["Màn hình"]}</p>
      )}
      {specs["RAM"] && (
        <p className="text-muted-foreground">RAM: {specs["RAM"]}</p>
      )}
      {specs["SSD"] && (
        <p className="text-muted-foreground">SSD: {specs["SSD"]}</p>
      )}

      {/* CTA */}
      <Button size="lg" className="gap-2" disabled={stock <= 0}>
        <ShoppingCart className="h-5 w-5" />
        Thêm vào giỏ hàng
      </Button>
    </div>
  );
};

export default ProductInfo;
