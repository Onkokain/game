import hoversound from '../assets/menu_hover.mp3'
import optionselect from '../assets/option_select.mp3'
import useSound from 'use-sound'

import {HashRouter, Route, Routes, Link, useLocation} from 'react-router-dom'
function End() {
    const location=useLocation();
    const winner=location.state?.winner
   const [playhover]=useSound(hoversound,{volume:0.4})
       const[playactive]=useSound(optionselect)
       const game_type=localStorage.getItem('currentmode')|| "Player Vs Bot"
       console.log(game_type)
    return(
        <>
        <div  className='flex flex-col h-screen w-auto items-center justify-center py-[15%] bg-linear-to-b from-gray-900 to-gray-950 gap-3'>
        <div className='flex shadow-[0_0_20px_white] h-40 w-160 border-4 rounded-4xl border-white items-center justify-center hover:scale-105 transition-all selection:bg-transparent bg-black duration-300'>
        <div  className='font-mono italic font-bold text-white text-6xl'>{game_type==='Player Vs Player'? winner==="X"?"❌ Cross won!":winner==="O"?"🔵 Circle  won!":"It was a draw!":game_type=="Player Vs Bot"?winner==="X"?"❌ You won!":winner==="O"?"You lost!":"It was a draw!":""}</div>
        
        </div>
        <div className='w-screen flex justify-center gap-5 py-4 '>
       <Link to='/game'> <button onMouseEnter={playhover} onClick={playactive} className="text-center  text-white text-3xl border-2 p-5 rounded-4xl px-20 italic hover:scale-110 active:scale-[95%] selection:bg-transparent transition-all duration-200"> Play Again</button> </Link>
       <Link to='/'><button onMouseEnter={playhover} onClick={playactive} className="  text-center  text-white text-3xl border-2 p-5 rounded-4xl px-20 italic hover:scale-110 active:scale-[95%] selection:bg-transparent transition-all duration-200"> Main Menu</button> </Link>
       </div>
        </div>
        
        </>
    )
}
export default End