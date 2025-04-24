import {  Check} from "lucide-react"
import { Button } from "../components/ui/button"
import Footer from "../components/Footer"
import Header from "../components/Header"
import CarouselSection from "../components/CarouselSection"
import HeroSection from "../components/HeroSection"
import BestSellerSection from "../components/BestSellerSection"
import TransformationSection from "../components/AboutSection"
import TestimoniSection from "../components/testimoniSection"
import BreakSection from "../components/BreakSection"
import useProfile from "../hook/useGetProfil"
import { useEffect, useState } from "react"

function HomePage() {
  const { profile, loading, error, fetchProfile } = useProfile();
  const [nohp, setNohp] = useState("")
  const [alamat, setAlamat] = useState("")
  const [about, setAbout] = useState("")
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    fetchProfile();  // Panggil fetchProfile hanya sekali saat komponen pertama kali dimuat
  }, []); // Pastikan array dependensi kosong agar hanya sekali dipanggil

  useEffect(() => {
    if (profile) {
      setNohp(profile.nohp);
      setAlamat(profile.alamat);
      setAbout(profile.about);
      setImagePreview(profile.image);
    }
  }, [profile]);

  // Menangani kondisi loading dan error
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(imagePreview);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header */}
      
      <Header/>

      <main className="w-full">
        {/* Hero Section */}
        <HeroSection about={about} image={imagePreview} />

        <CarouselSection/>

        {/* Best Sellers Section */}
        <BestSellerSection/>

        {/* Transformation Section */}
        <TransformationSection/>

        {/* Green CTA Section */}
        <BreakSection alamat={alamat} nohp={nohp}/>
        
        {/* Testimonials Section */}
        <TestimoniSection/>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default HomePage

