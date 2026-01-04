import { createClient } from "@/utils/supabase/client";

const getBrandList = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("brands").select("name");

  if (error) {
    console.log("Error get brand list: ", error);

    return [];
  }

  const result = data.map((e) => e.name);

  return result;
};

export { getBrandList };
