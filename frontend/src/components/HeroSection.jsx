import React from 'react'
import { Button } from './ui/button'
import { Link as ScrollLink } from "react-scroll";

const HeroSection = ({about, image}) => {
  return (
    <section id='home' className="relative mx-auto">
      <div className="grid px-8 md:grid-cols-2 gap-6 py-12 md:py-20">
        <div className="flex flex-col justify-center space-y-4">
          {/* Warna teks diubah ke --primary-brand */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center text-[var(--primary-brand)]">
            CATERING DEWADEWI
          </h1>
          
          {/* Warna teks muted diubah ke --primary-brand dengan opacity 80% */}
          <p className="text-lg text-[color:var(--primary-brand)] opacity-80 text-center max-w-[600px]">
            {about}
          </p>
          
          <div className="flex flex-col items-center justify-center gap-3 pt-4">
            {/* Warna button diubah ke --secondary-brand dan hover ke --primary-brand */}
            <ScrollLink 
              smooth={true} 
              spy={true} 
              to={"about"} 
              className="bg-[var(--secondary-brand)] w-fit text-[var(--light-brand)] px-5 py-2 rounded-lg cursor-pointer hover:bg-[var(--primary-brand)] transition-colors"
            >
              About Me
            </ScrollLink>
          </div>
        </div>
        
        <div className="relative h-[300px] md:h-[400px]">
          {/* Gambar */}
          <img
            src={image}
            alt="Catering Dede"
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection