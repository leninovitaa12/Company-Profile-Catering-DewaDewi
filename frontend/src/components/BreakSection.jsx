import React from 'react'
import { Button } from './ui/button'

const BreakSection = ({alamat, nohp}) => {
  return (
    <section id="contact" className="py-12 md:py-16 bg-[#42032C] text-[#E6D2AA] font-sans">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Di Madiun? Bingung mau jajan apa?
        </h2>
        <p className="max-w-2xl mx-auto">
          {alamat}. Pesan disini aja!
        </p>

        {/* Flex container untuk tombol dan WA */}
        <div className="mt-4 flex justify-center items-center gap-4">
          <a
            href={`https://api.whatsapp.com/send?phone=62${nohp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg transition-transform hover:scale-110"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.52 3.48A11.92 11.92 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.12 1.6 5.91L0 24l6.27-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.18-3.48-8.52zM12 22a9.93 9.93 0 0 1-5.1-1.39l-.36-.21-3.72.96.99-3.63-.24-.37A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.27-7.05c-.29-.14-1.72-.84-1.98-.94-.27-.1-.47-.14-.66.14-.2.29-.76.94-.93 1.13-.17.2-.34.22-.63.07-.29-.14-1.24-.46-2.37-1.47a8.77 8.77 0 0 1-1.63-2.03c-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.2-.29.29-.48.1-.2.05-.37-.02-.51-.07-.14-.66-1.59-.9-2.18-.24-.57-.49-.49-.66-.5h-.56c-.2 0-.52.07-.8.37-.29.29-1.04 1.02-1.04 2.48 0 1.45 1.06 2.85 1.2 3.05.14.2 2.1 3.21 5.09 4.5.71.31 1.26.5 1.69.64.71.22 1.36.19 1.87.12.57-.08 1.72-.7 1.96-1.37.24-.67.24-1.24.17-1.37-.07-.14-.26-.2-.55-.34z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default BreakSection
