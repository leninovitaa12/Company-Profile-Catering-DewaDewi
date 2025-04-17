"use client"

export const ContentCard = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-[#42032C] mb-4">{title}</h3>
      {children}
    </div>
  )
}

export default ContentCard
