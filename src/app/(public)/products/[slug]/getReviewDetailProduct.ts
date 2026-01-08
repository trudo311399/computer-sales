import { IReview } from "@/interfaces";
import { createClient } from "@/utils/supabase/client";

const getReviewDetailProduct = async ({
  slug,
}: {
  slug: string;
}): Promise<IReview[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select("id, product_id, users (full_name), rating, comment")
    .eq("product_id", slug);

  if (error) {
    console.log("Error get review detail products: ", error);

    return [];
  }

  const resultReviewList = data;

  return (resultReviewList as IReview[]) || [];
};

export { getReviewDetailProduct };
