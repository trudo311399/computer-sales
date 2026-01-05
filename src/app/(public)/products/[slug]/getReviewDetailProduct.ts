import { createClient } from "@/utils/supabase/client";

const getReviewDetailProduct = async ({ slug }: { slug: string }) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select(
      "id, product_id, users (id, email, password_hash, full_name, phone, role), rating, comment"
    )
    .eq("product_id", slug);

  if (error) {
    console.log("Error get review detail products: ", error);

    return [];
  }

  const resultReviewList = data;

  return { resultReviewList };
};

export { getReviewDetailProduct };
