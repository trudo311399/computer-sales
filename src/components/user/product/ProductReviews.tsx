import { Card, CardContent } from "@/components/ui/card";
import { IReview } from "@/interfaces";
import { Star, User } from "lucide-react";

const ProductReviews = ({ reviewList }: { reviewList: IReview[] }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Đánh giá ({reviewList.length})</h2>

      {reviewList.length === 0 && (
        <p className="text-muted-foreground">Chưa có đánh giá nào.</p>
      )}

      {reviewList.map((review) => (
        <Card key={review.id}>
          <CardContent className="space-y-2 p-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {review.user.full_name}
              </span>
            </div>

            <div className="flex text-yellow-500">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-500" />
              ))}
            </div>

            <p className="text-sm">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductReviews;
