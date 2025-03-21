import React from 'react'
import { Button } from './ui/button'

const BreakSection = () => {
  return (
    <section className="py-12 md:py-16 bg-[#606c38] text-white">
          <div className="contact text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Di madiun? bingung mau jajan apa?</h2>
            <p className="max-w-2xl mx-auto">
              Join thousands of others who have transformed their lives with our whole food nutrition approach.
            </p>
            <Button variant="outline" className="mt-4 border-white text-[#606c38] hover:bg-white hover:text-[#606c38]">
              pesan Disini
            </Button>
          </div>
        </section>
  )
}

export default BreakSection