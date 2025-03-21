import {  Check} from "lucide-react"
import { Button } from "../components/ui/button"
import Footer from "../components/Footer"
import Header from "../components/Header"
import CarouselSection from "../components/CarouselSection"
import HeroSection from "../components/HeroSection"
import BestSellerSection from "../components/BestSellerSection"
import TransformationSection from "../components/TransformationSection"

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

        {/* Sustainable Nutrition Program */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="container space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Sustainable Nutrition Program</h2>
              <p className="text-muted-foreground">Achieve your health goals with our comprehensive approach</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="relative overflow-hidden rounded-lg">
                  <div className="aspect-square relative">
                    <img
                      src={`https://placehold.co/300x300`}
                      alt={`Healthy meal ${item}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center pt-4">
              <Button size="lg" className="bg-[#606c38] hover:bg-[#4f5a2f]">
                Join Now
              </Button>
            </div>
          </div>
        </section>

        {/* Green CTA Section */}
        <section className="py-12 md:py-16 bg-[#606c38] text-white">
          <div className="container text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Di madiun? bingung mau jajan apa?</h2>
            <p className="max-w-2xl mx-auto">
              Join thousands of others who have transformed their lives with our whole food nutrition approach.
            </p>
            <Button variant="outline" className="mt-4 border-white text-white hover:bg-white hover:text-[#606c38]">
              Learn More
            </Button>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">$45/Mo</h2>
                <p className="text-xl">Semua bisa dipesan melalui admin</p>
                <ul className="space-y-2">
                  {[
                    "Personalized meal plans",
                    "Weekly coaching sessions",
                    "Access to exclusive recipes",
                    "Progress tracking tools",
                    "Community support",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[#606c38]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="mt-4 bg-[#606c38] hover:bg-[#4f5a2f]">
                  Get Started
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="relative overflow-hidden rounded-lg">
                    <div className="aspect-square relative">
                      <img
                        src={`https://placehold.co/200x200`}
                        alt={`Nutrition image ${item}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="container space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Sustainable Living</h2>
              <p className="text-muted-foreground">Pesan semakin mudah</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="relative overflow-hidden rounded-lg">
                  <div className="aspect-square relative">
                    <img
                      src={`https://placehold.co/300x300`}
                      alt={`Sustainable living ${item}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default HomePage

