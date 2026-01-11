// import { createClient } from "@/utils/supabase/client";
// import { redirect } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
//   const supabase = createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) redirect("/login");

//   const {
//     data: { result },
//   } = await supabase.from("users").select("role").eq("id", user.id).single();

//   if (result.role !== "admin") redirect("/");

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-muted p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
