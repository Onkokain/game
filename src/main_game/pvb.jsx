// PvB.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSound from 'use-sound'
import { winlist, cells } from '../utils/constants.js'
import Victoryy from '../assets/victory.mp3'
import optionselect from '../assets/select_button.mp3'
import wrongs from '../assets/wrong.mp3'
import circle from '../assets/circle.png'
import cross from '../assets/cross.png'

/* Controlled Cell component: renders based on `value` (null | 'X' | 'O') */
function Cell({ id, value, onClick, disabled }) {
  return (
    <div
      onClick={() => !disabled && onClick(id)}
      className="flex items-center justify-center w-32 h-32 border-3 border-white rounded-xl gap-3 hover:scale-105 hover:bg-gray-800 transition-all active:scale-95 cursor-pointer"
      style={{ pointerEvents: disabled ? 'none' : 'auto' }}
    >
      {value === 'X' ? (
        <img className="w-24 h-24" src={cross} alt="X" />
      ) : value === 'O' ? (
        <img className="w-24 h-24" src={circle} alt="O" />
      ) : (
        <div />
      )}
    </div>
  )
}

function PvB() {
  const navigate = useNavigate()
  const [board, setBoard] = useState({}) // { '11': 'X', '12': 'O', ... }
  const [isBotThinking, setIsBotThinking] = useState(false)
  const [fade, setFade] = useState(false)

  const [playClick] = useSound(optionselect)
  const [playWrong] = useSound(wrongs, { volume: 0.3 })
  const [playVictory] = useSound(Victoryy)

  // helper: produce arrays of positions for each symbol from board
  const positionsFromBoard = (b) => {
    const x = []
    const o = []
    for (const [k, v] of Object.entries(b)) {
      if (v === 'X') x.push(k)
      if (v === 'O') o.push(k)
    }
    return { x, o }
  }

  // check winner given a board object; returns 'X', 'O', 'D' (draw) or null
  const checkWinnerFromBoard = (b) => {
    const { x, o } = positionsFromBoard(b)
    for (let i = 0; i < winlist.length; i++) {
      if (winlist[i].every(cell => x.includes(cell))) return 'X'
      if (winlist[i].every(cell => o.includes(cell))) return 'O'
    }
    const usedCount = Object.keys(b).length
    if (usedCount === cells.length) return 'D'
    return null
  }

  // handle player's click (player is always 'X' here)
  const handlePlayerMove = (id) => {
    // prevent click if occupied or bot is thinking or game is fading
    if (board[id]) {
      playWrong()
      return
    }
    if (isBotThinking || fade) return

    playClick()

    // place player's mark
    const boardAfterPlayer = { ...board, [id]: 'X' }
    setBoard(boardAfterPlayer)

    // check for immediate win/draw
    const winner1 = checkWinnerFromBoard(boardAfterPlayer)
    if (winner1) return finishGame(winner1)

    // otherwise let bot move after small delay
    setIsBotThinking(true)
    setTimeout(() => {
      botMove(boardAfterPlayer)
    }, 450) // bot "thinking" delay (adjust as desired)
  }

  // bot picks a random empty cell and places 'O'
  const botMove = (currentBoard) => {
    // compute remaining cells
    const used = new Set(Object.keys(currentBoard))
    const remaining = cells.filter(c => !used.has(c))

    if (remaining.length === 0) {
      // draw — shouldn't normally happen because we check earlier
      finishGame('D')
      return
    }

    // pick random index
    const idx = Math.floor(Math.random() * remaining.length)
    const pick = remaining[idx]

    const boardAfterBot = { ...currentBoard, [pick]: 'O' }
    setBoard(boardAfterBot)

    // check winner after bot move
    const winner2 = checkWinnerFromBoard(boardAfterBot)
    setIsBotThinking(false)
    if (winner2) return finishGame(winner2)

    // otherwise game continues (player again)
  }

  // handle finishing the game: play sound, fade, navigate to /end with state winner
  const finishGame = (winner) => {
    // play victory sound only for X or O (not draw)
    if (winner === 'X' || winner === 'O') playVictory()
    setFade(true)
    // give sound/fade a moment
    setTimeout(() => {
      navigate('/end', { state: { winner } })
    }, 600)
  }

  // allow resetting board externally? (not implemented here)
  return (
    <div className={`flex bg-linear-to-b from-gray-900 to bg-gray-950 transition-opacity duration-300 h-screen ${fade ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex fixed h-screen w-screen items-center justify-center">
        <div className="flex-col border-2 hover:border-4 hover:scale-105 h-160 w-120 border-white rounded-4xl bg-black transition-all duration-500 shadow-[0_0_20px_white]">
          <div className="flex text-white font-mono font-bold italic text-6xl justify-center py-15">Tic Tac Toe</div>

          <div className="flex flex-wrap justify-center items-center m-auto w-99 h-99 gap-1.5">
            {cells.map(id => (
              <Cell
                key={id}
                id={id}
                value={board[id] ?? null}
                onClick={handlePlayerMove}
                disabled={isBotThinking || !!board[id] || fade}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PvB
