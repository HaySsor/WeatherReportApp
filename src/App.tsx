import {Routes, BrowserRouter, Route} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import style from './App.module.css';
import Form from './pages/Form';
import Weather from './pages/Weather.js';

function App() {
  return (
    <div className={style.appContener}>
      <h1 className={style.title}>Weather App</h1>
      <div className={style.appBody}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Form />} />
            <Route path='/weather' element={<Weather />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
