"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  TicketPercent,
} from "lucide-react";

const AdminSidebar = () => {
  const pathname = usePathname();

  const menu = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Quản lý sản phẩm", href: "/admin/products", icon: Package },
    { label: "Quản lý người dùng", href: "/admin/users", icon: Users },
    { label: "Quản lý đơn hàng", href: "/admin/orders", icon: ShoppingCart },
    { label: "Mã giảm giá", href: "/admin/coupons", icon: TicketPercent },
  ];

  return (
    <aside className="w-64 border-r bg-background">
      <div className="p-4 text-lg font-bold">ADMIN PANEL</div>

      <nav className="space-y-1 px-2">
        {menu.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition
                ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
