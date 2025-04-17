"use client"

export const Button = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded ${className}`}>
      {children}
    </button>
  )
}
