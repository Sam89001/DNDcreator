//css
import '../../../css/Site.css';
import '../../../css/Animations.css';

//components
import Navbar from '../../Layouts/Navbar';
import Create from '../../Components/Create';
import LoadItem from '../../Components/LoadItem';
import PopUp from '../../Components/PopUp';
import DeletePopUp from '../../Components/DeletePopUp';
import { UserContext } from '../../../context/userContext';

//Dependencies
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast'

//Temp Images
import TempImage from '../../../images/Question Mark Graphic.png'


function ChooseSession() {
  const { user } = useContext(UserContext);
  const [popUp, setPopUp] = useState(false);
  const [sessions, setSessions] = useState([]);

  const openPopUp = () => {
    setPopUp(true)
  }
  const closePopUp = () => {
    setPopUp(false)
  }

  const getSession = async (userId) => {
    try {
        const response = await axios.get('/HostSession/', {
          params: {
            userId: userId,
          },
        });
        const sessionData = response.data;
        setSessions(sessionData);
    } catch (err) {
        console.error('Error fetching character data:', err);
        toast.error('Error fetching character data');
    }
  };
  //Get Request
  useEffect(() => {
      if (user && user.id) {
        getSession(user.id);
      }
  }, [user]);

  return (
    <div>
      <nav className='navigation-bar'>
        <Navbar navigationTitle="Main Menu" navigationTitleLink="/Home" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
      </nav>

      <div className="col-12 d-flex align-items-center justify-content-center page-styling" >
        <header className="header text-center">Choose Your Session</header>
      </div>

      <div className="col-12 text-center justify-content-center align-items-center mb-0" style={{padding: '30px'}}>
        <div className="d-flex character-select-box justify-content-center">
          <div className="row h-100 w-100 d-flex"> 
            <Create title="Create a Session" openPopUp={openPopUp}/>

            {Array.isArray(sessions) && sessions.length > 0 && sessions.map((session) => (
            <LoadItem
              key={session._id}
              id={session._id}
              title={session.sessionName}
              link={`/HostSession/${session._id}`}
              image={session.sessionImage ? session.sessionImage : TempImage}
              //openDeletePopUp={openDeletePopUp}
            />
            ))}
          </div>
        </div>
      </div>

    {popUp && <PopUp closePopUp={closePopUp} popUpTitle='Create Session' formType='createSessionForm' />}

    </div>
  );
}

export default ChooseSession;