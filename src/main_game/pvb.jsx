import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSound from 'use-sound'
import { winlist, cells } from '../utils/constants.js'
import Victoryy from '../assets/victory.mp3'
import optionselect from '../assets/select_button.mp3'
import wrongs from '../assets/wrong.mp3'
import circle from '../assets/circle.png'
import cross from '../assets/cross.png'
import useTheme from '../hooks/useTheme'

function Cell({ id, value, onClick, disabled, theme }) {
  return (
    <div
      onClick={() => !disabled && onClick(id)}
      className={`flex items-center justify-center w-32 h-32 border-3 rounded-xl gap-3 transition-all active:scale-95 cursor-pointer 
        ${
          theme === 'light'
            ? 'border-[#A67B5B] hover:bg-[#d4c3a9]'
            : 'border-white hover:bg-gray-700'
        } hover:scale-105`}
      style={{ pointerEvents: disabled ? 'none' : 'auto' }}
    >
      {value === 'X' ? (
        <img className="w-24 h-24" src={cross} alt="X" />
      ) : value === 'O' ? (
        <img className="w-24 h-24" src={circle} alt="O" />
      ) : null}
    </div>
  )
}

function PvB() {
  const navigate = useNavigate()
  const { theme } = useTheme()

  const storedVolume = parseFloat(localStorage.getItem('volume')) || 0.5
  const currentDiff = (localStorage.getItem('currentdifficulty') || 'Easy').toLowerCase()
  const userSymbol = (localStorage.getItem('current_player') || 'X').toUpperCase()
  const botSymbol = userSymbol === 'X' ? 'O' : 'X'

  const [playClick] = useSound(optionselect, { volume: storedVolume })
  const [playWrong] = useSound(wrongs, { volume: storedVolume * 0.8 })
  const [playVictory] = useSound(Victoryy, { volume: storedVolume })

  const [board, setBoard] = useState({})
  const [isBotThinking, setIsBotThinking] = useState(false)
  const [fade, setFade] = useState(false)

  const positionsFromBoard = (b) => {
    const x = [], o = []
    for (const [k, v] of Object.entries(b)) {
      if (v === 'X') x.push(k)
      if (v === 'O') o.push(k)
    }
    return { x, o }
  }

  const checkWinner = (b) => {
    const { x, o } = positionsFromBoard(b)
    for (const combo of winlist) {
      if (combo.every((c) => x.includes(c))) return 'X'
      if (combo.every((c) => o.includes(c))) return 'O'
    }
    if (Object.keys(b).length === cells.length) return 'D'
    return null
  }

  const finishGame = (winner) => {
    if (winner === 'X' || winner === 'O') playVictory()

    document.body.style.background =
      theme === 'light'
        ? 'linear-gradient(to bottom, #FFF6E0, #F5E6C5)'
        : 'linear-gradient(to bottom, #111827, #0f0f0f)'
    document.body.style.transition = 'background 0.25s ease'

    setFade(true)
    setTimeout(() => navigate('/end', { state: { winner } }), 600)
  }

  const available = (b) => cells.filter((c) => !b[c])
  const findImmediateWin = (b, s) =>
    available(b).find((m) => checkWinner({ ...b, [m]: s }) === s)

  const minimax = (b, depth, isMax) => {
    const winner = checkWinner(b)
    if (winner === botSymbol) return { score: 10 - depth }
    if (winner === userSymbol) return { score: depth - 10 }
    if (winner === 'D') return { score: 0 }

    const rem = available(b)
    if (isMax) {
      let best = { score: -Infinity }
      for (const m of rem) {
        const score = minimax({ ...b, [m]: botSymbol }, depth + 1, false).score
        if (score > best.score) best = { score, move: m }
      }
      return best
    } else {
      let best = { score: Infinity }
      for (const m of rem) {
        const score = minimax({ ...b, [m]: userSymbol }, depth + 1, true).score
        if (score < best.score) best = { score, move: m }
      }
      return best
    }
  }

  const chooseBotMove = (b) => {
    const diff = currentDiff
    const win = findImmediateWin(b, botSymbol)
    if (win) return win
    if (diff !== 'easy') {
      const block = findImmediateWin(b, userSymbol)
      if (block) return block
    }

    const rem = available(b)
    if (diff === 'easy') return rem[Math.floor(Math.random() * rem.length)]
    if (diff === 'medium')
      return Math.random() < 0.6
        ? rem[Math.floor(Math.random() * rem.length)]
        : minimax(b, 0, true).move
    return minimax(b, 0, true).move
  }

  const botMove = (b) => {
    const move = chooseBotMove(b)
    const newBoard = { ...b, [move]: botSymbol }
    setBoard(newBoard)
    const win = checkWinner(newBoard)
    setIsBotThinking(false)
    if (win) finishGame(win)
  }

  const handleClick = (id) => {
    if (board[id] || isBotThinking || fade) return playWrong()
    playClick()
    const nb = { ...board, [id]: userSymbol }
    setBoard(nb)
    const win = checkWinner(nb)
    if (win) return finishGame(win)
    setIsBotThinking(true)
    setTimeout(() => botMove(nb), 400)
  }

  return (
    <div
      className={`flex h-screen bg-gradient-to-b ${
        theme === 'light'
          ? 'from-[#FFF6E0] to-[#F5E6C5]'
          : 'from-gray-900 to-gray-950'
      } transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="flex fixed h-screen w-screen items-center justify-center">
        <div
          className={`flex-col border-2 hover:border-4 hover:scale-105 h-160 w-120 rounded-4xl transition-all duration-500 ${
            theme === 'light'
              ? 'bg-[#E8D5B7] border-[#A67B5B] shadow-[0_0_25px_rgba(166,123,91,0.8)]'
              : 'bg-black border-white shadow-[0_0_20px_white]'
          }`}
        >
          <div
            className={`flex font-mono font-bold italic text-6xl justify-center py-15 ${
              theme === 'light' ? 'text-[#2D1E12]' : 'text-white'
            }`}
          >
            Tic Tac Toe
          </div>
          <div className="flex flex-wrap justify-center items-center m-auto w-99 h-99 gap-1.5">
            {cells.map((id) => (
              <Cell
                key={id}
                id={id}
                value={board[id]}
                onClick={handleClick}
                disabled={isBotThinking || fade}
                theme={theme}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PvB
