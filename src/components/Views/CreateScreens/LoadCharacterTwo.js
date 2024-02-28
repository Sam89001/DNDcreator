import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast'

import Navbar from '../../Layouts/Navbar';
import { UserContext } from '../../../context/userContext';

//Components
import DndSheetTwo from '../../Components/DndSheetTwo'
import SpellsForm from '../../Forms/CreateCharacterForms/SpellsForm';

function LoadCharacterPageTwo() {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const [characterId, setUserId] = useState({
    Id: ''
  })

	const fetchData = async () => {
		try {
			const characterId = window.location.pathname.split('/')[2];
			setUserId({Id: characterId })
			getCharacterData(characterId);
		} catch (error) {
			console.log(error)
		}
	}; useEffect(() => {
		fetchData();
	}, []);

	const nextPage = async (value) => {
    try {
      const sentId = characterId.Id ; // Accessing the userId from the state object
      console.log("This is the id: " + sentId); 
      const response = await axios.get(`http://localhost:4000/CreateCharacter/NextPage/${sentId}`);
      if (!response) {
        toast.error('An error occurred while fetching data.');
        return; 
      }
      const id = response.data.mongoId._id;
      console.log("Mongo ID:", id); 
      navigate(value);
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again later.');
    }
  };

	const getCharacterData = async (characterId) => {
		try {
			const sentId = characterId ;
			const number = '2'
			const response = await axios.get('/CreateCharacter/' + number + '/' + sentId);
			const characterData = response.data;
			console.log('This is the character data:', JSON.stringify(characterData, null, 2));

		} catch (error) {

		}
	}

return (
  <div style={{paddingBottom: '20px'}}>
		<nav className='navigation-bar'>
      <Navbar navigationTitle="Character Menu" navigationTitleLink="/ChooseCharacter" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
    </nav>

		<div className='row' style={{ paddingTop: '85px', maxWidth: '1900px', minWidth: '1500px'}}>

			<div className="col-5" style={{ color: 'white', padding: '10px 0px 0px 30px' }}>
				<DndSheetTwo fetchData={fetchData}/>
      </div>

			<div className="col-7" style={{color: 'white', maxHeight: '830px' }}>
				<div className='w-100 d-flex align-items-center justify-content-between'>
					<header className="form-header">Create Your Character</header>
					<div className="d-flex">
						<header className="navbar-text mr-3" onClick={() => nextPage('/LoadCharacter/' + characterId.Id)} style={{paddingRight: '10px'}}>&lt; Previous Page </header>
						<header className="navbar-text" onClick={() => nextPage('/LoadCharacter/' + characterId.Id + '/3')} style={{paddingLeft: '10px'}}>Next Page &gt;</header>
					</div>
				</div>

				<div style={{overflowY: 'auto', paddingBottom: '20px'}}>
					<SpellsForm propId={characterId}/>
				</div>

			</div>

		</div>
	</div>
)
}

export default LoadCharacterPageTwo;