import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="bg-[var(--light-brand)] py-16 font-sans">
      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">
        {/* Teks */} 
        <div className="space-y-6">
          <h2 className="text-5xl font-extrabold text-[var(--primary-brand)] tracking-tight">
            ABOUT.
          </h2>
          <div className="h-1 w-20 bg-[var(--primary-brand)]"></div>

          <p className="text-lg text-[var(--primary-brand)] font-semibold">
            Kami passionate dalam menyajikan hidangan lezat dan pelayanan terbaik.
          </p>

          <div className="space-y-4 text-[var(--primary-brand)] text-sm leading-relaxed opacity-90">
            <p>
              Salah satu perusahaan jasa katering di Kota Madiun. Dibangun atas fondasi kepercayaan serta kepuasan konsumen.
            </p>
            <p>
              Katering untuk setiap jenis acara — mulai dari katering untuk korporasi dan institusi, pernikahan, acara ulang tahun, serta acara elaborasi lainnya.
            </p>
            <p>
              Kami senantiasa memberikan produk berkualitas dengan penyajian yang inovatif.
            </p>
          </div>
        </div>

        {/* Gambar */}
        <div className="w-full">
          <img
            src="https://i.pinimg.com/originals/52/6d/39/526d39bf93b6de71c9fcc7741a7c3aa0.jpg"
            alt="Tentang Kami"
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;