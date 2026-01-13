import { createClient } from "@/utils/supabase/client";
import { UploadCloud } from "lucide-react";

const ProductImageUpload = ({
  onUploaded,
}: {
  onUploaded: (url: string) => void;
}) => {
  const handleUpload = async (file: File) => {
    try {
      if (!file) {
        throw new Error("Bạn phải chọn một hình ảnh để tải lên.");
      }

      const fileName = `${Date.now()}-${file.name}`;

      const supabase = await createClient();
      const { data: image, error: uploadError } = await supabase.storage
        .from("upload_image_computer_sales")
        .upload(fileName, file);

      console.log(fileName);
      if (uploadError) {
        throw uploadError;
      }

      if (image) {
        console.log(image);
      }

      const { data: imgUrl } = await supabase.storage
        .from("upload_image_computer_sales")
        .getPublicUrl(fileName);

      if (imgUrl) {
        onUploaded(imgUrl.publicUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed p-6">
      <UploadCloud className="h-6 w-6 text-muted-foreground" />
      <span className="text-sm">Chọn hình ảnh sản phẩm</span>

      <input
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
      />
    </label>
  );
};

export default ProductImageUpload;
