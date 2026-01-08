import { IDetailProduct } from "@/interfaces";
import { createClient } from "@/utils/supabase/client";

const getDetailProduct = async ({
  slug,
}: {
  slug: string;
}): Promise<IDetailProduct | null | undefined> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("product_images")
    .select(
      `
        id, product_id, url, alt_text, 
        products (name, description, price, discount_price, stock, specs, 
            categories (name), 
            brands (name)
        )
    `
    )
    .eq("product_id", slug)
    .single();

  if (error) {
    console.log("Error get detail product: ", error);

    return;
  }

  const resultDetailProduct = data;

  return resultDetailProduct as IDetailProduct;
};

export { getDetailProduct };
