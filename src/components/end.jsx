import hoversound from '../assets/menu_hover.mp3'
import optionselect from '../assets/option_select.mp3'
import useSound from 'use-sound'
import { Link, useLocation } from 'react-router-dom'

function End() {
  const location = useLocation()
  const winner = location.state?.winner

  // LocalStorage values
  const set_volume = parseFloat(localStorage.getItem('volume')) || 0.5
  const game_type = localStorage.getItem('currentmode') || 'PvB'
  const player_symbol = localStorage.getItem('current_player') || 'X'

  // Sounds
  const [playhover] = useSound(hoversound, { volume: set_volume })
  const [playactive] = useSound(optionselect, { volume: set_volume })

  // ---------- Determine message ----------
  let resultMessage = ''

  if (game_type === 'PvP Local') {
    // PvP local
    if (winner === 'X') resultMessage = '❌ Cross won!'
    else if (winner === 'O') resultMessage = '🔵 Circle won!'
    else resultMessage = 'It was a draw!'
  } 
  else if (game_type === 'PvB' || game_type === 'PvBot') {
    // PvB (Player vs Bot)
    if (winner === 'D') resultMessage = 'It was a draw!'
    else if (winner === player_symbol) resultMessage = '🏆 You won!'
    else resultMessage = '😢 You lost!'
  } 
  else {
    resultMessage = 'Game Over'
  }

  // ---------- UI ----------
  return (
    <div className='flex flex-col h-screen w-full items-center justify-center bg-linear-to-b from-gray-900 to-gray-950 gap-8'>
      {/* Winner box */}
      <div className='flex shadow-[0_0_20px_white] h-40 w-152 border-4 rounded-4xl border-white items-center justify-center bg-black hover:scale-105 transition-all duration-300'>
        <div className='font-mono italic font-bold text-white text-6xl text-center px-4'>
          {resultMessage}
        </div>
      </div>

      {/* Buttons */}
      <div className='flex justify-center gap-6'>
        <Link to='/game'>
          <button
            onMouseEnter={playhover}
            onClick={playactive}
            className='text-white text-3xl border-2 p-5 rounded-4xl px-20 italic hover:scale-110 active:scale-95 transition-all duration-200'
          >
            Play Again
          </button>
        </Link>

        <Link to='/'>
          <button
            onMouseEnter={playhover}
            onClick={playactive}
            className='text-white text-3xl border-2 p-5 rounded-4xl px-20 italic hover:scale-110 active:scale-95 transition-all duration-200'
          >
            Main Menu
          </button>
        </Link>
      </div>
    </div>
  )
}

export default End
