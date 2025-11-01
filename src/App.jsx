// Imports
import End from './components/end.jsx'
import Game from './components/game.jsx'
import Start from './components/Start.jsx'

import {HashRouter, Route, Routes, Link} from 'react-router-dom'
function App() {
  return (
  <>
    <HashRouter>
    <Routes>
      <Route path='/' element={<Start/>} />
      <Route path='/game' element={<Game/>} />
      <Route path='/end' element={<End/>}/>
    
    </Routes>
    </HashRouter>
    
  </>
);
}
export default App




