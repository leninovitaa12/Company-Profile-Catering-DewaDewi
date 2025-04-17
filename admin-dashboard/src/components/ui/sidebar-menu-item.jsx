"use client"

import { Link } from "react-router-dom"

export const SidebarMenuItem = ({ icon, label, to, isActive, onClick }) => {
  // If there's a "to" prop, render as a Link, otherwise as a div (for active items)
  const Component = to ? Link : "div"

  return (
    <Component
      to={to}
      onClick={onClick}
      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
        isActive ? "bg-[#D36B00] cursor-default" : "hover:bg-[#D36B00] transition-colors"
      }`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span>{label}</span>
    </Component>
  )
}

export default SidebarMenuItem
