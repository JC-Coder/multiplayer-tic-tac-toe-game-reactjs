import './App.css';
import Home from './Pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Play from './Pages/Play';
import WaitingRoom from './Pages/WaitingRoom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/play" element={<Play />}></Route>
        <Route path="/waiting" element={<WaitingRoom />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
