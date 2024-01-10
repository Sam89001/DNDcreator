//Views
import Login from './components/Views/Login'
import Register from './components/Views/Register';
//Router
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter, Navigate } from 'react-router-dom'
//Dependencies
import axios from 'axios';

//axios
axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true;

function App() {

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="Login" element={<Login/>}/>
          <Route path="Register" element={<Register/>}/>
        </Routes>
      </main>    
    </BrowserRouter>
  );
}

export default App;
