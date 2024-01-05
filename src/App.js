//Views
import Login from './components/Views/Login'
import Register from './components/Views/Register';

//Router
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="Register" element={<Register/>}/>
        </Routes>
      </main>    </BrowserRouter>
  );
}

export default App;
