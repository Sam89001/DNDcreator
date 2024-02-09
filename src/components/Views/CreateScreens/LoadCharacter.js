import Navbar from '../../Layouts/Navbar';
import { UserContext } from '../../../context/userContext';

//forms
import GeneralStatsForm from '../../Forms/CreateCharacterForms/GeneralStatsForm';
import SkillsForm from '../../Forms/CreateCharacterForms/SkillsForm';
import MiscStatsForm from '../../Forms/CreateCharacterForms/MiscStatsForm';
import PersonalityTraitForm from '../../Forms/CreateCharacterForms/PersonalityTraitForm';
import IdealsForm from '../../Forms/CreateCharacterForms/IdealsForm';
import BondsForm from '../../Forms/CreateCharacterForms/BondsForm';
import FlawsForm from '../../Forms/CreateCharacterForms/FlawsForm';
import ProficiencyForm from '../../Forms/CreateCharacterForms/ProficiencyForm';

//Dependencies
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast'

//Components
import DndSheet from '../../Components/DndSheet'

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
		characterXp: '',
    characterAc: '',
    characterInt: '',
    characterSpeed: '',
	}) 
  const [characterSkills, setCharacterSkills] = useState({
		characterStrength: '',
		characterDexterity: '',
		characterConstitution: '',
		characterIntelligence: '',
		characterWisdom: '',
		characterCharisma: '',
	}) 
  const [characterMiscStats, setCharacterMiscStats] = useState({
		characterInspiration: '',
		characterProficiencyBonus: '',
		characterPerception: '',
		characterHitDice: '',
	})
  
  const [characterPersonalityTraits, setCharacterPersonalityTraits] = useState([]);
  const [characterIdeals, setCharacterIdeals] = useState([]);
  const [characterBonds, setCharacterBonds] = useState([]);
  const [characterFlaws, setCharacterFlaws] = useState([]);
  
    const fetchData = async () => {
      try {
        const characterId = window.location.pathname.split('/').pop();
        const response = await axios.get('/CreateCharacter/' + characterId);
        const characterData = response.data;

        setCharacterData({
          characterName: characterData.character.characterName || '',
          characterClass: characterData.character.characterClass || '',
          characterHp: characterData.character.characterHp || '',
          characterAc: characterData.character.characterAc || '',
          characterLevel: characterData.character.characterLevel || '',
          characterRace: characterData.character.characterRace || '',
          characterBackground: characterData.character.characterBackground || '',
          characterAlignment: characterData.character.characterAlignment || '',
          characterSpeed: characterData.character.characterSpeed || '',
          characterXp: characterData.character.characterXp || '',
          characterHP: characterData.character.characterHp || ''
        });
        setCharacterSkills({
          characterStrength: characterData.character.characterStrength || '',
          characterDexterity: characterData.character.characterDexterity || '',
          characterConstitution: characterData.character.characterConstitution || '',
          characterIntelligence: characterData.character.characterIntelligence || '',
          characterWisdom: characterData.character.characterWisdom || '',
          characterCharisma: characterData.character.characterCharisma || ''
        });
        setCharacterMiscStats({
          characterInspiration: characterData.character.characterInspiration || '',
          characterProficiencyBonus: characterData.character.characterProficiencyBonus || '',
          characterPerception: characterData.character.characterPerception || '',
          characterHitDice: characterData.character.characterHitDice || ''
        });
        setCharacterPersonalityTraits(characterData.personalityTraits || []);
        setCharacterIdeals(characterData.ideals || []);
        setCharacterBonds(characterData.bonds || []);
        setCharacterFlaws(characterData.flaws || []);
        

        console.log('This is the character data:', JSON.stringify(characterData, null, 2));
      } catch (error) {
        console.error('Error fetching character data:', error);
        toast.error('Error fetching character data');
      }
    };
    useEffect(() => {
      fetchData();
    }, []);

    const updateCharacterData = (newCharacterData) => {
      setCharacterData(newCharacterData);
    }
    const updateCharacterSkills = (newSkillsData) => {
      setCharacterSkills(newSkillsData);
    }
    const updateCharacterMisc = (newcharacterMiscStats) => {
      setCharacterMiscStats(newcharacterMiscStats);
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
            fetchData={fetchData}
            characterName={characterData ? characterData.characterName : ''}
            characterClass={characterData ? characterData.characterClass : ''}
            characterLevel={characterData ? characterData.characterLevel : ''}
            characterBackground={characterData ? characterData.characterBackground : ''}
            characterRace={characterData ? characterData.characterRace : ''}
            characterAlignment={characterData ? characterData.characterAlignment : ''}
            characterXp={characterData ? characterData.characterXp : ''}
            characterUser={user ? user.name : ''}
            characterAC={characterData ? characterData.characterAc : ''}
            characterInt={characterData ? characterData.characterInitiative : ''}
            characterSpeed={characterData ? characterData.characterSpeed: ''}
            characterHP={characterData ? characterData.characterHp: ''}

            characterStrength={characterSkills ? characterSkills.characterStrength : ''}
            characterDexterity={characterSkills ? characterSkills.characterDexterity : ''}
            characterConstitution={characterSkills ? characterSkills.characterConstitution : ''}
            characterIntelligence={characterSkills ? characterSkills.characterIntelligence : ''}
            characterWisdom={characterSkills ? characterSkills.characterWisdom : ''}
            characterCharisma={characterSkills ? characterSkills.characterCharisma : ''}
            characterInspiration={characterMiscStats ? characterMiscStats.characterInspiration : ''}
            characterProficiencyBonus={characterMiscStats ? characterMiscStats.characterProficiencyBonus : ''}
            characterPerception={characterMiscStats ? characterMiscStats.characterPerception : ''}
            characterHitDice={characterMiscStats ? characterMiscStats.characterHitDice : ''}

            characterPersonalityTraits={characterPersonalityTraits}
            characterIdeals={characterIdeals}
            characterBonds={characterBonds}
            characterFlaws={characterFlaws}
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
                  <SkillsForm updateCharacterSkills={updateCharacterSkills}/>
                </div>
                <MiscStatsForm updateCharacterMisc={updateCharacterMisc}/>
              </div>
      
              <div className='col-9'>
                <div className='row' style={{maxWidth: '900px'}}>
      
                  <div className='col-12' style={{paddingBottom: '20px'}}>
                    <GeneralStatsForm updateCharacterData={updateCharacterData}/>
                  </div>

                  <div className='col-7'>
                    <ProficiencyForm></ProficiencyForm>
                  </div>
      
                  <div className='col-5' style={{paddingBottom: '10px'}}>
                    <PersonalityTraitForm characterPersonalityTraits={characterPersonalityTraits} setCharacterPersonalityTraits={setCharacterPersonalityTraits} fetchData={fetchData}/>
                  </div>

                  <div className='col-7'>
                    
                  </div>

                  <div className='col-5' style={{paddingBottom: '10px'}}>
                    <IdealsForm characterIdeals={characterIdeals} setCharacterIdeals={setCharacterIdeals} fetchData={fetchData}/>
                  </div>

                  <div className='col-7'>
                    
                  </div>

                  <div className='col-5' style={{paddingBottom: '10px'}}>
                    <BondsForm characterBonds={characterBonds} setCharacterBonds={setCharacterBonds} fetchData={fetchData}/>
                  </div>

                  <div className='col-7'>
                    
                  </div>

                  <div className='col-5'>
                    <FlawsForm characterFlaws={characterFlaws} setCharacterFlaws={setCharacterFlaws} fetchData={fetchData}/>
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