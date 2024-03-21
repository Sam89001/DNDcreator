//Components
import Navbar from '../../Layouts/Navbar';
import { UserContext } from '../../../context/userContext';
import DndSheet from '../../Components/DndSheet'

//Dependencies
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast'

function PlaySession() {

  const { user } = useContext(UserContext);
	const navigate = useNavigate();
	const [characterId, setUserId] = useState({
    Id: ''
  })

  const fetchData = async () => {
		try {
			const characterId = window.location.pathname.split('/').pop();
			setUserId({Id: characterId })
			getCharacterData(characterId);
		} catch (error) {
			console.log(error)
		}
	}; useEffect(() => {
		fetchData();
	}, []);

  const getCharacterData = async (characterId) => {
		try {
			const sentId = characterId ;
			const number = '2'
			const response = await axios.get('/CreateCharacter/' + number + '/' + sentId);
			const characterData = response.data;
			console.log('This is the character data:', JSON.stringify(characterData, null, 2));


		} catch (error) {
			console.log(error)
		}
	}



  return (
    <div style={{paddingBottom: '20px'}}>

      <nav className='navigation-bar'>
        <Navbar navigationTitle="Character Menu" navigationTitleLink="/ChoosePlaySession" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
      </nav>

      <div className='row mx-auto justify-content-center' style={{paddingTop: '85px', maxWidth: '1900px', minWidth: '1500px'}}> 

        <div className="col-3 d-flex justify-content-center align-items-center">
          <header className="form-header text-center">Combat Stats</header>

        </div>

        <div className="col-4 d-flex justify-content-center align-items-center">
          <header className="form-header text-center">Dice & Damage</header>

        </div>

        <div className="col-5 row d-flex justify-content-center align-items-center">
          <div className='col-12'>
            <header className="form-header text-center">Character Sheet</header>
          </div>

        
        </div>

      </div>

    </div>
  )
}


export default PlaySession