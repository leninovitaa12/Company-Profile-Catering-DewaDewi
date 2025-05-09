import React from "react";

const AboutSection = ({ image, about }) => {
  return (
    <section id="about" className="bg-[var(--light-brand)] py-20 font-sans">
      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">
        {/* Gambar */}
        <div className="relative w-full flex justify-center">
          <div className="space-y-6">
            <img
              src={image}
              alt="Makanan"
              className="rounded-lg shadow-lg w-[300px] md:w-[350px] object-cover"
            />
            <img
              src="https://i.pinimg.com/originals/52/6d/39/526d39bf93b6de71c9fcc7741a7c3aa0.jpg"
              alt="Food"
              className="rounded-lg shadow-lg w-[300px] md:w-[350px] object-cover md:-mt-20 ml-auto"
            />
          </div>
        </div>

        {/* Teks */}
        <div className="space-y-6 text-[var(--primary-brand)]">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Tentang Kami
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            {about}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
