"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ProductGallery = ({
  url,
  alt_text,
}: {
  url: string;
  alt_text: string;
}) => {
  const [active, setActive] = useState(url);

  return (
    <div className="space-y-4">
      <div className="relative h-80 w-full rounded-lg border bg-white">
        <Image
          src={active || "/images/example-computer.png"}
          alt={alt_text || "Product image"}
          fill
          className="object-contain p-6"
        />
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => setActive(url)}
          className={`relative h-16 w-16 rounded border ${
            active === url ? "ring-2 ring-primary" : ""
          }`}
        >
          <Image
            src={url || "/images/example-computer.png"}
            alt=""
            fill
            className="object-contain p-2"
          />
        </Button>
      </div>
    </div>
  );
};

export default ProductGallery;
