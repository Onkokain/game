import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import useSound from 'use-sound'
import hoversound from '../assets/menu_hover.mp3'
import optionselect from '../assets/option_select.mp3'
import wrongs from '../assets/wrong.mp3'
import { states_diff } from '../utils/constants.js'
import useTheme from '../hooks/useTheme' // 🌙 new import

function Difficulty() {
  const set_volume = parseFloat(localStorage.getItem('volume')) || 0.5
  const [playhover] = useSound(hoversound, { volume: set_volume })
  const [playactive] = useSound(optionselect, { volume: set_volume })
  const [playwrong] = useSound(wrongs, { volume: set_volume })
  const [clicked, setclicked] = useState(() => {
    const saved = localStorage.getItem('difficultyClicked')
    return saved !== null && saved !== '3' ? Number(saved) : null
  })

  // 🎨 theme hook
  const { theme } = useTheme()

  // 🌈 colors depend on theme
  const bgGradient =
    theme === 'light'
      ? 'bg-gradient-to-b from-[#FFF6E0] to-[#F5E6C5]'
      : 'bg-gradient-to-b from-gray-900 to-gray-950'
  const cardBg =
    theme === 'light' ? 'bg-[#E8D5B7] border-[#A67B5B]' : 'bg-black border-gray-300'
  const textColor = theme === 'light' ? 'text-[#2D1E12]' : 'text-white'

  return (
    <div
      className={`flex justify-center py-15 h-[100vh] selection:bg-transparent transition-all duration-700 ${bgGradient}`}
    >
      <div
        className={`flex flex-col gap-6 border-2 hover:border-4 p-5 px-10 rounded-2xl font-mono hover:scale-105 transition-all duration-500 shadow-[0_0_20px_rgba(166,123,91,0.8)] ${cardBg}`}
      >
        <header
          className={`flex py-5 text-5xl justify-center font-bold transition-all duration-300 ${textColor}`}
        >
          Tic Tac Toe
        </header>

        {states_diff.map((item, index) => (
          <Link
            key={index}
            onMouseEnter={playhover}
            onClick={() => {
              index !== clicked ? playactive() : playwrong()
              setclicked(index)
              localStorage.setItem('difficultyClicked', index)
              localStorage.setItem('currentdifficulty', item.name)
            }}
            to={item.path}
            className={`text-center text-3xl border-2 p-5 rounded-3xl px-20 italic selection:bg-transparent transition-all duration-200 ${
              index === clicked
                ? `${textColor} opacity-50 border-4`
                : `hover:scale-110 active:scale-[95%]`
            } ${
              theme === 'light'
                ? `border-[#A67B5B] ${textColor} bg-[#E8D5B7] hover:bg-[#F2DEC0]`
                : `border-gray-300 ${textColor} bg-black hover:bg-gray-800`
            }`}
          >
            {item.name}
          </Link>
        ))}

        <Link
          to="/"
          onMouseEnter={playhover}
          onClick={playactive}
          className={`text-center text-3xl border-2 p-5 rounded-3xl px-20 italic hover:scale-110 active:scale-[95%] selection:bg-transparent transition-all duration-200 ${
            theme === 'light'
              ? `border-[#A67B5B] ${textColor} bg-[#E8D5B7] hover:bg-[#F2DEC0]`
              : `border-gray-300 ${textColor} bg-black hover:bg-gray-800`
          }`}
        >
          Return
        </Link>
      </div>
    </div>
  )
}

export default Difficulty
