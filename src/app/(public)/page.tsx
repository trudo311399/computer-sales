import { getProducts } from "./getProducts";
import Header from "@/components/user/Header";
import { HeroSection } from "@/components/user/HeroSection";
import { FeatureSection } from "@/components/user/FeatureSection";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/user/ProductCard";

const ProductListPage = async () => {
  const productList = await getProducts();

  // Mock data danh mục
  const categories = [
    { title: "Laptop Gaming", image: "/images/latop.png" },
    { title: "MacBook", image: "/images/macbook.png" },
    { title: "Workstation", image: "/images/workstation.png" },
    { title: "Phụ kiện", image: "/images/phukien.png" },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* 1. Hero Banner */}
      <HeroSection />

      {/* 2. Cam kết dịch vụ */}
      <FeatureSection />

      {/* 3. Danh mục nổi bật */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6 tracking-tight">
          Danh mục hàng đầu
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group relative overflow-hidden rounded-xl bg-muted aspect-[2/1] flex items-center justify-center cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
              <span className="relative z-20 font-bold text-white text-xl group-hover:scale-110 transition-transform">
                {cat.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Separator className="container mx-auto" />

      {/* 4. Sản phẩm bán chạy (Grid Layout) */}
      <section className="container mx-auto py-16 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Sản phẩm Hot 🔥
            </h2>
            <p className="text-muted-foreground mt-1">
              Những cỗ máy chiến game và làm việc mạnh mẽ nhất.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            Xem tất cả
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Render 12 sản phẩm demo */}
          {productList.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              product_id={product.product_id}
              products={product.products}
              url={product.url}
              alt_text={product.alt_text}
            />
          ))}
          {/* {Array.from({ length: 8 }).map((_, i) => (
            <ProductCard key={i} />
          ))} */}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Button variant="outline" className="w-full">
            Xem tất cả sản phẩm
          </Button>
        </div>
      </section>

      {/* 5. Banner phụ (Promo) */}
      <section className="container mx-auto px-4 pb-16">
        <div className="rounded-3xl bg-zinc-900 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="z-10 space-y-4 max-w-lg">
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold">
              Khuyến mãi hè
            </span>
            <h3 className="text-3xl md:text-4xl font-bold">
              Build PC - Nhận quà mê ly
            </h3>
            <p className="text-zinc-400">
              Giảm ngay 2.000.000đ khi build PC Full bộ. Tặng kèm bàn phím cơ và
              chuột gaming.
            </p>
            <Button size="lg" variant="secondary">
              Nhận tư vấn ngay
            </Button>
          </div>
          {/* Decorative circle */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
        </div>
      </section>
    </main>
  );
};

export default ProductListPage;
