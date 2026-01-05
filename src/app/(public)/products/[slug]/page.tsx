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
      <ProductGallery url={resultDetail.url} alt_text={resultDetail.alt_text} />

      <ProductInfo
        name={resultDetail.resultDetailProduct.products.name}
        description={resultDetail.resultDetailProduct.products.description}
        brands={resultDetail.resultDetailProduct.products.brands}
        categories={resultDetail.resultDetailProduct.products.categories}
        price={resultDetail.resultDetailProduct.products.price}
        discountPrice={resultDetail.resultDetailProduct.products.discount_price}
        stock={resultDetail.resultDetailProduct.products.stock}
        specs={resultDetail.resultDetailProduct.products.specs}
      />

      <div className="md:col-span-2">
        <ProductReviews reviewList={resultReview.resultReviewList} />
      </div>
    </div>
  );
};

export default DetailProductPage;
