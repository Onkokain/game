import hoversound from '../assets/menu_hover.mp3'
import optionselect from '../assets/option_select.mp3'
import useSound from 'use-sound'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'

function Start() {
    const [playhover]=useSound(hoversound,{volume:0.4})
    const[playactive]=useSound(optionselect)
    const states=['New Game','Mode','Exit']
    return(
        <>
        <div className="flex justify-center py-15 h-[90vh]  selection:bg-transparent ">
        <div  className="bg-black flex flex-col gap-6 border-2 hover:border-4 p-5 px-10 rounded-2xl border-gray-300 font-mono hover:scale-105 transition-all duration-500">

            <header class="flex py-5  text-white text-5xl justify-center font-bold ">Tic Tac Toe</header>

           <Link to="/game" className="text-center  text-white text-3xl border-2 p-5 rounded-4xl px-20 italic hover:scale-110 active:scale-[95%] selection:bg-transparent"> <button
  onMouseEnter={playhover}
  onClick={playactive}
>
  New Game
</button> </Link>

<button
  onMouseEnter={playhover}
  onClick={playactive}
  className="text-center  text-white text-3xl border-2 p-5 rounded-4xl px-20 italic hover:scale-110 active:scale-[95%] selection:bg-transparent"
>
  Difficulty
</button>

<button
  onMouseEnter={playhover}
  onClick={playactive}
  className="text-center  text-white text-3xl border-2 p-5 rounded-4xl px-20 italic hover:scale-110 active:scale-[95%] selection:bg-transparent"
>
  Mode
</button>

<button
  onMouseEnter={playhover}
  onClick={playactive}
  className="text-center text-white text-3xl border-2 p-5 rounded-4xl px-20 italic hover:scale-110 active:scale-[95%] selection:bg-transparent"
>
  Exit
</button>


        
        </div>
        </div>
        </>
    );
}
export default Start

