import { Loader2, Monitor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4">
      {/* Animated icon */}
      <div className="flex items-center gap-3 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-sm">Đang tải dữ liệu...</span>
      </div>

      {/* Skeleton product cards */}
      <div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="space-y-4 p-4">
              <div className="flex h-36 items-center justify-center rounded-md bg-muted">
                <Monitor className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-4 w-1/2 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Loading;
