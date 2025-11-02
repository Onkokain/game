import hoversound from '../assets/menu_hover.mp3'
import optionselect from '../assets/option_select.mp3'
import useSound from 'use-sound'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { states_start } from '../utils/constants.js'
import wrongs from '../assets/wrong.mp3'
import { useState } from 'react'

function Start() {
  const [playhover] = useSound(hoversound, { volume: 0.2 })
  const [playactive] = useSound(optionselect, { volume: 0.5 })
  const [playwrong] = useSound(wrongs)

  const player_mode = localStorage.getItem('modeClicked')
  const current_mode = localStorage.getItem('currentmode')
  const current_diff = localStorage.getItem('currentdifficulty')

  const [hover, sethover] = useState(null)

  return (
    <>
      <div className="flex justify-center py-15 max-h-[90vh] selection:bg-transparent">
        <div className="bg-black flex flex-col gap-6 border-2 hover:border-4 p-5 px-10 rounded-2xl border-gray-300 font-mono hover:scale-105 transition-all duration-500 shadow-[0_0_20px_white]">
          <header className="flex py-5 font-mono text-white text-5xl justify-center font-bold">
            Tic Tac Toe
          </header>

          {states_start.map((item, index) => {
            const isdis = index == 1 && (player_mode == 0 || player_mode == 2)

            return (
              <Link
                key={index}
                onMouseEnter={() => {
                  isdis ? undefined : playhover()

                  setTimeout(()=>sethover(isdis?null:index),150)
                }}
                onMouseLeave={() =>sethover(null)}
                onClick={isdis ? playwrong : playactive}
                className={`text-center text-white text-3xl border-2 p-5 rounded-3xl px-20 italic selection:bg-transparent ${
                  isdis
                    ? 'text-white/50'
                    : 'hover:scale-110 active:scale-[95%]'
                }`}
                to={isdis ? undefined : item.path}
              >
                {hover == index && (index == 2 || index == 1)
                  ? index == 2
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
