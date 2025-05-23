import React from "react";
import { Search, ShoppingCart, FileText, CreditCard, MessageCircle, Package } from "lucide-react";

const CaraPesanSection = () => {
  const steps = [
    {
      icon: <Search size={48} />,
      title: "Pilih Produk",
      description: "Pikirkan menu yang kalian inginkan atau kalian butuhkan atau mungkin tertarik pada produk yang tersedia di website."
    },
    {
      icon: <MessageCircle size={48} />,
      title: "Konsultasi via WhatsApp", 
      description: "Hubungi kami melalui WhatsApp untuk konsultasi kebutuhan acara Anda."
    },
    {
      icon: <FileText size={48} />,
      title: "Tentukan Detail",
      description: "Tentukan tanggal, lokasi, dan jumlah item."
    },
    {
      icon: <CreditCard size={48} />,
      title: "Pembayaran DP",
      description: "Lakukan pembayaran DP sebagai konfirmasi pemesanan."
    },
    {
      icon: <Package size={48} />,
      title: "Pengantaran",
      description: "Tim kami akan mengantarkan dan menyajikan hidangan sesuai jadwal yang disepakati."
    }
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

      {/* Langkah-langkah dengan Grid */}
      <div className="max-w-6xl mx-auto">
        {/* Baris pertama - 3 kolom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {steps.slice(0, 3).map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6">
              <div className="mb-4 text-[var(--secondary-brand)]">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        
        {/* Baris kedua - 2 kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {steps.slice(3, 5).map((step, index) => (
            <div key={index + 3} className="flex flex-col items-center text-center p-6">
              <div className="mb-4 text-[var(--secondary-brand)]">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaraPesanSection;