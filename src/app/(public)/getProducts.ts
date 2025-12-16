import { cookies } from "next/headers";
import { IProductImage } from "@/interfaces";
import { createClient } from "@/utils/supabase/server";

const getProducts = async (): Promise<IProductImage[]> => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("product_images")
    .select(`*, products (*)`).limit(12);

  if (error) {
    console.log("Error get product: ", error);

    return [];
  }

  return (data as IProductImage[]) || [];
};

export { getProducts };
