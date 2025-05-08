"use client"

import { useState, useEffect } from "react"
import "./HeroSection.css"

// HeroSection menerima prop image dan about sesuai dengan kode asli Anda
const HeroSection = ({ about, image }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Jika image adalah array, gunakan itu. Jika string tunggal, buat array dengan satu item
  const carouselImages = Array.isArray(image) ? image : [image]

  useEffect(() => {
    // Hanya jalankan carousel jika ada lebih dari 1 gambar
    if (carouselImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1))
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [carouselImages.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // Jika tidak ada gambar atau gambar undefined/null, tampilkan placeholder
  if (!image) {
    return (
      <section id="home" className="hero-section relative mx-auto">
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
          <img
            src="/placeholder.svg?height=800&width=1600"
            alt="DewaDewi Catering"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Konten hero di atas gambar */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-8">
              <div className="max-w-[600px] text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Hidangan Berkualitas, Pengalaman Tak Terlupakan</h1>
                <p className="text-lg mb-8">
                  {about ||
                    "Kami menyediakan layanan katering premium dengan bahan-bahan segar dan organik untuk berbagai acara spesial Anda"}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#menu"
                    className="bg-[var(--primary-color)] hover:bg-[#d36b00] text-white px-6 py-3 rounded-md transition-all"
                  >
                    Lihat Menu
                  </a>
                  <a
                    href="#contact"
                    className="border-2 border-white text-white hover:bg-white hover:text-[var(--primary-color)] px-6 py-3 rounded-md transition-all"
                  >
                    Hubungi Kami
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Log untuk debugging
  console.log("Image in HeroSection:", image)

  return (
    <section id="home" className="hero-section relative mx-auto">
      <div className="carousel-container">
        {carouselImages.map((img, index) => (
          <div key={index} className={`carousel-slide ${index === currentSlide ? "active" : ""}`}>
            <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
              {/* Gambar */}
              <img
                src={img || "/placeholder.svg"}
                alt={`DewaDewi Catering Slide ${index + 1}`}
                className="object-cover w-full h-full"
                onError={(e) => {
                  console.error("Image failed to load:", img)
                  e.target.src = "/placeholder.svg?height=800&width=1600" // Fallback image
                }}
              />
              {/* Overlay untuk meningkatkan keterbacaan teks */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>

            {/* Konten hero di atas gambar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto px-8">
                <div className="max-w-[600px] text-white">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Hidangan Berkualitas, Pengalaman Tak Terlupakan
                  </h1>
                  <p className="text-lg mb-8">
                    {about ||
                      "Kami menyediakan layanan katering premium dengan bahan-bahan segar dan organik untuk berbagai acara spesial Anda"}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#menu"
                      className="bg-[var(--primary-color)] hover:bg-[#d36b00] text-white px-6 py-3 rounded-md transition-all"
                    >
                      Lihat Menu
                    </a>
                    <a
                      href="#contact"
                      className="border-2 border-white text-white hover:bg-white hover:text-[var(--primary-color)] px-6 py-3 rounded-md transition-all"
                    >
                      Hubungi Kami
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Indikator carousel hanya ditampilkan jika ada lebih dari 1 gambar */}
        {carouselImages.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"}`}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default HeroSection
