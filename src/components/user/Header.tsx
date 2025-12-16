import { Search, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 font-bold text-xl"
        >
          <span className="text-primary">TECH</span>STORE
        </Link>

        {/* Search Bar Minimalist */}
        <div className="hidden md:flex items-center border rounded-full px-4 py-1.5 bg-muted/50 hover:bg-muted transition-colors w-1/3">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <input
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
            placeholder="Tìm kiếm RTX 4090, MacBook Pro..."
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Giỏ hàng</span>
          </Button>
          <Button>Đăng nhập</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
