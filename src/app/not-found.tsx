import Link from "next/link";
import { SearchX, Home, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
          {/* Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <SearchX className="h-10 w-10 text-muted-foreground animate-pulse" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold">Không tìm thấy trang</h1>

          {/* Description */}
          <p className="text-sm text-muted-foreground">
            Trang bạn đang tìm không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra
            lại đường dẫn.
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <Button asChild className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Trang chủ
              </Link>
            </Button>

            <Button variant="outline" asChild className="gap-2">
              <Link href="javascript:history.back()">
                <ArrowLeft className="h-4 w-4" />
                Quay lại
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
