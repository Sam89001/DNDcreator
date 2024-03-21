//css
import '../../../css/Site.css';
import '../../../css/Animations.css';

//Dependencies
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast'

//components
import Navbar from '../../Layouts/Navbar';
import LoadItem from '../../Components/LoadItem';
import DeletePopUp from '../../Components/DeletePopUp';
import { UserContext } from '../../../context/userContext';

//Temp Images
import TempImage from '../../../images/Question Mark Graphic.png'

function ChoosePlaySession() {

  const { user } = useContext(UserContext);
  const [characters, setCharacters] = useState([]);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [deletePopUpId, setDeletePopUpId] = useState({
    selectedId: ''
  })  

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

  //Get Request
  const getCharacters = async (userId) => {
    try {
        const response = await axios.get('/PlaySession/', {
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
        const response = await axios.delete('/PlaySession/DeleteCharacter/' + `${characterId}`);
        if (response.error) {
            toast.error(response.data.error);
        } else {
            if (user && user.id) {
                getCharacters(user.id);
            }
            closeDeletePopUp()
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

      <div className="col-12 d-flex align-items-center justify-content-center page-styling" >
        <header className="header text-center">Choose Your Character</header>
      </div>

      <div className="col-12 text-center justify-content-center align-items-center mb-0" style={{padding: '30px'}}>
        <div className="d-flex character-select-box justify-content-center">
          <div className="row h-100 w-100 d-flex"> 
            
          {Array.isArray(characters) && characters.length > 0 && characters.map((character) => (
            <LoadItem
              key={character._id}
              id={character._id}
              title={character.characterName}
              //link={`/PlaySession/${character._id}`}
              image={character.characterProfileImageAddress ? character.characterProfileImageAddress : TempImage}
              openDeletePopUp={openDeletePopUp}
            />
            ))}

          </div>
        </div>
      </div>

      {deletePopUp && <DeletePopUp closeDeletePopUp={closeDeletePopUp} deleteCharacter={deleteCharacter}/>}
    </div>
  );
}

export default ChoosePlaySession;