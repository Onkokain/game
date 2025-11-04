import React from 'react'
import { Link } from 'react-router-dom'
import useSound from 'use-sound'
import hoversound from './assets/menu_hover.mp3'
import optionselect from './assets/option_select.mp3'

function UnderDevelopment() {
  const [playhover] = useSound(hoversound, { volume: 0.2 })
  const [playactive] = useSound(optionselect, { volume: 0.5 })

  return (
    <div className="flex justify-center items-center h-screen selection:bg-transparent">
      <div className="bg-black flex flex-col items-center gap-8 border-2 hover:border-4 p-10 px-16 rounded-2xl border-gray-300 font-mono hover:scale-105 transition-all duration-500 shadow-[0_0_20px_white]">
        <h1 className="text-white text-5xl font-bold italic text-center">
          🚧 Under Development 🚧
        </h1>
        <p className="text-white/80 text-xl italic text-center">
          This feature isn’t ready yet, but it’s coming soon!
        </p>

        <Link
          to="/"
          onMouseEnter={() => playhover()}
          onClick={() => playactive()}
          className="text-white text-3xl border-2 p-4 rounded-3xl px-16 italic hover:scale-110 active:scale-[95%] transition-all duration-300"
        >
          Return
        </Link>
      </div>
    </div>
  )
}

export default UnderDevelopment
