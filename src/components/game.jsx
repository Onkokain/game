
// Imports
import React, { useState } from 'react'
import { useEffect } from 'react'
import Div from './cells.jsx';
import {winlist,cells} from '../utils/constants.js'
import {HashRouter, Route, Routes, Link, useNavigate} from 'react-router-dom'


function Game() {
  const [player,setplayer]=useState("X");
  const[x,setx]=useState([]);
  const[o,seto]=useState([]);
  const[rst,setrst]=useState([0]);
  const navigate = useNavigate();
// stores move data into x and o
  const handlemove=(id,player) => {
    player==="X"?setx(prev => [...prev,id]): seto(prev=> [...prev,id])
  };
// checks if a player has won or not
  const wincheck=() => {
    for(let i=0;i<8;i++) {
      const wincheck_x=winlist[i].every(item => x.includes(item))
      const wincheck_o=winlist[i].every(item => o.includes(item))
    if (wincheck_o || wincheck_x || x.length+o.length==9) {
      const winner= wincheck_x? "X": wincheck_o? "O": "D"
      navigate('/end',{state:{winner}})
      return true;
    }
  
    }

  }

// invokes the wincheck function after each move
  useEffect(() => {
   const iswin= wincheck();
  }, [x,o]);

  return (
    <>
    <div className="flex items-center justify-center bg-gradient-to-b from-gray-900 to bg-gray-950  h-screen" >
      <div className='border-2 hover:border-4 hover:scale-105 h-160 w-120 border-white rounded-4xl bg-black transition-all duration-500'>
      <div className='flex  text-white font-mono font-bold italic text-6xl justify-center py-15'>Tic Tac Toe</div>
    <div className='flex justify-center items-center'>
     <div className='flex flex-wrap justify-center w-99 h-99  gap-1.5 items-center' key={rst}>
      
    {cells.map(id=>(<Div
      player={player} setplayer={setplayer} id={id} handlemove={handlemove}
    />
    ))}
        
      </div>
     </div>
     </div>
     </div>
     
    </>
  )
}
export default Game


