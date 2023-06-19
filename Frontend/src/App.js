import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import './App.css';
import Navbar from './Components/Navbar';
import Pokemon from './Pokemon';

function App() {
  
  return ( 
    <div>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/:id' element={<Pokemon />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;