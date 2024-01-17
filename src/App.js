//Views
import Login from './components/Views/Login'
import Register from './components/Views/Register';
import Home from './components/Views/Home';
import AccountEdit from './components/Views/AccountEdit';
import ChooseCharacter from './components/Views/ChooseScreens/ChooseCharacter';
import CreateCharacter from './components/Views/CreateScreens/CreateCharacter'
import ChoosePlaySession from './components/Views/ChooseScreens/ChoosePlaySession';
import ChooseSession from './components/Views/ChooseScreens/ChooseSession';
import { UserContextProvider } from './context/userContext';

//Router
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter, Navigate } from 'react-router-dom'
import AuthenticatedRoutes from './verification/AuthenticatedRoutes';
//Dependencies
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

//axios
axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/Login" />} />
              <Route path="Login" element={<Login/>}/>
              <Route path="Register" element={<Register/>}/>
              <Route element={<AuthenticatedRoutes/>}>
                <Route path="Home" element={<Home/>}/>
                <Route path="AccountEdit" element={<AccountEdit/>}/>
                <Route path="ChooseCharacter" element={<ChooseCharacter/>}/>
                <Route path="CreateCharacter" element={<CreateCharacter/>}/>
                <Route path="ChoosePlaySession" element={<ChoosePlaySession/>}/>
                <Route path="ChooseSession" element={<ChooseSession/>}/>
              </Route>
            </Routes>
          </main>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
