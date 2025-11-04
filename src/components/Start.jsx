import hoversound from '../assets/menu_hover.mp3'
import optionselect from '../assets/option_select.mp3'
import useSound from 'use-sound'
import { Link } from 'react-router-dom'
import { states_start } from '../utils/constants.js'
import wrongs from '../assets/wrong.mp3'
import { useState } from 'react'
import useTheme from '../hooks/useTheme'

function Start() {
  const { theme } = useTheme()

  const set_volume = parseFloat(localStorage.getItem('volume')) || 0.5
  const [playhover] = useSound(hoversound, { volume: set_volume })
  const [playactive] = useSound(optionselect, { volume: set_volume })
  const [playwrong] = useSound(wrongs, { volume: set_volume })

  const player_mode = localStorage.getItem('modeClicked')
  const current_mode = localStorage.getItem('currentmode') || 'Mode'
  const current_diff = localStorage.getItem('currentdifficulty') || 'Difficulty'

  const [hover, sethover] = useState(null)

  // 🎨 Theme-based colors
  const bgGradient =
    theme === 'light'
      ? 'bg-gradient-to-b from-[#FFF6E0] to-[#F5E6C5]'
      : 'bg-gradient-to-b from-gray-900 to-gray-950'

  const cardBg =
    theme === 'light'
      ? 'bg-[#E8D5B7] border-[#A67B5B]'
      : 'bg-black border-gray-300'

  const textColor = theme === 'light' ? 'text-[#2D1E12]' : 'text-white'

  // 🧠 Disabled button styles for better clarity
  const disabledStyles =
    theme === 'light'
      ? 'bg-[#D6C7AA] border-[#C3AD8F] text-[#7A6B5A]/60 cursor-not-allowed opacity-60'
      : 'bg-[#1F1F1F] border-gray-700 text-gray-500 cursor-not-allowed opacity-60'

  return (
    <div
      className={`flex justify-center py-15 h-screen selection:bg-transparent transition-all duration-700 ${bgGradient}`}
    >
      <div
        className={`flex flex-col gap-6 border-2 hover:border-4 p-5 px-10 rounded-3xl font-mono hover:scale-105 transition-all duration-500 shadow-[0_0_25px_rgba(166,123,91,0.8)] ${cardBg}`}
      >
        <header
          className={`flex py-5 text-5xl justify-center font-bold italic transition-all duration-300 ${textColor}`}
        >
          Tic Tac Toe
        </header>

        {states_start.map((item, index) => {
          const diff_disable_check = index === 1 && (player_mode == 0 || player_mode == 2)

          let finalPath = item.path
          if (index === 0) {
            if (player_mode == 0) finalPath = '/pvp'
            else if (player_mode == 1) finalPath = '/pvb'
            else if (player_mode == 2) finalPath = '/underdevelopment'
          }

          const isDisabled = diff_disable_check

          return (
            <Link
              key={index}
              onMouseEnter={() => {
                if (!isDisabled) playhover()
                setTimeout(() => sethover(isDisabled ? null : index), 150)
              }}
              onMouseLeave={() => sethover(null)}
              onClick={isDisabled ? playwrong : playactive}
              to={isDisabled ? undefined : finalPath}
              className={`w-85 text-center text-3xl border-2 p-5 rounded-3xl px-20 italic selection:bg-transparent transition-all duration-150 
                ${
                  isDisabled
                    ? disabledStyles
                    : theme === 'light'
                    ? `border-[#A67B5B] ${textColor} bg-[#E8D5B7] hover:bg-[#F2DEC0] hover:scale-110 active:scale-[95%]`
                    : `border-gray-300 ${textColor} bg-black hover:bg-gray-800 hover:scale-110 active:scale-[95%]`
                }`}
            >
              {hover === index && (index === 2 || index === 1)
                ? index === 2
                  ? current_mode
                  : current_diff
                : item.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Start
