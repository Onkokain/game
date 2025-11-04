import React, { useState } from "react";
import circle from "../assets/circle.png";
import cross from "../assets/cross.png";
import useSound from "use-sound";
import optionselect from "../assets/select_button.mp3";
import wrongs from "../assets/wrong.mp3";
import useTheme from "../hooks/useTheme";

function Div({ player, setplayer, id, handlemove, disabled = false }) {
  const { theme } = useTheme();
  const set_volume = parseFloat(localStorage.getItem("volume")) || 0.5;
  const [turn, setturn] = useState(null);
  const [clicksound] = useSound(optionselect, { volume: set_volume });
  const [wrong] = useSound(wrongs, { volume: set_volume });

  const handleclick = () => {
    if (disabled) return;
    if (turn) {
      wrong();
      return;
    }
    clicksound();
    setturn(player);
    setplayer(player === "X" ? "O" : "X");
    handlemove(id, player);
  };

  // 🎨 Theme styling (same vibe as Start)
  const bgColor =
    theme === "light"
      ? "bg-[#E8D5B7] hover:bg-[#F2DEC0] border-[#A67B5B] shadow-[0_0_10px_rgba(166,123,91,0.6)]"
      : "bg-black hover:bg-gray-800 border-gray-400 shadow-[0_0_15px_rgba(255,255,255,0.2)]";

  const textColor = theme === "light" ? "text-[#2D1E12]" : "text-white";

  return (
    <div
      onClick={handleclick}
      className={`flex items-center justify-center w-32 h-32 border-2 rounded-2xl 
        cursor-pointer select-none transition-all duration-300 ease-in-out
        ${bgColor} ${textColor}
        ${disabled ? "opacity-60 cursor-not-allowed" : "active:scale-95 hover:scale-105"}
      `}
    >
      {turn === "X" ? (
        <img className="w-24 h-24" src={cross} alt="X" />
      ) : turn === "O" ? (
        <img className="w-24 h-24" src={circle} alt="O" />
      ) : (
        <div />
      )}
    </div>
  );
}

export default Div;
