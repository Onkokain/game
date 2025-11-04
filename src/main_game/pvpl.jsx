// src/pages/PvP.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Div from "../components/cells.jsx";
import { winlist, cells } from "../utils/constants.js";
import Victoryy from "../assets/victory.mp3";
import useSound from "use-sound";
import useTheme from "../hooks/useTheme";

function PvP() {
  const { theme } = useTheme();
  const player_symbol = localStorage.getItem("current_player") || "X";
  const set_volume = parseFloat(localStorage.getItem("volume")) || 0.5;

  const [player, setplayer] = useState(player_symbol);
  const [x, setx] = useState([]);
  const [o, seto] = useState([]);
  const [locked, setLocked] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();
  const [Victor] = useSound(Victoryy, { volume: set_volume });
  const [fade, setfade] = useState(false);

  const getWinnerFromArrays = (xArr, oArr) => {
    for (let i = 0; i < winlist.length; i++) {
      if (winlist[i].every((c) => xArr.includes(c))) return "X";
      if (winlist[i].every((c) => oArr.includes(c))) return "O";
    }
    if (xArr.length + oArr.length === cells.length) return "D";
    return null;
  };

  const handleGameEnd = (winner) => {
    if (gameOver) return;
    setGameOver(true);
    if (winner === "X" || winner === "O") Victor();

    if (typeof document !== "undefined" && document.body) {
      document.body.style.background =
        theme === "light"
          ? "linear-gradient(to bottom, #FFF6E0, #F5E6C5)"
          : "linear-gradient(to bottom, #111827, #0f0f0f)";
      document.body.style.transition = "background 0.2s ease";
    }

    setfade(true);
    setTimeout(() => {
      navigate("/end", { state: { winner } });
    }, 400);
  };

  const handlemove = (id, currentPlayer) => {
    if (gameOver || locked) return;

    setLocked(true);
    setTimeout(() => {
      if (!gameOver) setLocked(false);
    }, 350);

    if (currentPlayer === "X") {
      const newX = [...x, id];
      const newO = [...o];
      const winner = getWinnerFromArrays(newX, newO);
      if (winner) {
        setx(newX);
        handleGameEnd(winner);
        return;
      }
      setx(newX);
      setplayer("O");
      return;
    } else {
      const newO = [...o, id];
      const newX = [...x];
      const winner = getWinnerFromArrays(newX, newO);
      if (winner) {
        seto(newO);
        handleGameEnd(winner);
        return;
      }
      seto(newO);
      setplayer("X");
      return;
    }
  };

  useEffect(() => {
    if (gameOver) return;
    const winner = getWinnerFromArrays(x, o);
    if (winner) handleGameEnd(winner);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, o]);

  return (
    <div
      className={`flex h-screen bg-gradient-to-b ${
        theme === "light" ? "from-[#FFF6E0] to-[#F5E6C5]" : "from-gray-900 to-gray-950"
      } transition-opacity duration-300 ${fade ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex fixed h-screen w-screen items-center justify-center">
        <div
          className={`flex-col border-2 h-160 w-120 rounded-4xl transition-all duration-300 ${
            theme === "light" ? "bg-[#E8D5B7] border-[#A67B5B]" : "bg-black border-white"
          }`}
        >
          <div className={`flex font-mono font-bold italic text-6xl justify-center py-15 ${theme === "light" ? "text-[#2D1E12]" : "text-white"}`}>
            Tic Tac Toe
          </div>

          <div className="flex flex-wrap justify-center items-center m-auto w-99 h-99 gap-1.5">
            {cells.map((id) => (
              <Div
                key={id}
                player={player}
                setplayer={setplayer}
                id={id}
                handlemove={handlemove}
                disabled={locked || gameOver}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PvP;
