import { IProductImage } from "@/interfaces";
import { createClient } from "@/utils/supabase/client";

const getProductsHome = async (): Promise<IProductImage[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("product_images")
    .select(`*, products (*)`)
    .limit(12);

  if (error) {
    console.log("Error get product: ", error);

    return [];
  }

  return (data as IProductImage[]) || [];
};

export { getProductsHome };
