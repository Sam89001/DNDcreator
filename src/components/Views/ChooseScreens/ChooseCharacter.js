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
import TempImage from '../../../images/temp-character.jpg'

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
    const fetchData = async () => {
      try {
        // Make a GET request to your API endpoint
        const response = await axios.get('http://localhost:4000/CreateCharacter');

        // Assuming the response data is an array of character objects
        const characterData = response.data;

        // Update the characters state with the fetched data
        setCharacters(characterData);
      } catch (error) {
        console.error('Error fetching character data:', error);
        // Display a toast notification for the error
        toast.error('Error fetching character data');
      }
    };

    // Call the asynchronous function
    fetchData();
  }, []);



  return (
    <div>
      <nav className='navigation-bar'>
        <Navbar navigationTitle="Main Menu" navigationTitleLink="/Home" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
      </nav>

      <div className="col-12 d-flex align-items-center justify-content-center page-styling">
        <header className="header text-center">Choose Your Character</header>
      </div>

      <h1>{!!user && (user.id)}</h1>

      <div className="col-12 text-center justify-content-center align-items-center mb-0" style={{padding: '30px'}}>
        <div className="d-flex character-select-box justify-content-center" >
          <div className="row h-100 w-100 d-flex" >  
            <Create title="Create a Character" openPopUp={openPopUp} />
            {/* Map through characters and render LoadItem components */}

            {characters.map((character) => (
              <LoadItem
                key={character._id}  // Assuming _id is the unique identifier in your character data
                title={character.name}
                link={`/LoadCharacter/${character._id}`}  // Use the character's unique id in the link
                image={TempImage}  // Replace with the actual image source from character data
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
