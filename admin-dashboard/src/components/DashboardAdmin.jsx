"use client"
import { useAuthContext } from "../context/AuthContext"
import Sidebar from "../components/ui/sidebar"
import PageHeader from "../components/ui/page-header"
import Card, { StatCard, ContentCard } from "../components/ui/card"
import Button from "../components/ui/button"
import { HomeIcon, TestimoniIcon, ProductIcon, AccountIcon, CalendarIcon } from "../components/icons"

const DashboardAdmin = () => {
  const { authUser } = useAuthContext()

  const stats = [
    { title: "Total Produk", value: "24", icon: <ProductIcon />, color: "bg-blue-100" },
    { title: "Testimoni", value: "12", icon: <TestimoniIcon />, color: "bg-green-100" },
    { title: "Pengguna", value: "5", icon: <AccountIcon />, color: "bg-purple-100" },
  ]

  // Recent activities
  const activities = [
    { action: "Produk baru ditambahkan", time: "2 jam yang lalu", icon: <ProductIcon /> },
    { action: "Testimoni baru diterima", time: "5 jam yang lalu", icon: <TestimoniIcon /> },
    { action: "Update stok produk", time: "Kemarin, 15:30", icon: <ProductIcon /> },
  ]

  // Upcoming events
  const events = [
    { title: "Meeting dengan supplier", date: "Besok, 10:00", icon: <CalendarIcon /> },
    { title: "Promo bulanan", date: "3 hari lagi", icon: <CalendarIcon /> },
  ]

  return (
    <div className="flex min-h-screen bg-[#F1EFDC]">
      {/* Sidebar */}
      <Sidebar activePage="dashboard" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <PageHeader
          title="Dashboard Admin"
          icon={<HomeIcon />}
          actions={
            <Button variant="primary" size="sm" icon={<CalendarIcon />}>
              Lihat Jadwal
            </Button>
          }
        />

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
                  <h4 className="font-semibold text-lg mb-3 text-[#42032C]">Ringkasan Sistem</h4>
                  <p className="text-gray-700 mb-4">
                    Selamat datang di dashboard admin. Dari sini Anda dapat mengelola produk, testimoni, dan melihat
                    statistik penting tentang bisnis Anda.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                      <h5 className="font-medium text-[#42032C] mb-2">Produk Terlaris</h5>
                      <p className="text-gray-600 text-sm">Produk A - 24 terjual</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-[#D36B00] h-2 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                      <h5 className="font-medium text-[#42032C] mb-2">Testimoni Terbaru</h5>
                      <p className="text-gray-600 text-sm">"Produk sangat bagus dan sesuai ekspektasi"</p>
                      <p className="text-gray-500 text-xs mt-2">- Pelanggan, 2 hari yang lalu</p>
                    </div>
                  </div>
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

            {/* Upcoming Events */}
            <ContentCard title="Jadwal Mendatang">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="p-2 bg-[#42032C] bg-opacity-10 rounded-full text-[#42032C]">{event.icon}</div>
                    <div>
                      <p className="text-gray-800 font-medium">{event.title}</p>
                      <p className="text-gray-500 text-sm">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ContentCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin
