import React from 'react'
import { Button } from './ui/button'

const ProgramSection = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
          <div className="program px-8">
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
  )
}

export default ProgramSection