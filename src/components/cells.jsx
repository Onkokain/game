
import { useState } from "react"
import circle from '../assets/circle.png'
import cross from '../assets/cross.png'
import useSound from 'use-sound'
import optionselect from '../assets/select_button.mp3'
import wrongs from '../assets/wrong.mp3'

function Cell({player,setplayer,id,handlemove}) {
    const[turn,setturn]=useState(null);
      const [clicksound]=useSound(optionselect)
       const [wrong]=useSound(wrongs,{volume:0.3})

    const handleclick=() => {
        if (turn) {
            wrong();
            return;
        }
        clicksound();
        setturn(player);
        setplayer(player==="X"? "O": "X");
        setTimeout(() => { handlemove(id,player)
        
        },0);

    }

    return(
        <div className='flex items-center justify-center w-32  h-32 border-3 border-blue-600 rounded-xl gap-3 hover:scale-105 hover:bg-gray-800 transition-all active:scale-95 ' onClick={handleclick}>
            {turn==='X'? <img className=" w-24 h-24" src={cross}  />  :turn==="O"? <img src={circle}  className="w-24 h-24 " /> : <div/> }
        </div> 
    );
}

export default  Cell



