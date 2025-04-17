import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="bg-white py-16 font-sans">
      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">
        {/* Teks */}
        <div className="space-y-6">
          <h2 className="text-5xl font-extrabold text-[#606c38] tracking-tight">
            ABOUT.
          </h2>
          <div className="h-1 w-20 bg-[#606c38]"></div>

          <p className="text-lg text-[#606c38] font-semibold">
            Kami passionate dalam menyajikan hidangan lezat dan pelayanan terbaik.
          </p>

          <div className="space-y-4 text-[#000000] text-sm leading-relaxed">
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
            src="/your-image.jpg" // ganti dengan path gambar kamu
            alt="Tentang Kami"
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
