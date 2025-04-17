"use client"

export const Card = ({ title, children, className = "", actions, icon, variant = "default" }) => {
  const variants = {
    default: "",
    stat: "hover:shadow-lg transition-shadow",
    content: "p-6",
  }

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${variants[variant]} ${className}`}>
      {title && (
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {icon && <span className="text-[#D36B00]">{icon}</span>}
            <h3 className="text-lg font-semibold text-[#42032C]">{title}</h3>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={variant === "content" ? "p-0" : "p-4"}>{children}</div>
    </div>
  )
}

// StatCard component using the Card component
export const StatCard = ({ title, value, icon, color = "bg-blue-100" }) => {
  return (
    <Card variant="stat">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-3xl font-bold text-[#42032C]">{value}</h3>
        </div>
        <div className={`p-3 ${color} rounded-full`}>{icon}</div>
      </div>
    </Card>
  )
}

// ContentCard component using the Card component
export const ContentCard = ({ title, children, className = "" }) => {
  return (
    <Card variant="content" className={className}>
      <h3 className="text-xl font-semibold text-[#42032C] mb-4">{title}</h3>
      {children}
    </Card>
  )
}

export default Card
