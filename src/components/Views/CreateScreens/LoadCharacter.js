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

//Temp Images
import DndSheet from '../../../images/sheet1.jpg'

function LoadPlaySession() {
  const { user } = useContext(UserContext);
  const [characters, setCharacters] = useState([]);  
    
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
  
        <div className='row' style={{paddingTop: '85px'}}>
  
          <div className="col-4" style={{ color: 'white', padding: '20px' }}>
            <img className="img-fluid" src={DndSheet} alt="Character Image" />
          </div>
  
          <div className="col-8" style={{ color: 'white' }}>

            <div className='w-100 d-flex align-items-center'>
              <header className="form-header">Create Your Character</header>
            </div>
  
              <div className='row'>
                              
                <div className='col-2'>
                  <SkillsForm/>
                  <MiscStatsForm/>
                </div>
      
                <div className='col-10'>
                  <div className='row' style={{maxWidth: '900px'}}>
      
                    <div className='col-12' >
                      <GeneralStatsForm/>
                    </div>

                    <div className='col-7'>
                      <GeneralStatsForm/>
                    </div>
      
                    <div className='col-5'>
                      <GeneralStatsForm/>
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