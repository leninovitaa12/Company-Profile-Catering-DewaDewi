import React from "react";

const AboutSection = ({ image, about }) => {
  return (
    <section id="about" className="py-5 mt-10 " >
      <div className="container mx-auto px-4">
        {/* Menggunakan flexbox untuk tata letak dua kolom */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Bagian Kiri: Teks */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight"> {/* Menambahkan gaya teks pada judul */}
                <span className="text-orange-700 ">Dewadewi Catering,</span>
                <br />
                <span className="text-black-700">Sentuhan Kelezatan di Setiap Hidangan</span>
              </h2>
              <p className="text-black-500 mt-3 max-w-2xl text-lg"> {/* Menambahkan gaya teks pada paragraf */}
                {about}
              </p>
            </div>
          </div>

          {/* Bagian Kanan: Gambar */}
          <div className="md:w-1/2">
            <div className="card rounded-xl overflow-hidden shadow-lg h-full"> {/* Menambahkan shadow-lg untuk bayangan lebih jelas */}
              <img
                src={
                  image ||
                  "https://i.pinimg.com/originals/52/6d/39/526d39bf93b6de71c9fcc7741a7c3aa0.jpg"
                }
                alt="Lahan pertanian berkelanjutan"
                className="w-full h-auto object-cover max-h-[500px]" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;