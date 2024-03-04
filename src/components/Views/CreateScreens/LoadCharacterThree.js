import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast'

import Navbar from '../../Layouts/Navbar';
import { UserContext } from '../../../context/userContext';

//Components
import DndSheetThree from '../../Components/DndSheetThree'
import OtherGeneralStatsForm from '../../Forms/CreateCharacterForms/OtherGeneralStatsForm';

function LoadCharacterPageThree() {
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

	const [updateCharacterStats, setUpdateCharacterStats] = useState({
		characterName: '',
		characterAge: '',
		characterEyes: '',
		characterHair: '',
		characterHeight: '',
		characterSkin: '',
		characterWeight: '',
	})

	const getCharacterData = async (characterId) => {
		try {
			const sentId = characterId ;
			const number = '2'
			const response = await axios.get('/CreateCharacter/' + number + '/' + sentId);
			const characterData = response.data;
			console.log('This is the character data:', JSON.stringify(characterData, null, 2));

			setUpdateCharacterStats({
				characterName: characterData.character.characterName,
				characterAge: characterData.character.characterAge,
				characterEyes: characterData.character.characterEyes,
				characterHair: characterData.character.characterHair,
				characterHeight: characterData.character.characterHeight,
				characterSkin: characterData.character.characterSkin,
				characterWeight: characterData.character.characterWeight,
			})

		} catch (error) {

		}
	}
	const updateCharacterStatsFunction = (newCharacterData) => {
		setUpdateCharacterStats(newCharacterData);
	}


return (
  <div style={{paddingBottom: '20px'}}>
		<nav className='navigation-bar'>
      <Navbar navigationTitle="Character Menu" navigationTitleLink="/ChooseCharacter" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
    </nav>

		<div className='row' style={{paddingTop: '85px', maxWidth: '1900px', minWidth: '1500px'}}>

			<div className="col-5" style={{ color: 'white', padding: '10px 30px 30px 30px' }}>
				<DndSheetThree 
				propId={characterId} 
				characterName={updateCharacterStats ? updateCharacterStats.characterName : ''}
				characterAge={updateCharacterStats ? updateCharacterStats.characterAge : ''}
				characterEyes={updateCharacterStats ? updateCharacterStats.characterEyes : ''}
				characterHair={updateCharacterStats ? updateCharacterStats.characterHair : ''}
				characterHeight={updateCharacterStats ? updateCharacterStats.characterHeight : ''}
				characterSkin={updateCharacterStats ? updateCharacterStats.characterSkin : ''}
				characterWeight={updateCharacterStats ? updateCharacterStats.characterWeight : ''}/>
      </div>

			<div className="col-7" style={{ color: 'white' }}>

				<div className='w-100 d-flex align-items-center justify-content-between'>
					<header className="form-header">Create Your Character</header>
					<div className="d-flex">
						<header className="navbar-text mr-3" onClick={() => nextPage('/LoadCharacter/' + characterId.Id + '/2')} >&lt; Spells Page </header>
					</div>
				</div>

				<div className="row">

					<div className='col-8'>
						<OtherGeneralStatsForm
						propId={characterId} 
						updateCharacterStatsFunction={updateCharacterStatsFunction}/>
					</div>

					<div className='col-4'> Test

					</div>

				</div>

			</div>

		</div>
	</div>
)
}

export default LoadCharacterPageThree;