// Imports
import Difficulty from './components/difficulty.jsx';
import End from './components/end.jsx'
import Game from './components/game.jsx'
import Start from './components/Start.jsx'
import Mode from './components/mode.jsx'
import UD from './under_development.jsx'
import Settings from './components/settings.jsx';
import PvB from "./main_game/pvb.jsx"

import {HashRouter, Route, Routes, Link} from 'react-router-dom'
function App() {
  return (
  <>
    <HashRouter>
    <Routes>
      <Route path='/' element={<Start/>} />
      <Route path='/game' element={<Game/>} />
      <Route path='/end' element={<End/>}/>
      <Route path='/difficulty' element={<Difficulty/>}/>
      <Route path='/mode' element={<Mode/>}/>
      <Route path='/underdevelopment' element={<UD/>}/>
      <Route path='/settings' element={<Settings/>}/>
      <Route path="/pvb" element={<PvB />} />  
    </Routes>
    </HashRouter>
    
  </>
);
}
export default App




