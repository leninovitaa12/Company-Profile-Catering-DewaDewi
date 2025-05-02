import React from "react";
import { Check } from "lucide-react";

const CaraPesanSection = () => {
  const steps = [
    "Pilih paket atau menu yang diinginkan melalui website atau kontak langsung.",
    "Hubungi kami melalui WhatsApp untuk konsultasi kebutuhan acara Anda.",
    "Tentukan tanggal, lokasi, dan jumlah tamu.",
    "Lakukan pembayaran DP sebagai konfirmasi pemesanan.",
    "Tim kami akan mengantarkan dan menyajikan hidangan sesuai jadwal yang disepakati.",
  ];

  return (
    <section id="cara-pesan" className="bg-[var(--light-brand)] py-16 px-6 md:px-20 text-[var(--primary-brand)] font-sans">
      <h2 className="text-4xl font-bold mb-4">Cara Pemesanan</h2>
      <div className="h-1 w-20 bg-[var(--primary-brand)] mb-6"></div>
      <ul className="space-y-4 text-base md:text-lg">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="mt-1 text-green-600" />
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CaraPesanSection;
