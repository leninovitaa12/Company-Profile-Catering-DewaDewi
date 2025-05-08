"use client"

import { useState, useEffect } from "react"
import "./HeroSection.css"

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const carouselImages = [
    {
      url: "https://asset.kompas.com/crops/GZKGclL9N-Dv7wO6JWi8l7udJME=/179x0:1080x601/750x500/data/photo/2019/06/21/3717931935.jpg",
      title: "Hidangan Berkualitas, Pengalaman Tak Terlupakan",
      description:
        "Kami menyediakan layanan katering premium dengan bahan-bahan segar dan organik untuk berbagai acara spesial Anda",
    },
    {
      url: "https://img.freepik.com/free-photo/deep-fried-fish-ball-dark-surface_1150-43602.jpg?t=st=1744357927~exp=1744361527~hmac=a4b7deb9cc972c7a051ddb4a271cf67bb82d754db60eccd19793d55b9a980466&w=1380",
      title: "Menu Spesial untuk Acara Spesial",
      description: "Nikmati berbagai pilihan menu premium yang disiapkan oleh chef profesional kami",
    },
    {
      url: "https://img.freepik.com/free-photo/front-view-tasy-little-dumplings-with-flour-dark-gray-surface_179666-44203.jpg?t=st=1744358624~exp=1744362224~hmac=755ff9f3b75ad275f2f1f6800ea6054bc743166442e8fdd5ff917b70c3fefb81&w=1380",
      title: "Catering untuk Segala Acara",
      description: "Dari pernikahan hingga acara kantor, kami siap melayani kebutuhan katering Anda",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [carouselImages.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section id="home" className="hero-section">
      <div className="carousel-container">
        {carouselImages.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.url})` }}
          >
            <div className="overlay"></div>
            <div className="container hero-container">
              <div className="hero-content">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <div className="hero-buttons">
                  <a href="#menu" className="btn">
                    Lihat Menu
                  </a>
                  <a href="#contact" className="btn btn-outline">
                    Hubungi Kami
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="carousel-indicators">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
