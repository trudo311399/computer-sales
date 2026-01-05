"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Eye, PackageX } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IProductCard } from "@/interfaces";

const ProductCard = ({
  id,
  name,
  price,
  discountPrice,
  stock,
  url,
  altText,
  onAddToCart,
}: IProductCard) => {
  const isOutOfStock = stock <= 0;

  return (
    <Card className="group relative overflow-hidden transition-shadow hover:shadow-lg">
      {/* Image */}
      <Link href={`/products/${id}`} className="relative block h-48 w-full">
        <Image
          src={url || "/images/placeholder.png"}
          alt={altText ?? ""}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <CardContent className="space-y-2 p-4">
        {/* Product name */}
        <Link href={`/products/${id}`}>
          <h3 className="line-clamp-2 text-sm font-semibold transition-colors group-hover:text-primary">
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          {discountPrice ? (
            <>
              <span className="text-base font-bold text-destructive">
                {discountPrice.toLocaleString()}₫
              </span>
              <span className="text-xs text-muted-foreground line-through">
                {price.toLocaleString()}₫
              </span>
            </>
          ) : (
            <span className="text-base font-bold">
              {price.toLocaleString()}₫
            </span>
          )}
        </div>

        {/* Stock status */}
        {isOutOfStock && (
          <Badge variant="destructive" className="gap-1">
            <PackageX className="h-3 w-3" />
            Hết hàng
          </Badge>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 p-4 pt-0">
        {/* View detail */}
        <Button variant="outline" size="sm" asChild className="flex-1 gap-2">
          <Link href={`/products/${id}`}>
            <Eye className="h-4 w-4 transition-transform group-hover:scale-110" />
            Xem
          </Link>
        </Button>

        {/* Add to cart */}
        <Button
          size="sm"
          className="flex-1 gap-2"
          disabled={isOutOfStock}
          onClick={onAddToCart}
        >
          <ShoppingCart className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          Mua
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
