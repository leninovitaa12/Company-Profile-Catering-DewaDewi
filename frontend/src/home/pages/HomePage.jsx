import { Link } from "react-router-dom"
import { ArrowRight, Check, Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "../components/ui/button"

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-bold text-xl">
              SAKURA
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link to="#" className="text-sm font-medium">
                Home
              </Link>
              <Link to="#" className="text-sm font-medium">
                Products
              </Link>
              <Link to="#" className="text-sm font-medium">
                Programs
              </Link>
              <Link to="#" className="text-sm font-medium">
                About
              </Link>
              <Link to="#" className="text-sm font-medium">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-sm font-medium hidden md:block">
              My Account
            </Link>
            <Button variant="outline" size="sm" className="hidden md:flex">
              Sign In
            </Button>
            <Button size="sm">Shop Now</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="container grid md:grid-cols-2 gap-6 py-12 md:py-20">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#606c38]">CATERING DEWADEWI</h1>
              <p className="text-lg text-muted-foreground max-w-[600px]">
                Discover the power of whole food nutrition with our premium supplements and programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" className="bg-[#606c38] hover:bg-[#4f5a2f]">
                  Shop Now
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px]">
              <img
                src="https://placehold.co/500x400"
                alt="Woman with healthy food"
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="container space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Best Seller Supplements</h2>
              <p className="text-muted-foreground">Our most popular products for your health journey</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                >
                  <div className="aspect-square relative">
                    <img
                      src={`https://placehold.co/300x300`}
                      alt={`Supplement ${item}`}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">Premium Supplement {item}</h3>
                    <p className="text-sm text-muted-foreground">Natural ingredients</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-bold">$29.99</span>
                      <Button variant="ghost" size="sm">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transformation Section */}
        <section className="py-12 md:py-20">
          <div className="container space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Start Your Transformation</h2>
              <p className="text-muted-foreground">Personalized nutrition plans for your health goals</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Meal Plans", image: "https://placehold.co/300x300" },
                { title: "Nutrition Coaching", image: "https://placehold.co/300x300" },
                { title: "Premium Supplements", image: "https://placehold.co/300x300" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                >
                  <div className="aspect-square relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">Customized for your needs</p>
                    <Button variant="link" className="mt-2 p-0 h-auto" size="sm">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
      <footer className="border-t bg-background">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="font-bold">CATERING DEDE</h3>
              <p className="text-sm text-muted-foreground">Menerima Pesanan dan Catering</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#">Cara Pesan</a>
                </li>
                <li>
                  <a href="#">Menu</a>
                </li>
                <li>
                  <a href="#">Programs</a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold">Connect</h3>
              <div className="flex space-x-3">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
              <div className="pt-2">
                <a href="#" className="text-sm">
                  Download our app
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 CATERING DEDE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage

