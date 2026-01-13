"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { LogIn } from "lucide-react";
import { comparePassword } from "@/utils/auth/comparePassword";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);

    const supabase = createClient();

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      setError(error.message);
      return;
    }

    const role = user.role;
    const hash = user.password_hash;

    const isComparePassword = await comparePassword(password, hash);

    if (!isComparePassword) {
      alert("Đăng nhập thất bại!");
    }

    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-2">
          <LogIn className="h-8 w-8" />
          <h1 className="text-xl font-semibold">Đăng nhập</h1>
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

          <Button className="w-full gap-2" onClick={handleLogin}>
            <LogIn className="h-4 w-4" />
            Đăng nhập
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
