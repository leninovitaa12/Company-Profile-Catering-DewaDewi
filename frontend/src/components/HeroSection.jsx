import React from 'react'
import { Button } from './ui/button'
import { Link as ScrollLink } from "react-scroll";

const HeroSection = () => {
  return (
    <section id='home' className="relative mx-auto">
          <div className="grid px-8 md:grid-cols-2 gap-6 py-12 md:py-20">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center text-[#606c38]">CATERING DEWADEWI</h1>
              <p className="text-lg text-muted-foreground text-center max-w-[600px]">
                Discover the power of whole food nutrition with our premium supplements and programs.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 pt-4">
                <ScrollLink smooth={true} spy={true} to={"about"} className="bg-[#606c38] w-fit text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-[#4f5a2f]">
                  About Me
                </ScrollLink>
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
  )
}

export default HeroSection