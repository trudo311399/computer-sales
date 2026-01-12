import StatCard from "@/components/admin/StatCard";
import { createClient } from "@/utils/supabase/client";
import { Package, ShoppingCart, TicketPercent, Users } from "lucide-react";
// import { redirect } from "next/navigation";

const AdminDashboardPage = async () => {
  const supabase = createClient();

  const [
    { count: productCount },
    { count: userCount },
    { count: orderCount },
    { count: couponCount },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("coupons").select("*", { count: "exact", head: true }),
  ]);

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) redirect("/login");

  // const { data: profile } = await supabase
  //   .from("profiles")
  //   .select("role")
  //   .eq("id", user.id)
  //   .single();

  // if (profile?.role !== "admin") redirect("/");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Sản phẩm" value={productCount || 0} icon={Package} />
        <StatCard title="Người dùng" value={userCount || 0} icon={Users} />
        <StatCard
          title="Đơn hàng"
          value={orderCount || 0}
          icon={ShoppingCart}
        />
        <StatCard
          title="Mã giảm giá"
          value={couponCount || 0}
          icon={TicketPercent}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
