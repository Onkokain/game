import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useSound from 'use-sound'
import hoversound from '../assets/menu_hover.mp3'
import optionselect from '../assets/option_select.mp3'
import useTheme from '../hooks/useTheme'

function End() {
  const location = useLocation()
  const { theme } = useTheme()
  const winner = location.state?.winner

  const set_volume = parseFloat(localStorage.getItem('volume')) || 0.5
  const game_type = localStorage.getItem('currentmode') || 'PvB'
  const player_symbol = localStorage.getItem('current_player') || 'X'
  const [playhover] = useSound(hoversound, { volume: set_volume })
  const [playactive] = useSound(optionselect, { volume: set_volume })

  useEffect(() => {
    const t = setTimeout(() => {
      document.body.style.background = ''
      document.body.style.transition = ''
    }, 50)
    return () => clearTimeout(t)
  }, [])

  let resultMessage = ''
  if (game_type === 'PvP Local') {
    resultMessage =
      winner === 'X'
        ? '❌ Cross won!'
        : winner === 'O'
        ? '🔵 Circle won!'
        : 'It was a draw!'
  } else if (game_type === 'PvB' || game_type === 'PvBot') {
    resultMessage =
      winner === 'D'
        ? 'It was a draw!'
        : winner === player_symbol
        ? '🏆 You won!'
        : '😢 You lost!'
  } else resultMessage = 'Game Over'

  const bgGradient =
    theme === 'light'
      ? 'bg-gradient-to-b from-[#FFF6E0] to-[#F5E6C5]'
      : 'bg-gradient-to-b from-gray-900 to-gray-950'

  return (
    <div
      className={`flex flex-col h-screen w-full items-center justify-center ${bgGradient} gap-8 transition-all duration-500`}
    >
      <div
        className={`flex h-40 w-152 border-4 rounded-4xl items-center justify-center ${
          theme === 'light'
            ? 'bg-[#E8D5B7] border-[#A67B5B] shadow-[0_0_25px_rgba(166,123,91,0.8)]'
            : 'bg-black border-white shadow-[0_0_20px_white]'
        } hover:scale-105 transition-all duration-300`}
      >
        <div
          className={`font-mono italic font-bold text-6xl text-center px-4 ${
            theme === 'light' ? 'text-[#2D1E12]' : 'text-white'
          }`}
        >
          {resultMessage}
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <Link to="/game">
          <button
            onMouseEnter={playhover}
            onClick={playactive}
            className={`text-3xl border-2 p-5 rounded-4xl px-20 italic hover:scale-110 active:scale-95 transition-all duration-200 ${
              theme === 'light'
                ? 'border-[#A67B5B] text-[#2D1E12] bg-[#E8D5B7] hover:bg-[#F2DEC0]'
                : 'border-white text-white bg-black hover:bg-gray-800'
            }`}
          >
            Play Again
          </button>
        </Link>

        <Link to="/">
          <button
            onMouseEnter={playhover}
            onClick={playactive}
            className={`text-3xl border-2 p-5 rounded-4xl px-20 italic hover:scale-110 active:scale-95 transition-all duration-200 ${
              theme === 'light'
                ? 'border-[#A67B5B] text-[#2D1E12] bg-[#E8D5B7] hover:bg-[#F2DEC0]'
                : 'border-white text-white bg-black hover:bg-gray-800'
            }`}
          >
            Main Menu
          </button>
        </Link>
      </div>
    </div>
  )
}

export default End
