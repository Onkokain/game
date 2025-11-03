// Imports
import React, { useState } from 'react'
import { useEffect } from 'react'
import Div from './cells.jsx';
import {winlist,cells} from '../utils/constants.js'
import {HashRouter, Route, Routes, Link, useNavigate} from 'react-router-dom'
import Victoryy from '../assets/victory.mp3'
import useSound from 'use-sound';
import PvP from '../main_game/pvp.jsx';
import PvB from '../main_game/pvb.jsx';
import BvB from '../main_game/bvb.jsx'

function Game() {
   const gamemode = localStorage.getItem('currentmode') || 'Player Vs Bot'
  const difficulty = localStorage.getItem('currentdifficulty') || 'Easy'
  return (
    <>
    {gamemode=="Player Vs Player" ? <PvP/>:gamemode=="Player Vs Bot"&& difficulty=="Easy"?<PvB/>:<BvB/>}
    </>
  )
}
export default Game


