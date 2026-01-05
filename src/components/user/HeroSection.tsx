"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const slides = [
    {
      id: 1,
      title: "MacBook Pro M3 Max",
      desc: "Sức mạnh không tưởng. Hiệu năng vượt trội cho mọi tác vụ đồ họa.",
      bg: "bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900",
      image: "/images/hero-macbook.png", // Bạn cần thay ảnh thật vào đây
    },
    {
      id: 2,
      title: "ROG Strix SCAR 18",
      desc: "Thống trị chiến trường ảo. Màn hình 18 inch Nebula HDR tuyệt đẹp.",
      bg: "bg-gradient-to-r from-black via-red-900 to-black",
      image: "/images/hero-rog.png",
    },
  ];

  return (
    <section className="w-full bg-background py-4">
      <div className="container mx-auto px-4 md:px-6">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div
                  className={`relative overflow-hidden rounded-3xl ${slide.bg} text-white shadow-2xl h-[400px] md:h-[500px] flex items-center`}
                >
                  {/* Content bên trái */}
                  <div className="z-20 w-full md:w-1/2 p-8 md:p-16 space-y-6">
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight animate-in slide-in-from-left duration-500">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 max-w-md">
                      {slide.desc}
                    </p>
                    <div className="flex gap-4 pt-4">
                      <Button
                        size="lg"
                        className="bg-white text-black hover:bg-gray-200 rounded-full font-bold px-8"
                      >
                        Mua ngay
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-black font-bold border-white hover:bg-white/20 rounded-full"
                      >
                        Xem chi tiết <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Hình ảnh bên phải (Giả lập) */}
                  <div className="absolute right-0 bottom-0 w-1/2 h-full hidden md:flex items-end justify-center opacity-90">
                    {/* Placeholder cho ảnh sản phẩm */}
                    <div className="w-[425px] h-[325px] bg-white/10 backdrop-blur-sm rounded-t-xl border border-white/20 flex items-center justify-center">
                      <span className="text-sm font-mono">
                        <Image
                          src={slide.image}
                          alt=""
                          width={350}
                          height={250}
                        />
                      </span>
                    </div>
                  </div>

                  {/* Pattern trang trí nền */}
                  <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/10 border-none hover:bg-white/20 text-white" />
          <CarouselNext className="right-4 bg-white/10 border-none hover:bg-white/20 text-white" />
        </Carousel>
      </div>
    </section>
  );
};

export { HeroSection };
