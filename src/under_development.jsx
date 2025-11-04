import React from 'react'
import { Link } from 'react-router-dom'
import useSound from 'use-sound'
import hoversound from './assets/menu_hover.mp3'
import optionselect from './assets/option_select.mp3'
import useTheme from './hooks/useTheme'

function UnderDevelopment() {
  const { theme } = useTheme()

  const set_volume = parseFloat(localStorage.getItem('volume')) || 0.5
  const [playhover] = useSound(hoversound, { volume: set_volume })
  const [playactive] = useSound(optionselect, { volume: set_volume })

  // 🎨 Theme-based styling
  const bgGradient =
    theme === 'light'
      ? 'bg-gradient-to-b from-[#FFF6E0] to-[#F5E6C5]'
      : 'bg-gradient-to-b from-gray-900 to-gray-950'

  const cardBg =
    theme === 'light'
      ? 'bg-[#E8D5B7] border-[#A67B5B]'
      : 'bg-black border-gray-300'

  const textColor = theme === 'light' ? 'text-[#2D1E12]' : 'text-white'
  const subTextColor = theme === 'light' ? 'text-[#4B3A28]/80' : 'text-white/80'
  const buttonStyles =
    theme === 'light'
      ? 'bg-[#E8D5B7] border-[#A67B5B] text-[#2D1E12] hover:bg-[#F2DEC0]'
      : 'bg-black border-gray-300 text-white hover:bg-gray-800'

  return (
    <div
      className={`flex justify-center items-center h-screen selection:bg-transparent transition-all duration-700 ${bgGradient}`}
    >
      <div
        className={`flex flex-col items-center gap-8 border-2 hover:border-4 p-10 px-16 rounded-3xl font-mono hover:scale-105 transition-all duration-500 shadow-[0_0_25px_rgba(166,123,91,0.8)] ${cardBg}`}
      >
        <h1
          className={`text-5xl font-bold italic text-center transition-all duration-300 ${textColor}`}
        >
          🚧 Under Development 🚧
        </h1>

        <p
          className={`text-xl italic text-center transition-all duration-300 ${subTextColor}`}
        >
          This feature isn’t ready yet, but it’s coming soon!
        </p>

        <Link
          to="/"
          onMouseEnter={playhover}
          onClick={playactive}
          className={`text-3xl border-2 p-4 rounded-3xl px-16 italic transition-all duration-300 hover:scale-110 active:scale-[95%] ${buttonStyles}`}
        >
          Return
        </Link>
      </div>
    </div>
  )
}

export default UnderDevelopment
