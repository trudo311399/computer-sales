import { ISearchParams } from "@/interfaces";
import { createClient } from "@/utils/supabase/client";

const getProducts = async ({
  page,
  search,
  category,
  brand,
  price,
}: ISearchParams) => {
  const PAGE_SIZE = 8;
  const supabase = createClient();

  const pg = page ?? 1;
  const from = (pg - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("product_images")
    .select(
      `
      id,
      url,
      alt_text,
      products (
          id,
          name,
          price,
          discount_price,
          stock,
          created_at,
          categories (name),
          brands (name)
      )
      `,
      { count: "exact" }
    )
    .range(from, to);

  // Search
  if (search) {
    query = query.ilike("products.name", `%${search}%`);
  }

  // Category
  if (category) {   
    query = query.eq("products.categories.name", category);
  }

  // Brand
  if (brand) {
    query = query.eq("products.brands.name", brand);
  }

  // Price
  if (price) {
    query = query.gte("products.price", Number(price[0])).lte("products.price", Number(price[1]));
  }

  const { data, count } = await query;

  const totalPages = Math.ceil((count || 0) / PAGE_SIZE);

  return { data, totalPages, pg };
};

export { getProducts };
