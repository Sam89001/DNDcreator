//css
import '../../../css/Site.css';
import '../../../css/Animations.css';

//components
import Navbar from '../../Layouts/Navbar';
import Create from '../../Components/Create'
import LoadItem from '../../Components/LoadItem';
import PopUp from '../../Components/PopUp';
import { UserContext } from '../../../context/userContext';

//Dependencies
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast'

//Temp Images
import TempImage from '../../../images/Question Mark Graphic.png'

function ChooseCharacter() {
  const { user } = useContext(UserContext);
  const [popUp, setPopUp] = useState(false);
  const [characters, setCharacters] = useState([]);  

  //Pop Ups

  const openPopUp = () => {
    setPopUp(true)
  }
  const closePopUp = () => {
    setPopUp(false)
  }

  //Get Request

  useEffect(() => {
    // Check if user and user.id are present before making the API request
    if (user && user.id) {
      axios
        .get('/CreateCharacter/', {
          params: {
            userId: user.id,
          },
        })
        .then((response) => {
          const characterData = response.data;
          setCharacters(characterData);
        })
        .catch((err) => {
          console.error('Error fetching character data:', err);
          toast.error('Error fetching character data');
        });
    }
  }, [user]);


  return (
    <div>
      <nav className='navigation-bar'>
        <Navbar navigationTitle="Main Menu" navigationTitleLink="/Home" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
      </nav>

      <div className="col-12 d-flex align-items-center justify-content-center page-styling">
        <header className="header text-center">Choose Your Character</header>
      </div>

      {/*<h1>{!!user && (user.id)}</h1>*/}

      <div className="col-12 text-center justify-content-center align-items-center mb-0" style={{padding: '30px'}}>
        <div className="d-flex character-select-box justify-content-center" >
          <div className="row h-100 w-100 d-flex" >  
            <Create title="Create a Character" openPopUp={openPopUp} />

            {/* Map through characters and render LoadItem components */}     

            {Array.isArray(characters) && characters.length > 0 && characters.map((character) => (
            <LoadItem
              key={character._id}
              title={character.characterName}
              link={`/LoadCharacter/${character._id}`}
              image={character.characterProfileImageAddress ? character.characterProfileImageAddress : TempImage}
            />
            ))}
            
          </div>
        </div>
      </div>

      {popUp && <PopUp closePopUp={closePopUp} popUpTitle='Create Your Character' formType='createCharacterForm' />}
    </div>
  );
}

export default ChooseCharacter;
