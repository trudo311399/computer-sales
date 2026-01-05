import { createClient } from "@/utils/supabase/client";

const getDetailProduct = async ({ slug }: { slug: string }) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("product_images")
    .select(
      `
        id, product_id, url, alt_text, 
        products (id, name, description, price, discount_price, stock, specs, 
            categories (id, name), 
            brands (id, name)
        )
    `
    )
    .eq("product_id", slug)
    .single();

  if (error) {
    console.log("Error get detail product: ", error);

    return [];
  }

  const resultDetailProduct = data;

  return { resultDetailProduct };
};

export { getDetailProduct };
