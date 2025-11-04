// Imports
import React, { useState } from 'react'
import { useEffect } from 'react'
import Div from './cells.jsx';
import {winlist,cells} from '../utils/constants.js'
import {HashRouter, Route, Routes, Link, useNavigate} from 'react-router-dom'
import Victoryy from '../assets/victory.mp3'
import useSound from 'use-sound';
import PvP from '../main_game/pvpl.jsx';
import PvB from '../main_game/pvb.jsx';
import PvO from '../main_game/pvpo.jsx';
import UD from '../under_development.jsx'


function Game() {
   const gamemode = localStorage.getItem('currentmode') || 'PvBot'
  const difficulty = localStorage.getItem('currentdifficulty') || 'Easy'
  return (
    <>
    {gamemode=="PvP Local" ? <PvP/>:gamemode=="PvBot"?<PvB/>:<UD/>}
    </>
  )
}
export default Game


