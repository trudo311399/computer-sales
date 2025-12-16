"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.log("App Error: ", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
          {/* Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-destructive">Đã xảy ra lỗi 😢</h1>

          {/* Description */}
          <p className="text-sm text-muted-foreground">
            Có lỗi không mong muốn trong quá trình xử lý. Vui lòng thử lại hoặc
            quay về trang chủ.
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={reset} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Thử lại
            </Button>

            <Button variant="outline" asChild className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Trang chủ
              </Link>
            </Button>
          </div>

          {/* Debug info (chỉ hiện khi DEV) */}
          {process.env.NODE_ENV === "development" && (
            <pre className="mt-4 max-h-32 w-full overflow-auto rounded-md bg-black p-3 text-left text-xs text-red-400">
              {error.message}
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Error;
