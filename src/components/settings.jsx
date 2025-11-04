import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSound from 'use-sound'
import hoversound from '../assets/menu_hover.mp3'
import optionselect from '../assets/option_select.mp3'
import { states_settings } from '../utils/constants'
import circle from '../assets/circle.png'
import cross from '../assets/cross.png'
import useTheme from '../hooks/useTheme' // 🌟 new hook import

function Settings() {
  const storedVolume = parseFloat(localStorage.getItem('volume')) || 0.5
  const [playhover] = useSound(hoversound, { volume: storedVolume })
  const [playactive] = useSound(optionselect, { volume: storedVolume })

  // 🎨 use global theme
  const { theme, toggleTheme } = useTheme()

  const [volume, setvolume] = useState(() => {
    const saved = localStorage.getItem('volume')
    const parsed = parseFloat(saved)
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) return parsed
    localStorage.setItem('volume', 0.5)
    return 0.5
  })

  const increasevolume = () => {
    setvolume((prev) => {
      let new_volume = prev + 0.1
      if (new_volume > 1) new_volume = 0.1
      new_volume = parseFloat(new_volume.toFixed(1))
      localStorage.setItem('volume', new_volume)
      return new_volume
    })
  }

  // symbol state (X or O)
  const [symbol, setsymbol] = useState(() => {
    const saved = localStorage.getItem('symbol')
    if (saved === 'X' || saved === 'O') {
      localStorage.setItem('current_player', saved)
      return saved
    }
    localStorage.setItem('symbol', 'X')
    localStorage.setItem('current_player', 'X')
    return 'X'
  })

  const handleSymbolSelect = (s) => {
    if (s === symbol) return
    setsymbol(s)
    localStorage.setItem('symbol', s)
    localStorage.setItem('current_player', s)
    playactive()
  }

  const [clicked, setClicked] = useState(() => {
    const saved = localStorage.getItem('modeClicked')
    return saved !== null && saved !== '3' ? Number(saved) : null
  })

  // 🎨 colors change by theme
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
        className={`flex flex-col gap-6 border-2 hover:border-4 p-5 px-10 rounded-3xl font-mono hover:scale-105 transition-all duration-500 shadow-[0_0_25px_rgba(166,123,91,0.8)] ${cardBg}`}
      >
        <header
          className={`flex py-5 text-5xl justify-center font-bold italic transition-all duration-300 ${textColor}`}
        >
          Tic Tac Toe
        </header>

        {states_settings.map((item, index) => (
          <Link
            key={index}
            onMouseEnter={index !== 1 ? playhover : undefined}
            onClick={() => {
              if (index === 0) increasevolume()
              if (index === 2) toggleTheme() // 🌟 theme toggler
              if (index !== 1) playactive()
              setClicked(index)
            }}
            to={item.path}
            className={`w-100 h-100 text-center items-center justify-center flex text-3xl border-2 p-5 rounded-3xl px-20 italic selection:bg-transparent transition-all duration-150 ${
              theme === 'light'
                ? `border-[#A67B5B] ${textColor} bg-[#E8D5B7] hover:bg-[#F2DEC0]`
                : `border-gray-300 ${textColor} bg-black hover:bg-gray-800`
            } ${index !== 1 ? 'hover:scale-110 active:scale-[95%]' : ''}`}
          >
            {item.name === 'Volume' ? (
              `${item.name}: ${Math.ceil(volume * 100)}`
            ) : item.name === 'Symbol' ? (
              <div className="flex items-center justify-center gap-6">
                {/* O Button */}
                <div
                  className={`flex items-center justify-center w-14 h-14 border-2 p-2 rounded-md ${
                    symbol === 'O'
                      ? 'scale-105 border-4 border-gray-700'
                      : 'hover:scale-110 active:scale-[95%] transition-all duration-200'
                  }`}
                  onMouseEnter={() => {
                    if (symbol !== 'O') playhover()
                  }}
                  onClick={() => {
                    if (symbol !== 'O') handleSymbolSelect('O')
                  }}
                >
                  <img src={circle} alt="O" className="w-10 h-10 object-contain" />
                </div>

                <span className={`text-3xl font-semibold italic ${textColor}`}>Symbol</span>

                {/* X Button */}
                <div
                  className={`flex items-center justify-center w-14 h-14 border-2 p-2 rounded-md ${
                    symbol === 'X'
                      ? 'scale-105 border-4 border-gray-700'
                      : 'hover:scale-110 active:scale-[95%] transition-all duration-200'
                  }`}
                  onMouseEnter={() => {
                    if (symbol !== 'X') playhover()
                  }}
                  onClick={() => {
                    if (symbol !== 'X') handleSymbolSelect('X')
                  }}
                >
                  <img src={cross} alt="X" className="w-10 h-10 object-contain" />
                </div>
              </div>
            ) : (
              item.name
            )}
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

export default Settings
