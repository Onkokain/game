// Imports
import Difficulty from './components/difficulty.jsx';
import End from './components/end.jsx'
import Game from './components/game.jsx'
import Start from './components/Start.jsx'
import Mode from './components/mode.jsx'

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
      <Route path='mode' element={<Mode/>}/>
    </Routes>
    </HashRouter>
    
  </>
);
}
export default App




