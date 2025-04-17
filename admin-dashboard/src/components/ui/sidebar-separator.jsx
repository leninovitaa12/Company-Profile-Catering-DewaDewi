"use client"

export const SidebarSeparator = ({ label }) => {
  return (
    <div className="my-3">
      {label ? (
        <div className="flex items-center gap-2 px-2">
          <div className="h-px bg-white/20 flex-grow"></div>
          <span className="text-xs text-white/60 font-medium">{label}</span>
          <div className="h-px bg-white/20 flex-grow"></div>
        </div>
      ) : (
        <div className="h-px bg-white/20 mx-2"></div>
      )}
    </div>
  )
}

export default SidebarSeparator
