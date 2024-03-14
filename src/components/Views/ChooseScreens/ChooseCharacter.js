//css
import '../../../css/Site.css';
import '../../../css/Animations.css';

//components
import Navbar from '../../Layouts/Navbar';
import Create from '../../Components/Create'
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

function ChooseCharacter() {
  const { user } = useContext(UserContext);
  const [popUp, setPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [deletePopUpId, setDeletePopUpId] = useState({
    selectedId: ''
  })

  const [characters, setCharacters] = useState([]);  

  //Pop Ups

  const openPopUp = () => {
    setPopUp(true)
  }
  const closePopUp = () => {
    setPopUp(false)
  }
  const openDeletePopUp = (e, id) => {
    e.preventDefault()
    setDeletePopUp(true);
    setDeletePopUpId({
      selectedId: id
    })
  }
  const closeDeletePopUp = () => {
    setDeletePopUp(false)
  }

  const getCharacters = async (userId) => {
    try {
        const response = await axios.get('/CreateCharacter/', {
            params: {
                userId: userId,
            },
        });
        const characterData = response.data;
        setCharacters(characterData);
    } catch (err) {
        console.error('Error fetching character data:', err);
        toast.error('Error fetching character data');
    }
  };

  //Get Request
  useEffect(() => {
      if (user && user.id) {
          getCharacters(user.id);
      }
  }, [user]);

  //Delete Request
  const deleteCharacter = async (e) => {
      e.preventDefault();
      const characterId = deletePopUpId.selectedId
      console.log("This is the Id " + characterId)
      try {
          const response = await axios.delete('http://localhost:4000/CreateCharacter/DeleteCharacter/' + `${characterId}`);
          if (response.error) {
              toast.error(response.data.error);
          } else {
              if (user && user.id) {
                  getCharacters(user.id);
              }
              closePopUp()
              toast.success('Successfully deleted');
          }
      } catch (error) {
          console.log(error)
      }
  }

  return (
    <div>
      <nav className='navigation-bar'>
        <Navbar navigationTitle="Main Menu" navigationTitleLink="/Home" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
      </nav>

      <div className="col-12 d-flex align-items-center justify-content-center page-styling">
        <header className="header text-center">Choose Your Character</header>
      </div>

      <div className="col-12 text-center justify-content-center align-items-center mb-0" style={{padding: '30px'}}>
        <div className="d-flex character-select-box justify-content-center" >
          <div className="row h-100 w-100 d-flex" >  
            <Create title="Create a Character" openPopUp={openPopUp} />

            {/* Map through characters and render LoadItem components */}     

            {Array.isArray(characters) && characters.length > 0 && characters.map((character) => (
            <LoadItem
              key={character._id}
              id={character._id}
              title={character.characterName}
              link={`/LoadCharacter/${character._id}`}
              image={character.characterProfileImageAddress ? character.characterProfileImageAddress : TempImage}
              openDeletePopUp={openDeletePopUp}
            />
            ))}
            
          </div>
        </div>
      </div>

      {popUp && <PopUp closePopUp={closePopUp} popUpTitle='Create Your Character' formType='createCharacterForm' />}
      {deletePopUp && <DeletePopUp closeDeletePopUp={closeDeletePopUp} deleteCharacter={deleteCharacter}/>}
    </div>
  );
}

export default ChooseCharacter;
