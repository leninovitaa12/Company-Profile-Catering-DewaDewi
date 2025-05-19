"use client";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import BestSellerSection from "../components/BestSellerSection";
import TestimoniSection from "../components/testimoniSection";
import BreakSection from "../components/BreakSection";
import useProfile from "../hook/useGetProfil";
import CaraPesanSection from "../components/CaraPesanSection";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FeaturedMenu from "../components/FeaturedMenu";
import AboutSection from "../components/AboutSection";

function HomePage() {
  const { profile, loading, error, fetchProfile } = useProfile();
  const [nohp, setNohp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [about, setAbout] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [imagePreview3, setImagePreview3] = useState(null);

  useEffect(() => {
    fetchProfile(); // Panggil fetchProfile hanya sekali saat komponen pertama kali dimuat
  }, []); // Pastikan array dependensi kosong agar hanya sekali dipanggil

  useEffect(() => {
    if (profile) {
      setNohp(profile.nohp);
      setAlamat(profile.alamat);
      setAbout(profile.about);
      setImagePreview(profile.image);
      setImagePreview1(profile.image1);
      setImagePreview2(profile.image2);
      setImagePreview3(profile.image3);
    }
  }, [profile]);

  // Menangani kondisi loading dan error
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Log untuk debugging
  console.log("Image Preview in HomePage:", imagePreview);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar nohp={nohp} />

      {/* Hero Section */}
      <HeroSection
        about={about}
        image={imagePreview}
        image1={imagePreview1}
        image2={imagePreview2}
        image3={imagePreview3}
        nohp={nohp}
      />

      {/* About */}

      <main className="w-full">
        {/* <CarouselSection /> */}
        <AboutSection image={imagePreview} about={about} />

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
      <Footer alamat={alamat} nohp={nohp} />
    </div>
  );
}

export default HomePage;
