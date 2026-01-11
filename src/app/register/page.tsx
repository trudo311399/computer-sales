"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    try {
      // tạo profile mặc định role = customer
      await supabase.from("users").insert({
        id: data.user?.id,
        role: "customer",
      });
    } catch (error) {
      console.log(error);
    }

    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-2">
          <UserPlus className="h-8 w-8" />
          <h1 className="text-xl font-semibold">Đăng ký</h1>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            className="w-full gap-2"
            onClick={handleRegister}
            disabled={loading}
          >
            <UserPlus className="h-4 w-4" />
            Đăng ký
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
