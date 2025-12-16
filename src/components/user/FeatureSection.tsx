import { ShieldCheck, Truck, CreditCard, Headset } from "lucide-react";

const features = [
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: "Miễn phí vận chuyển",
    desc: "Cho đơn hàng trên 5 triệu",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Bảo hành chính hãng",
    desc: "Cam kết 100% hàng thật",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-primary" />,
    title: "Trả góp 0%",
    desc: "Thủ tục nhanh gọn",
  },
  {
    icon: <Headset className="h-8 w-8 text-primary" />,
    title: "Hỗ trợ 24/7",
    desc: "Kỹ thuật viên chuyên nghiệp",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-10 border-b bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center md:flex-row md:text-left gap-4 p-4 hover:bg-background rounded-lg transition-colors"
            >
              <div className="p-3 bg-primary/10 rounded-full">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-base">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { FeatureSection };
