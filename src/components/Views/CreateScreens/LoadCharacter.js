import Navbar from '../../Layouts/Navbar';
import { UserContext } from '../../../context/userContext';

//forms
import GeneralStatsForm from '../../Forms/CreateCharacterForms/GeneralStatsForm';
import SkillsForm from '../../Forms/CreateCharacterForms/SkillsForm';
import MiscStatsForm from '../../Forms/CreateCharacterForms/MiscStatsForm';

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
  const [sheetInformation, setSheetInformation] = useState();
    
    useEffect(() => {  
      const characterId = window.location.pathname.split('/').pop();

      axios
        .get('/CreateCharacter/' + characterId)
        .then((response) => {
          const characterData = response.data;
          setCharacters(characterData);
          console.log(characterData)
        })
        .catch((err) => {
          console.error('Error fetching character data:', err);
          toast.error('Error fetching character data');
        });
    }, []);
  
    return (
      <div>
        <nav className='navigation-bar'>
          <Navbar navigationTitle="Character Menu" navigationTitleLink="/ChooseCharacter" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
        </nav>
  
        <div className='row' style={{paddingTop: '85px', maxWidth: '1900px'}}>

          {/* Character Sheet */}
  
          <div className="col-5" style={{ color: 'white', padding: '0px 50px 50px 50px' }}>
            <DndSheet
            characterName={characters ? characters.characterName : ''}
            characterClass={characters ? characters.characterClass : 'Working'}
            characterLevel={characters ? characters.characterLevel : 'Working'}
            characterBackground={characters ? characters.characterBackground : 'Working'}
            characterRace={characters ? characters.characterRace : 'Working'}
            characterAlignment={characters ? characters.characterAlignment : 'Working'}
            characterXp={characters ? characters.characterXp : 'Working'}
            />
          </div>

          {/* Form Fields */}
  
          <div className="col-7" style={{ color: 'white' }}>

            <div className='w-100 d-flex align-items-center'>
              <header className="form-header">Create Your Character</header>
            </div>
  
            <div className='row'>
                              
              <div className='col-3'>
                <div style={{paddingBottom: '10px'}}>
                  <SkillsForm/>
                </div>
                <MiscStatsForm/>
              </div>
      
              <div className='col-9'>
                <div className='row' style={{maxWidth: '900px'}}>
      
                  <div className='col-12' >
                    <GeneralStatsForm/>
                  </div>

                  <div className='col-7'>
                    
                  </div>
      
                  <div className='col-5'>
                    
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