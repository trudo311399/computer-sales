import { createClient } from "@/utils/supabase/client";

const getCategoryList = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("categories").select("name");

  if (error) {
    console.log("Error get categories list: ", error);

    return [];
  }

  const result = data.map((e) => e.name);

  return result;
};

export { getCategoryList };
