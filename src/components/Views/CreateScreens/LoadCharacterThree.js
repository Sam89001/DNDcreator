import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast'

import Navbar from '../../Layouts/Navbar';
import { UserContext } from '../../../context/userContext';

//Components
import DndSheetThree from '../../Components/DndSheetThree'
import OtherGeneralStatsForm from '../../Forms/CreateCharacterForms/OtherGeneralStatsForm';
import ImageUploadForm from '../../Forms/ImageUploadForm';

//Images
import QuestionMarkImage from '../../../images/Question Mark Graphic.png'

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
		characterTextAppearence: '',
		characterFaceImage: '',
		characterBodyImage: '',
		characterBackstory: '',
	})
	const [updateCharacterTreasure, setUpdateCharacterTreasure] = useState([])
	const [updateCharacterOrganisation, setUpdateCharacterOrganisation] = useState([])

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
				characterTextAppearence: characterData.character.characterTextAppearence,
				characterFaceImage: characterData.character.characterProfileImageAddress,
				characterBodyImage: characterData.character.characterBodyImageAddress,
				characterBackstory: characterData.character.characterBackstory,
			})

			setUpdateCharacterTreasure(characterData.treasure || []);
			setUpdateCharacterOrganisation(characterData.organisation || []);
		} catch (error) {
			console.log(error)
		}
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
				getCharacterData={getCharacterData}
				updateCharacterOrganisation={updateCharacterOrganisation}
				characterName={updateCharacterStats ? updateCharacterStats.characterName : ''}
				characterAge={updateCharacterStats ? updateCharacterStats.characterAge : ''}
				characterEyes={updateCharacterStats ? updateCharacterStats.characterEyes : ''}
				characterHair={updateCharacterStats ? updateCharacterStats.characterHair : ''}
				characterHeight={updateCharacterStats ? updateCharacterStats.characterHeight : ''}
				characterSkin={updateCharacterStats ? updateCharacterStats.characterSkin : ''}
				characterWeight={updateCharacterStats ? updateCharacterStats.characterWeight : ''}
				characterTextAppearence={updateCharacterStats ? updateCharacterStats.characterTextAppearence : ''}
				characterBackstory={updateCharacterStats ? updateCharacterStats.characterBackstory : ''}
				profileImage={"/" + updateCharacterStats.characterFaceImage}
				bodyImage={ "/" + updateCharacterStats.characterBodyImage}
				characterOrganisationSymbol={updateCharacterOrganisation ? updateCharacterOrganisation : ''}
				characterTreasure={updateCharacterTreasure ? updateCharacterTreasure : ''}/>
				
				
      </div>

			<div className="col-7" style={{ color: 'white' }}>

				<div className='w-100 d-flex align-items-center justify-content-between'>
					<header className="form-header">Create Your Character</header>
					<div className="d-flex">
						<header className="navbar-text mr-3" onClick={() => nextPage('/LoadCharacter/' + characterId.Id + '/2')} >&lt; Spells Page </header>
					</div>
				</div>

				<div className="row">

					<div className='col-9'>
						<OtherGeneralStatsForm
						propId={characterId} 
						getCharacterData={getCharacterData}
						updateCharacterStats={updateCharacterStats}
						setUpdateCharacterStats={setUpdateCharacterStats}
						updateCharacterTreasure={updateCharacterTreasure} 
						setUpdateCharacterTreasure={setUpdateCharacterTreasure}
						updateCharacterOrganisation={updateCharacterOrganisation}
						setUpdateCharacterOrganisation={setUpdateCharacterOrganisation}/>
					</div>

					<div className='col-3'> 
					
						<div className='d-flex' style={{ maxHeight: '225px', height: '100%', backgroundColor: 'var(--inputGrey)', marginBottom: '10px', padding: '5px' }}>
							<ImageUploadForm 
							getCharacterData={getCharacterData}
							propId={characterId} 
							propAddress={'UploadProfileImage'}
							propMaxWidth={'1000'}
							propMaxHeight={'1000'}/>
						</div>

					 <div style={{maxHeight: '475px', height: '100%', backgroundColor: 'var(--inputGrey)', padding: '5px'}}>
							<ImageUploadForm
							getCharacterData={getCharacterData}
							propId={characterId} 
							propAddress={'UploadBodyImage'}
							propMaxWidth={'1600'}
							propMaxHeight={'1600'}/>
					 </div>

					</div>

				</div>

			</div>

		</div>
	</div>
)
}

export default LoadCharacterPageThree;