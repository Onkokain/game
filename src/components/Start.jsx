import hoversound from '../assets/menu_hover.mp3'
import optionselect from '../assets/option_select.mp3'
import useSound from 'use-sound'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { states_start } from '../utils/constants.js'
import wrongs from '../assets/wrong.mp3'
import { useState } from 'react'

function Start() {
  const set_volume = parseFloat(localStorage.getItem('volume')) || 0.5
  const [playhover] = useSound(hoversound, { volume: set_volume })
  const [playactive] = useSound(optionselect, { volume: set_volume })
  const [playwrong] = useSound(wrongs, { volume: set_volume })

  const player_mode = localStorage.getItem('modeClicked') // 0 = PvP, 1 = PvB, 2 = PvOnline
  const current_mode = localStorage.getItem('currentmode') || 'Mode'
  const current_diff = localStorage.getItem('currentdifficulty') || 'Difficulty'

  const [hover, sethover] = useState(null)

  return (
    <>
      <div className="flex justify-center py-15 max-h-[90vh] selection:bg-transparent">
        <div className="bg-black flex flex-col gap-6 border-2 hover:border-4 p-5 px-10 rounded-2xl border-gray-300 font-mono hover:scale-105 transition-all duration-500 shadow-[0_0_20px_white]">
          <header className="flex py-5 font-mono text-white text-5xl justify-center font-bold">
            Tic Tac Toe
          </header>

          {states_start.map((item, index) => {
            // disable difficulty if mode is not PvB
            const diff_disable_check = index === 1 && (player_mode == 0 || player_mode == 2)

            // dynamic routing for "Play" button (index 0)
            let finalPath = item.path
            if (index === 0) {
              if (player_mode == 0) finalPath = '/pvp'
              else if (player_mode == 1) finalPath = '/pvb' // works for all difficulties
              else if (player_mode == 2) finalPath = '/underdevelopment'
            }

            return (
              <Link
                key={index}
                onMouseEnter={() => {
                  if (!diff_disable_check) playhover()
                  setTimeout(() => sethover(diff_disable_check ? null : index), 150)
                }}
                onMouseLeave={() => sethover(null)}
                onClick={diff_disable_check ? playwrong : playactive}
                className={`w-85 text-center text-white text-3xl border-2 p-5 rounded-3xl px-20 italic selection:bg-transparent ${
                  diff_disable_check
                    ? 'text-white/50 cursor-not-allowed'
                    : 'hover:scale-110 active:scale-[95%]'
                }`}
                to={diff_disable_check ? undefined : finalPath}
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
    </>
  )
}

export default Start
