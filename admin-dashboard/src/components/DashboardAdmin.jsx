"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Sidebar, PageHeader, Card, StatCard, ContentCard } from "../components/ui/ui-components";
import { HomeIcon, TestimoniIcon, ProductIcon, AccountIcon, CalendarIcon } from "../components/ui/icons";
import useGetProductsAdmin from "../hook/useGetProducts";
import useGetTestimoni from "../hook/useGetTestimoni";

// Custom hook to calculate time ago (e.g., "5 hours ago")
const useTimeAgo = (timestamp) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const diffInMilliseconds = new Date() - new Date(timestamp);
      const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      let timeString = "";
      if (diffInMinutes < 1) {
        timeString = `${diffInSeconds} detik yang lalu`;
      } else if (diffInMinutes < 60) {
        timeString = `${diffInMinutes} menit yang lalu`;
      } else if (diffInHours < 24) {
        timeString = `${diffInHours} jam yang lalu`;
      } else {
        timeString = `${diffInDays} hari yang lalu`;
      }

      setTimeAgo(timeString);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [timestamp]);

  return timeAgo;
};

const DashboardAdmin = () => {
  const { authUser } = useAuthContext();

  // Fetch data produk dan testimoni
  const { products, loading: productsLoading } = useGetProductsAdmin();
  const { testimonis, loadings: testimonisLoading } = useGetTestimoni();

  // Get the latest product and latest testimonial
  const latestProduct = products[0] || {};
  const latestTestimoni = testimonis[0] || {};

  // Get the "time ago" for the latest product and testimonial
  const latestProductTime = useTimeAgo(latestProduct.createdAt);
  const latestTestimoniTime = useTimeAgo(latestTestimoni.createdAt);

  const stats = [
    {
      title: "Total Produk",
      value: productsLoading ? "..." : products?.length || "0",
      icon: <ProductIcon />,
      color: "bg-blue-100",
    },
    {
      title: "Testimoni",
      value: testimonisLoading ? "..." : testimonis?.length || "0",
      icon: <TestimoniIcon />,
      color: "bg-green-100",
    },
  ];

  // Recent activities
  const activities = [
    { action: "Produk baru ditambahkan", time: latestProductTime, icon: <ProductIcon /> },
    { action: "Testimoni baru diterima", time: latestTestimoniTime, icon: <TestimoniIcon /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F1EFDC]">
      {/* Sidebar */}
      <Sidebar activePage="dashboard" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <PageHeader title="Dashboard Admin" icon={<HomeIcon />} />

        <div className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Welcome Card */}
            <Card>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#42032C]">Selamat Datang, {authUser.name || "Admin"}!</h2>
                  <p className="text-gray-600 mt-1">
                    {new Date().toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Dashboard Content */}
              <ContentCard title="Informasi Dashboard" className="lg:col-span-2">
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <p className="text-gray-700 mb-4">
                    Selamat datang di dashboard admin. Dari sini Anda dapat mengelola produk, testimoni, dan melihat
                    statistik penting tentang bisnis Anda.
                  </p>
                </div>
              </ContentCard>

              {/* Recent Activities */}
              <ContentCard title="Aktivitas Terbaru">
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-[#D36B00] bg-opacity-10 rounded-full text-[#D36B00]">{activity.icon}</div>
                      <div>
                        <p className="text-gray-800 font-medium">{activity.action}</p>
                        <p className="text-gray-500 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ContentCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
