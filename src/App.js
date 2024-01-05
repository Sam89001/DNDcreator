//Views
import Login from './components/Views/Login'


//Router
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Login/>}/>

        </Routes>
      </main>    </BrowserRouter>
  );
}

export default App;
