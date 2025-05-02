import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="bg-[var(--light-brand)] py-16 font-sans">
      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">
        {/* Teks */} 
        <div className="space-y-6">
          <h2 className="text-5xl font-bold text-[var(--primary-brand)] tracking-tight">
            ABOUT US
          </h2>
          <div className="h-1 w-20 bg-[var(--primary-brand)]"></div>

          <p className="text-lg text-[var(--primary-brand)] font-semibold">
            Catering Dewa Dewi Madiun – Sajian Lezat, Pelayanan Profesional, dan Harga Bersahabat.
          </p>

          <div className="space-y-4 text-[var(--primary-brand)] text-sm leading-relaxed opacity-90">
            <p>
              Catering Dewa Dewi Madiun dikenal sebagai penyedia layanan katering yang unggul dalam menjaga kualitas, kebersihan, serta rasa dari setiap hidangan yang disajikan.
              Dengan pengalaman dan komitmen tinggi, kami menghadirkan aneka menu lezat yang bervariasi—mulai dari masakan tradisional khas Nusantara, hidangan internasional, pilihan vegetarian, hingga menu spesial sesuai permintaan pelanggan.
            </p>
            <p>
              Kami menjadi pilihan tepat untuk memenuhi kebutuhan katering berbagai jenis acara, baik berskala kecil, menengah, hingga besar di Madiun dan sekitarnya.
              Hidangan diolah dengan bahan berkualitas oleh tim dapur berpengalaman yang menjamin rasa yang konsisten dan memuaskan.
            </p>
            <p>
              Layanan kami profesional dan ramah, siap membantu sejak konsultasi menu hingga pelaksanaan acara. 
              Dengan jangkauan layanan yang luas di Kota Madiun dan Jawa Timur, serta harga yang bersaing, kami hadir sebagai solusi katering yang terpercaya.
            </p>
            <p>
              Kebersihan dan standar kesehatan adalah prioritas kami. Setiap proses pengolahan makanan dilakukan dengan perhatian terhadap sanitasi, demi keamanan dan kenyamanan pelanggan.
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
