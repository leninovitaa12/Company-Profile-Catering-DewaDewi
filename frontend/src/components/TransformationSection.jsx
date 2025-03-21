import React from 'react'
import { ArrowRight} from "lucide-react"
import { Button } from './ui/button'

const TransformationSection = () => {
  return (
    <section className="py-12 md:py-20">
              <div className="grid px-8">
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
  )
}

export default TransformationSection