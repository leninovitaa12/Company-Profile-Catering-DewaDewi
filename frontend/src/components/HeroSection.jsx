"use client";

import { useState, useEffect } from "react";

const HeroSection = ({ nohp, image1, image2, image3 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    {
      url: image1,
      title: "Hidangan Berkualitas, Pengalaman Tak Terlupakan",
      description:
        "Kami menyediakan layanan katering premium dengan bahan-bahan segar dan organik untuk berbagai acara spesial Anda",
    },
    {
      url: image2,
      title: "Menu Spesial untuk Acara Spesial",
      description:
        "Nikmati berbagai pilihan menu premium yang disiapkan oleh katering kami",
    },
    {
      url: image3,
      title: "Catering untuk Segala Acara",
      description:
        "Dari pernikahan hingga acara kantor, kami siap melayani kebutuhan katering Anda",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] overflow-hidden"
    >
      <div className="absolute inset-0">
        {carouselImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
            style={{ backgroundImage: `url(${slide.url})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20"></div>
          </div>
        ))}
      </div>

      <div className="relative z-30 flex h-full items-center px-6 lg:px-20">
        <div className="max-w-2xl text-white animate-fadeIn">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {carouselImages[currentSlide].title}
          </h1>
          <p className="text-lg lg:text-xl mb-8 text-white/90">
            {carouselImages[currentSlide].description}
          </p>
          <div className="flex flex-wrap gap-4">
            {/* <a
              href="#menu"
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-md font-semibold text-sm uppercase tracking-wide transition-transform hover:-translate-y-1 shadow"
            >
              Lihat Menu
            </a> */}
            <a
              href={`https://api.whatsapp.com/send?phone=62${nohp}`}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-md font-semibold text-sm uppercase tracking-wide transition-transform hover:-translate-y-1 shadow"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-40">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;