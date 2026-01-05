import { createClient } from "@/utils/supabase/client";

const getMinPrice = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select("discount_price")
    .order("discount_price", { ascending: true })
    .limit(1);

  if (error) {
    console.log("Error get min price list: ", error);

    return [];
  }

  const minPrice = data.map((e) => e.discount_price);

  return minPrice[0];
};

export { getMinPrice };
