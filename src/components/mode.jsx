import hoversound from '../assets/menu_hover.mp3'
import optionselect from '../assets/option_select.mp3'
import useSound from 'use-sound'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import { states_mode } from '../utils/constants'
import { useState } from 'react'
import wrongs from '../assets/wrong.mp3'
function Mode() {
  const set_volume=localStorage.getItem('volume')|| 0.5
    const [playhover]=useSound(hoversound,{volume:set_volume})
    const[playactive]=useSound(optionselect,{volume:set_volume})
       const[playwrong]=useSound(wrongs,{volume:set_volume})
    const [clicked,setclicked]=useState(() => {
  const saved = localStorage.getItem('modeClicked')
  return saved !== null && saved!==3 ? Number(saved) : null
})

    return(
        <>
        <div className="flex justify-center py-15 h-[90vh]  selection:bg-transparent ">
        <div  className="bg-black flex flex-col gap-6 border-2 hover:border-4 p-5 px-10 rounded-2xl border-gray-300 font-mono hover:scale-105 transition-all duration-500 shadow-[0_0_20px_white]">

            <header class="flex py-5  text-white text-5xl justify-center font-bold ">Tic Tac Toe</header>
          {states_mode.map((item,index)=>(<Link  onMouseEnter={playhover}
  onClick={()=>{index!=clicked?playactive():playwrong()
                setclicked(index)
                localStorage.setItem('modeClicked',index)
                localStorage.setItem('currentmode',item.name)
              }}
  className={`w-85 text-center text-white text-3xl border-2 p-5 rounded-3xl px-20 italic selection:bg-transparent ${index===clicked? 'text-white/50  border-4' : 'hover:scale-110 active:scale-[95%] '}`} to={item.path}>{item.name}</Link>))}
        <Link to='/' onMouseEnter={playhover}
  onClick={playactive} className="text-center  text-white text-3xl border-2 p-5 rounded-3xl px-20 italic hover:scale-110 active:scale-[95%] selection:bg-transparent" >Return</Link>



        
        </div>
        </div>
        </>
    );
}
export default Mode

