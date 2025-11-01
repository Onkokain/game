// Imports
import Game from './components/game.jsx'
import Start from './components/Start.jsx'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
function App() {
  return (
  <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start/>} />
      <Route path='/game' element={<Game/>} />
    </Routes>
    </BrowserRouter>
    
  </>
);
}
export default App




