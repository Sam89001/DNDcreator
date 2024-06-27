//Views
import Login from './components/Views/Login'
import Register from './components/Views/Register';
import Home from './components/Views/Home';
import AccountEdit from './components/Views/AccountEdit';
import ChooseCharacter from './components/Views/ChooseScreens/ChooseCharacter';
import LoadCharacter from './components/Views/CreateScreens/LoadCharacter'
import LoadCharacterPageTwo from './components/Views/CreateScreens/LoadCharacterTwo'
import LoadCharacterPageThree from './components/Views/CreateScreens/LoadCharacterThree'
import ChoosePlaySession from './components/Views/ChooseScreens/ChoosePlaySession';
import PlaySession from './components/Views/PlaySessionScreens/PlaySessionScreen';
import ChooseSession from './components/Views/ChooseScreens/ChooseSession';
import PlayHostSession from './components/Views/HostSessionScreens/HostSessionScreen'
import { UserContextProvider } from './context/userContext';

//Router
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter, Navigate } from 'react-router-dom'
import AuthenticatedRoutes from './verification/AuthenticatedRoutes';
//Dependencies
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

//axios
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL; //|| 'http://localhost:4000'
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
                <Route path="LoadCharacter/:id" element={<LoadCharacter/>}/>
                <Route path="LoadCharacter/:id/2" element={<LoadCharacterPageTwo/>}/>
                <Route path="LoadCharacter/:id/3" element={<LoadCharacterPageThree/>}/>
                <Route path="ChoosePlaySession" element={<ChoosePlaySession/>}/>
                <Route path="PlaySession/:id" element={<PlaySession/>}/>
                <Route path="ChooseSession" element={<ChooseSession/>}/>
                <Route path="HostSession/:id" element={<PlayHostSession/>}/>
              </Route>
              
            </Routes>
          </main>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
