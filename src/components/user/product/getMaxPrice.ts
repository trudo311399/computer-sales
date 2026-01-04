import { createClient } from "@/utils/supabase/client";

const getMaxPrice = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select("price")
    .order("price", { ascending: false })
    .limit(1);

  if (error) {
    console.log("Error get max price list: ", error);

    return [];
  }

  const maxPrice = data.map((e) => e.price);

  return maxPrice[0];
};

export { getMaxPrice };
