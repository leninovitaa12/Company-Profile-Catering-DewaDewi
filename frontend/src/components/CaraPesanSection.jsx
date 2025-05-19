import React from "react";

const CaraPesanSection = () => {
  const steps = [
    "Pikirkan menu yang kalian inginkan atau kalian butuhkan atau mungkin tertarik pada produk yang tersedia di website.",
    "Hubungi kami melalui WhatsApp untuk konsultasi kebutuhan acara Anda.",
    "Tentukan tanggal, lokasi, dan jumlah item.",
    "Lakukan pembayaran DP sebagai konfirmasi pemesanan.",
    "Tim kami akan mengantarkan dan menyajikan hidangan sesuai jadwal yang disepakati.",
  ];

  return (
    <section id="carapesan" className="bg-[var(--light-brand)] py-16 px-6 text-center font-sans text-[var(--primary-brand)]">
      {/* Header */}
      <h2 className="text-4xl font-bold mb-2">Cara Pesan</h2>
      <p className="text-lg mb-4">Cara melakukan order di dewa dewi catering</p>

      {/* Garis tengah */}
      <div className="relative w-full flex justify-center mb-12">
        <div className="h-[3px] w-24 bg-[var(--secondary-brand)]"></div>
      </div>

      {/* Langkah-langkah */}
      <div className="max-w-2xl mx-auto text-left space-y-6 text-base md:text-lg">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start">
            <span className="text-[var(--secondary-brand)] font-bold mr-2">{index + 1}.</span>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaraPesanSection;
