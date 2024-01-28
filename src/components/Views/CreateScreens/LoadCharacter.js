import Navbar from '../../Layouts/Navbar';
import { UserContext } from '../../../context/userContext';

//forms
import GeneralStatsForm from '../../Forms/CreateCharacterForms/GeneralStatsForm';
import SkillsForm from '../../Forms/CreateCharacterForms/SkillsForm';
import MiscStatsForm from '../../Forms/CreateCharacterForms/MiscStatsForm';
import PersonalityTraitForm from '../../Forms/CreateCharacterForms/PersonalityTraitForm';
import ProficiencyForm from '../../Forms/CreateCharacterForms/ProficiencyForm'

//Dependencies
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast'

//Components
import DndSheet from '../../Components/DndSheet'

//Temp Images


function LoadPlaySession() {
  const { user } = useContext(UserContext);
  const [characters, setCharacters] = useState();  
  const [characterData, setCharacterData] = useState({
		characterName: '',
		characterClass: '',
		characterHp: '',
		characterAc: '',
		characterLevel: '',
		characterRace: '',
		characterBackground: '',
		characterAlignment: '',
		characterSpeed: '',
		characterXp: ''
	}) 

  const [characterSkills, setcharacterSkills] = useState({
		characterStrength: '',
		characterDexterity: '',
		characterConstitution: '',
		characterIntelligence: '',
		characterWisdom: '',
		characterCharisma: '',
	}) 

  const [sheetInformation, setSheetInformation] = useState();
    
    useEffect(() => {  
      const characterId = window.location.pathname.split('/').pop();

      axios
        .get('/CreateCharacter/' + characterId)
        .then((response) => {
          const characterData = response.data;

          setCharacterData({
            characterName: characterData.characterName || '',
            characterClass: characterData.characterClass || '',
            characterHp: characterData.characterHp || '',
            characterAc: characterData.characterAc || '',
            characterLevel: characterData.characterLevel || '',
            characterRace: characterData.characterRace || '',
            characterBackground: characterData.characterBackground || '',
            characterAlignment: characterData.characterAlignment || '',
            characterSpeed: characterData.characterSpeed || '',
            characterXp: characterData.characterXp || ''
          });
    
          setcharacterSkills({
            characterStrength: characterData.characterStrength || '',
            characterDexterity: characterData.characterDexterity ||'',
            characterConstitution: characterData.characterConstitution ||'',
            characterIntelligence: characterData.characterIntelligence ||'',
            characterWisdom: characterData.characterWisdom ||'',
            characterCharisma: characterData.characterCharisma ||'',
          });
    
          // Update characters state (if needed)
          setCharacters(characterData);

          console.log('This is the character data:', JSON.stringify(characterData, null, 2));
        })
        .catch((err) => {
          console.error('Error fetching character data:', err);
          toast.error('Error fetching character data');
        });
    }, []);

    const updateCharacterData = (newCharacterData) => {
      setCharacterData(newCharacterData);
    }
  
    return (
      <div>
        <nav className='navigation-bar'>
          <Navbar navigationTitle="Character Menu" navigationTitleLink="/ChooseCharacter" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
        </nav>
  
        <div className='row' style={{paddingTop: '85px', maxWidth: '1900px', minWidth: '1500px'}}>

          {/* Character Sheet */}
  
          <div className="col-5" style={{ color: 'white', padding: '0px 50px 50px 50px' }}>
            <DndSheet
            characterName={characterData ? characterData.characterName : ''}
            characterClass={characterData ? characterData.characterClass : ''}
            characterLevel={characterData ? characterData.characterLevel : ''}
            characterBackground={characterData ? characterData.characterBackground : ''}
            characterRace={characterData ? characterData.characterRace : ''}
            characterAlignment={characterData ? characterData.characterAlignment : ''}
            characterXp={characterData ? characterData.characterXp : ''}
            characterUser={user ? user.name : ''}
            characterStrength= {characterData ? characterData.characterStrength : ''}
            characterDexterity= {characterData ? characterData.characterDexterity : ''}
            characterConstitution={characterData ? characterData.characterConstitution : ''}
            characterIntelligence={characterData ? characterData.characterIntelligence : ''}
            characterWisdom={characterData ? characterData.characterWisdom : ''}
            characterCharisma={characterData ? characterData.characterCharisma : ''}
            />
          </div>

          {/* Form Fields */}
  
          <div className="col-7" style={{ color: 'white' }}>

            <div className='w-100 d-flex align-items-center'>
              <header className="form-header">Create Your Character</header>
            </div>
  
            <div className='row'>
                              
              <div className='col-3'>
                <div style={{paddingBottom: '22px'}}>
                  <SkillsForm updateCharacterData={updateCharacterData}/>
                </div>
                <MiscStatsForm/>
              </div>
      
              <div className='col-9'>
                <div className='row' style={{maxWidth: '900px'}}>
      
                  <div className='col-12' style={{paddingBottom: '20px'}}>
                    <GeneralStatsForm updateCharacterData={updateCharacterData}/>
                  </div>

                  <div className='col-7'>
                    <ProficiencyForm></ProficiencyForm>
                  </div>
      
                  <div className='col-5'>
                    <PersonalityTraitForm></PersonalityTraitForm>
                  </div>
                </div>
              </div>

            </div>
          
          </div>
        </div>
      </div>
    );
  }
  
  export default LoadPlaySession;