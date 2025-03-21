import React from 'react'
import { Button } from './ui/button'

const BestSellerSection = () => {
  return (
    <section className="py-12 md:py-20 w-full bg-gray-50">
          <div className="grid px-8">
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
  )
}

export default BestSellerSection