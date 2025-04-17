"use client"

export const StatCard = ({ title, value, icon, color = "bg-blue-100" }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-3xl font-bold text-[#42032C]">{value}</h3>
        </div>
        <div className={`p-3 ${color} rounded-full`}>{icon}</div>
      </div>
    </div>
  )
}

export default StatCard
