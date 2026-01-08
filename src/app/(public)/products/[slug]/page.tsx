import { notFound } from "next/navigation";
import { getDetailProduct } from "./getDetailProduct";
import { getReviewDetailProduct } from "./getReviewDetailProduct";
import ProductGallery from "@/components/user/product/ProductGallery";
import ProductInfo from "@/components/user/product/ProductInfo";
import ProductReviews from "@/components/user/product/ProductReviews";

const DetailProductPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const resultDetail = await getDetailProduct({ slug });
  const resultReview = await getReviewDetailProduct({ slug });

  //   const avgRating =
  //     resultReview.reduce((sum, e) => sum + e.rating, 0) /
  //     (resultReview.length || 1);

  if (!resultDetail) notFound();

  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 py-8 md:grid-cols-2">
      <ProductGallery
        url={resultDetail.url}
        alt_text={resultDetail.alt_text || ""}
      />

      <ProductInfo
        name={resultDetail.products[0]?.name || ""}
        description={resultDetail.products[0]?.description || ""}
        brands={resultDetail.products[0]?.brands}
        categories={resultDetail.products[0]?.categories}
        price={resultDetail.products[0]?.price || 0}
        discountPrice={resultDetail.products[0]?.discount_price || 0}
        stock={resultDetail.products[0]?.stock || 0}
        specs={resultDetail.products[0]?.specs as Record<string, string>}
      />

      <div className="md:col-span-2">
        <ProductReviews reviewList={resultReview} />
      </div>
    </div>
  );
};

export default DetailProductPage;
