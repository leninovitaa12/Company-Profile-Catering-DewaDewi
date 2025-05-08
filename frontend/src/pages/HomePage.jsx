"use client"
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import BestSellerSection from "../components/BestSellerSection"
import TestimoniSection from "../components/testimoniSection"
import BreakSection from "../components/BreakSection"
import useProfile from "../hook/useGetProfil"
import CaraPesanSection from "../components/CaraPesanSection"
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

function HomePage() {
  const { profile, loading, error, fetchProfile } = useProfile()
  const [nohp, setNohp] = useState("")
  const [alamat, setAlamat] = useState("")
  const [about, setAbout] = useState("")
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    fetchProfile() // Panggil fetchProfile hanya sekali saat komponen pertama kali dimuat
  }, []) // Pastikan array dependensi kosong agar hanya sekali dipanggil

  useEffect(() => {
    if (profile) {
      setNohp(profile.nohp)
      setAlamat(profile.alamat)
      setAbout(profile.about)
      setImagePreview(profile.image)
    }
  }, [profile])

  // Menangani kondisi loading dan error
  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  // Log untuk debugging
  console.log("Image Preview in HomePage:", imagePreview)

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />

      {/* Hero Section */}
      <HeroSection about={about} image={imagePreview} />

      {/* Header */}

      {/* <Header /> */}

      <main className="w-full">
        {/* <CarouselSection /> */}

        {/* Best Sellers Section */}
        <BestSellerSection />

        {/* Green CTA Section */}
        <BreakSection alamat={alamat} nohp={nohp} />

        {/* Cara Pesan Section */}
        <CaraPesanSection />

        {/* Testimonials Section */}
        <TestimoniSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default HomePage
