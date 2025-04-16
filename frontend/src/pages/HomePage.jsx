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

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header */}
      
      <Header/>

      <main className="w-full">
        {/* Hero Section */}
        <HeroSection/>

        <CarouselSection/>

        {/* Best Sellers Section */}
        <BestSellerSection/>

        {/* Transformation Section */}
        <TransformationSection/>

        {/* Green CTA Section */}
        <BreakSection/>
        
        {/* Testimonials Section */}
        <TestimoniSection/>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default HomePage

