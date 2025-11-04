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

  // read stored settings
  const storedVolume = parseFloat(localStorage.getItem('volume')) || 0.5
  const currentDiff = (localStorage.getItem('currentdifficulty') || 'Easy').toLowerCase() // 'easy'|'medium'|'hard'
  const userSymbolStored = (localStorage.getItem('current_player') || 'X').toUpperCase()
  const userSymbol = userSymbolStored === 'O' ? 'O' : 'X' // ensure only 'X' or 'O'
  const botSymbol = userSymbol === 'X' ? 'O' : 'X'

  // sounds (use stored volume)
  const [playClick] = useSound(optionselect, { volume: storedVolume })
  const [playWrong] = useSound(wrongs, { volume: storedVolume * 0.8 })
  const [playVictory] = useSound(Victoryy, { volume: storedVolume })

  // game state
  const [board, setBoard] = useState({}) // mapping like { '11': 'X', ... }
  const [isBotThinking, setIsBotThinking] = useState(false)
  const [fade, setFade] = useState(false)

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
      if (winlist[i].every((cell) => x.includes(cell))) return 'X'
      if (winlist[i].every((cell) => o.includes(cell))) return 'O'
    }
    const usedCount = Object.keys(b).length
    if (usedCount === cells.length) return 'D'
    return null
  }

  // finish game: play victory if not draw, fade, and navigate to /end with winner
  const finishGame = (winner) => {
    if (winner === 'X' || winner === 'O') playVictory()
    setFade(true)
    setTimeout(() => {
      navigate('/end', { state: { winner } })
    }, 600)
  }

  // helpers for move lists
  const availableMoves = (b) => cells.filter((c) => !Object.prototype.hasOwnProperty.call(b, c))

  // check immediate winning/blocking moves
  const findImmediateWin = (b, symbol) => {
    const rem = availableMoves(b)
    for (const m of rem) {
      const nb = { ...b, [m]: symbol }
      if (checkWinnerFromBoard(nb) === symbol) return m
    }
    return null
  }

  // MINIMAX for hard difficulty (returns {score, move})
  const minimax = (b, depth, isMaximizing) => {
    const winner = checkWinnerFromBoard(b)
    if (winner === botSymbol) return { score: 10 - depth }
    if (winner === userSymbol) return { score: depth - 10 }
    if (winner === 'D') return { score: 0 }

    const rem = availableMoves(b)
    if (isMaximizing) {
      let best = { score: -Infinity, move: null }
      for (const m of rem) {
        const nb = { ...b, [m]: botSymbol }
        const res = minimax(nb, depth + 1, false)
        if (res.score > best.score) best = { score: res.score, move: m }
      }
      return best
    } else {
      let best = { score: Infinity, move: null }
      for (const m of rem) {
        const nb = { ...b, [m]: userSymbol }
        const res = minimax(nb, depth + 1, true)
        if (res.score < best.score) best = { score: res.score, move: m }
      }
      return best
    }
  }

  // pick bot move according to difficulty
  const chooseBotMove = (currentBoard) => {
    const diff = currentDiff // 'easy'|'medium'|'hard'

    // 1) If bot can win in one, take it (all difficulties should do this)
    const immediateBotWin = findImmediateWin(currentBoard, botSymbol)
    if (immediateBotWin) return immediateBotWin

    // 2) If player can win next, block it (all difficulties should do this except easy)
    if (diff !== 'easy') {
      const immediatePlayerWin = findImmediateWin(currentBoard, userSymbol)
      if (immediatePlayerWin) return immediatePlayerWin
    }

    // Difficulty-specific choices:
    if (diff === 'easy') {
      // pure random
      const rem = availableMoves(currentBoard)
      const idx = Math.floor(Math.random() * rem.length)
      return rem[idx]
    }

    if (diff === 'medium') {
      // NEW: if Math.random() < 0.69 choose a random possible move,
      // otherwise use the smarter logic (minimax best move)
      const rem = availableMoves(currentBoard)
      const r = Math.random()
      if (r < 0.69) {
        // pick random
        const idx = Math.floor(Math.random() * rem.length)
        return rem[idx]
      } else {
        // pick the "best" move (minimax)
        const bestRes = minimax(currentBoard, 0, true)
        if (bestRes.move) return bestRes.move
        // fallback random
        const idx = Math.floor(Math.random() * rem.length)
        return rem[idx]
      }
    }

    // HARD: use minimax to pick optimal move (ensures at worst draw)
    if (diff === 'hard') {
      const best = minimax(currentBoard, 0, true)
      // fallback to random if minimax failed for any reason
      if (best.move) return best.move
      const rem = availableMoves(currentBoard)
      const idx = Math.floor(Math.random() * rem.length)
      return rem[idx]
    }

    // default fallback
    const rem = availableMoves(currentBoard)
    return rem[Math.floor(Math.random() * rem.length)]
  }

  // botMove integrates choosing and applying move
  const botMove = (currentBoard) => {
    const remaining = availableMoves(currentBoard)
    if (remaining.length === 0) {
      finishGame('D')
      return
    }

    const pick = chooseBotMove(currentBoard)
    if (!pick) {
      // safety fallback random
      const idx = Math.floor(Math.random() * remaining.length)
      const fallback = remaining[idx]
      const boardAfterBotFallback = { ...currentBoard, [fallback]: botSymbol }
      setBoard(boardAfterBotFallback)
      const winner2 = checkWinnerFromBoard(boardAfterBotFallback)
      setIsBotThinking(false)
      if (winner2) finishGame(winner2)
      return
    }

    const boardAfterBot = { ...currentBoard, [pick]: botSymbol }
    setBoard(boardAfterBot)

    // check winner after bot move
    const winner2 = checkWinnerFromBoard(boardAfterBot)
    setIsBotThinking(false)
    if (winner2) finishGame(winner2)
    // otherwise game continues (player again)
  }

  // handle player's click (player's symbol comes from current_player)
  const handlePlayerMove = (id) => {
    // guard: occupied cell
    if (board[id]) {
      playWrong()
      return
    }
    // guard: bot thinking or fade (game ending)
    if (isBotThinking || fade) return

    playClick()

    // place user's symbol
    const boardAfterPlayer = { ...board, [id]: userSymbol }
    setBoard(boardAfterPlayer)

    // check for immediate win/draw
    const winner1 = checkWinnerFromBoard(boardAfterPlayer)
    if (winner1) {
      finishGame(winner1)
      return
    }

    // else bot moves after short delay
    setIsBotThinking(true)
    setTimeout(() => {
      botMove(boardAfterPlayer)
    }, 450)
  }

  return (
    <div
      className={`flex bg-linear-to-b from-gray-900 to-gray-950 transition-opacity duration-300 h-screen ${
        fade ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex fixed h-screen w-screen items-center justify-center">
        <div className="flex-col border-2 hover:border-4 hover:scale-105 h-160 w-120 border-white rounded-4xl bg-black transition-all duration-500 shadow-[0_0_20px_white]">
          <div className="flex text-white font-mono font-bold italic text-6xl justify-center py-15">
            Tic Tac Toe
          </div>

          <div className="flex flex-wrap justify-center items-center m-auto w-99 h-99 gap-1.5">
            {cells.map((id) => (
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
