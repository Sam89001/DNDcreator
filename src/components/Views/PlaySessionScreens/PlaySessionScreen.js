//Components
import Navbar from '../../Layouts/Navbar';
import { UserContext } from '../../../context/userContext';
import PlaySessionDndSheet from '../../Components/PlaySession/PlaySessionDndSheet';
import PlaySessionDndSheetTwo from '../../Components/PlaySession/PlaySessionDndSheetTwo';
import PlaySessionDndSheetThree from '../../Components/PlaySession/PlaySessionDndSheetThree';

//Dependencies
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast'

//Images
import dFour from '../../../images/d4.png'
import dSix from '../../../images/d6.png'
import dEight from '../../../images/d8.png'
import dTen from '../../../images/d10.png'
import dTwelve from '../../../images/d12.png'
import dTwenty from '../../../images/d20.png'
import dOneHundred from '../../../images/d100.png'

function PlaySession() {

  const { user } = useContext(UserContext);
	const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const nextPage = () => {
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

	const [characterId, setUserId] = useState({
    Id: ''
  })
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
		characterInspiration: '',
		characterProficiencyBonus: '',
		characterPerception: '',
		characterHitDice: '',
    characterSpellcastingClass: '',
		characterSpellcastingAbility: '',
		characterSpellSaveDC: '',
		characterSpellAttackBonus: '',
		characterSpellSlot1: '',
		characterSpellSlot2: '',
		characterSpellSlot3: '',
		characterSpellSlot4: '',
		characterSpellSlot5: '',
		characterSpellSlot6: '',
		characterSpellSlot7: '',
		characterSpellSlot8: '',
		characterSpellSlot9: '',
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
  const [characterSkills, setCharacterSkills] = useState({
		characterStrength: '',
		characterDexterity: '',
		characterConstitution: '',
		characterIntelligence: '',
		characterWisdom: '',
		characterCharisma: '',
    characterProficiencys: []
	}) 
  const [characterPersonalityTraits, setCharacterPersonalityTraits] = useState([]);
  const [characterIdeals, setCharacterIdeals] = useState([]);
  const [characterBonds, setCharacterBonds] = useState([]);
  const [characterFlaws, setCharacterFlaws] = useState([]);
  const [characterLanguages, setCharacterLanguages] = useState([]);
  const [characterTraits, setCharacterTraits] = useState([]);
  const [characterAttacks, setCharacterAttacks] = useState([]);
  const [characterEquipment, setCharacterEquipment] = useState([]);
  const [characterSavingThrows, setCharacterSavingThrows] = useState([])
  const [characterProfSkills, setCharacterProfSkills] = useState([]) 
  const [characterCurrency, setCharacterCurrency] = useState([])
  const [loadCharacterSpells, setLoadCharacterSpells] = useState([]);
  const [updateCharacterTreasure, setUpdateCharacterTreasure] = useState([])
	const [updateCharacterOrganisation, setUpdateCharacterOrganisation] = useState([])

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
			const response = await axios.get('/PlaySession/' + sentId);
			const characterData = response.data;
			console.log('This is the character data:', JSON.stringify(characterData, null, 2));

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
        characterHP: characterData.character.characterHp || '',
        characterInspiration: characterData.character.characterInspiration || '',
        characterProficiencyBonus: characterData.character.characterProficiencyBonus || '',
        characterPerception: characterData.character.characterPerception || '',
        characterHitDice: characterData.character.characterHitDice || '',

        characterSpellcastingClass: characterData.character.characterSpellcastingClass || '',
				characterSpellcastingAbility: characterData.character.characterSpellcastingAbility || '',
				characterSpellSaveDC: characterData.character.characterSpellSaveDC || '',
				characterSpellAttackBonus: characterData.character.characterSpellAttackBonus || '',

				characterSpellSlot1: characterData.character.characterSpellSlot1 || '',
				characterSpellSlot2: characterData.character.characterSpellSlot2 || '',
				characterSpellSlot3: characterData.character.characterSpellSlot3 || '',
				characterSpellSlot4: characterData.character.characterSpellSlot4 || '',
				characterSpellSlot5: characterData.character.characterSpellSlot5 || '',
				characterSpellSlot6: characterData.character.characterSpellSlot6 || '',
				characterSpellSlot7: characterData.character.characterSpellSlot7 || '',
				characterSpellSlot8: characterData.character.characterSpellSlot8 || '',
				characterSpellSlot9: characterData.character.characterSpellSlot9 || '',
        
        characterName: characterData.character.characterName || '',
				characterAge: characterData.character.characterAge || '',
				characterEyes: characterData.character.characterEyes || '',
				characterHair: characterData.character.characterHair || '',
				characterHeight: characterData.character.characterHeight || '',
				characterSkin: characterData.character.characterSkin || '',
				characterWeight: characterData.character.characterWeight || '',
				characterTextAppearence: characterData.character.characterTextAppearence || '',
				characterFaceImage: characterData.character.characterProfileImageAddress || '',
				characterBodyImage: characterData.character.characterBodyImageAddress || '',
				characterBackstory: characterData.character.characterBackstory || '',
      });
      setCharacterSkills({
        characterStrength: characterData.character.characterStrength || '',
        characterDexterity: characterData.character.characterDexterity || '',
        characterConstitution: characterData.character.characterConstitution || '',
        characterIntelligence: characterData.character.characterIntelligence || '',
        characterWisdom: characterData.character.characterWisdom || '',
        characterCharisma: characterData.character.characterCharisma || '',
        characterProficiencys: characterData.character.characterProficiencys || []
      });
      setCharacterProfSkills(characterData.character.characterSkillProficiencys || [])
      setCharacterSavingThrows(characterData.character.characterSavingThrowProficiencys || [])
      setCharacterPersonalityTraits(characterData.personalityTraits || []);
      setCharacterIdeals(characterData.ideals || []);
      setCharacterBonds(characterData.bonds || []);
      setCharacterFlaws(characterData.flaws || []);
      setCharacterLanguages(characterData.languages || []);
      setCharacterTraits(characterData.traits || []);
      setCharacterAttacks(characterData.attacks || []);
      setCharacterEquipment(characterData.equipment|| []);
      setCharacterCurrency(characterData.currency || [])
      setLoadCharacterSpells(characterData.spells || [])
      setUpdateCharacterTreasure(characterData.treasure || []);
			setUpdateCharacterOrganisation(characterData.organisation || []);
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

        {/* Dice Rolling */}
        
        <div className="col-4 row d-flex justify-content-center align-items-center">
          {/* Title */}
          <div className='col-12'>
            <header className="form-header text-center">Dice & Damage</header>
          </div>

          {/* Dice Images */}
          <div className='col-12 d-flex flex-column align-items-center justify-content-center' style={{padding: '0px'}}>
              <div className='w-100 d-flex justify-content-between' style={{ flex: '1' }}>
                  <img className='img-fluid dice-image' src={dFour}/>
                  <img className='img-fluid dice-image' src={dSix}/>
                  <img className='img-fluid dice-image' src={dEight}/>
                  <img className='img-fluid dice-image' src={dTen}/>
              </div>

              <div className='w-100 d-flex d-flex justify-content-between' style={{ flex: '1', padding: '0px 20px 0px 20px'}}>
                  <img className='img-fluid dice-image' src={dTwelve}/>
                  <img className='img-fluid dice-image' src={dTwenty}/>
                  <img className='img-fluid dice-image' src={dOneHundred}/>
              </div>
          </div>

          {/* No. Rolls Fields */}
          <div className='col-12 row'>

            <div className='col-12 d-flex justify-content-between' style={{paddingBottom: '10px'}}>
                <div style={{flex: '1', marginRight: '10px'}}>
                  <div className="text-center form-titles">No. Of Rolls</div>
                </div>
                <div style={{flex: '1', marginRight: '10px'}}>
                  <div className="text-center form-titles">Total Result</div>
                </div>
                <div style={{flex: '1'}}>
                  <div className="text-center form-titles">Ind. Result</div>
                </div>
            </div>

            <div className='col-12 d-flex justify-content-between' style={{padding: '0px'}}>
                <div style={{flex: '1', marginRight: '10px'}}>
                  <input className='field-style' style={{width: '100%'}} />
                </div>
                <div style={{flex: '1', marginRight: '10px'}}>
                  <div className='field-style' style={{width: '100%'}} />
                </div>
                <div style={{flex: '1'}}>
                  <div className='field-style' style={{width: '100%'}} />
                </div>
            </div>
          </div>

          {/* Log */}
          <div className='col-12 row'>
            <div className="text-center form-titles" style={{paddingBottom: '10px'}}>Log</div>
            <textarea className='field-style spell-description-field' style={{width: '100%'}} 
              placeholder="Notes"></textarea>
          </div>

          {/* Notes */}
          <div className='col-12'>
            <div className="text-center form-titles" style={{paddingBottom: '10px'}}>Notes</div>
            <textarea className='field-style spell-description-field' style={{width: '100%'}} 
              placeholder="Notes"></textarea>
          </div>

        </div>

        {/* Character Information */}
        <div className="col-4 row d-flex justify-content-center align-items-center">

          <div className='col-12'>
            <header className="form-header text-center">Combat Stats</header>
          </div>

          <div className='col-12 row d-flex justify-content-center'>

              {/* Image & Spell Slot Fields */}
              <div className='col-6'>
                <div className='col-12 d-flex flex-column align-items-center' style={{paddingBottom: '10px'}}>
                  <div className="text-center form-titles" style={{ marginBottom: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {characterData.characterName.length > 20 ? characterData.characterName.slice(0, 17) + '...' : characterData.characterName}</div>
                  <img className='img-fluid' src={"/" + characterData.characterBodyImage} style={{ maxHeight: '25vh' }} />
                </div>

                <div className='col-12 d-flex flex-column align-items-center'>
                  <div className="text-center form-titles" style={{ marginBottom: '10px' }}>Spell Slots</div>
                </div>
              </div>

              {/* Form Fields */}
              <div className='col-6'>

              <div className='col-12 d-flex flex-column align-items-center'>
                  <div className="text-center form-titles" style={{ marginBottom: '10px' }}>Temp Hp</div>

                  <div className='play-session-field d-flex justify-content-between align-items-center' style={{ width: '90%', padding: '10px 5px 10px 5px' }}> 
                      <input className='field-colour' style={{ width: '45%', border: 'solid 0.5px var(--textGrey)', fontSize: '2vw', textAlign: 'center' }}/>

                      <div className='field-colour d-flex justify-content-center align-items-center' 
                      style={{ width: '5%', color: 'var(--textLightGrey)', fontSize: '2.3vw', paddingBottom: '5px' }}>/</div>

                      <div className='field-colour d-flex justify-content-center align-items-center' 
                      style={{ width: '45%', color: 'var(--textLightGrey)', fontSize: '2.3vw', paddingBottom: '5px' }}>{characterData.characterHp}</div>
                  </div>
              </div>

                
                <div className='col-12 d-flex flex-column align-items-center'>
                  
                </div>

                <div className='col-12 d-flex flex-column align-items-center'>
                  
                </div>

                <div className='col-12 d-flex flex-column align-items-center'>
                  <div className="text-center form-titles" style={{ marginBottom: '10px' }}>Successful Death Saves</div>
                </div>

                <div className='col-12 d-flex flex-column align-items-center'>
                  <div className="text-center form-titles" style={{ marginBottom: '10px' }}>Failed Death Saves</div>
                </div>
              </div>

              {/* Attacks/Spells */}
              <div className='col-6 d-flex flex-column align-items-center'>
                <div className="text-center form-titles" style={{ marginBottom: '10px' }}>Attacks/Spells</div>
              </div>

              {/* Equipment */}
              <div className='col-6 d-flex flex-column d-flex'>
                <div className="text-center form-titles" style={{ marginBottom: '10px' }}>Equipment</div>
              </div>

          </div>

        </div>

        {/* Character Sheet */}
        <div className="col-4 row d-flex justify-content-center align-items-center">
          <div className='col-12' style={{ color: 'white', padding: '15px 0px 15px 0px' }}>
            {currentPage === 1 && <PlaySessionDndSheet
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
            characterInspiration={characterData ? characterData.characterInspiration : ''}
            characterProficiencyBonus={characterData ? characterData.characterProficiencyBonus : ''}
            characterPerception={characterData ? characterData.characterPerception : ''}
            characterHitDice={characterData ? characterData.characterHitDice : ''}

            characterStrength={characterSkills ? characterSkills.characterStrength : ''}
            characterDexterity={characterSkills ? characterSkills.characterDexterity : ''}
            characterConstitution={characterSkills ? characterSkills.characterConstitution : ''}
            characterIntelligence={characterSkills ? characterSkills.characterIntelligence : ''}
            characterWisdom={characterSkills ? characterSkills.characterWisdom : ''}
            characterCharisma={characterSkills ? characterSkills.characterCharisma : ''}
            characterProficiencys={characterSkills.characterProficiencys}            

            characterPersonalityTraits={characterPersonalityTraits}
            characterIdeals={characterIdeals}
            characterBonds={characterBonds}
            characterFlaws={characterFlaws}
            characterLanguages={characterLanguages}

            characterTraits={characterTraits}
            characterAttacks={characterAttacks}
            characterEquipment={characterEquipment}

            characterSavingThrows={characterSavingThrows}
            characterSkills={characterProfSkills}
            characterCurrency={characterCurrency}/>}

            {currentPage === 2 && <PlaySessionDndSheetTwo
              loadCharacterSpells={loadCharacterSpells}
              characterSpellcastingClass={characterData ? characterData.characterSpellcastingClass : ''}
              characterSpellcastingAbility={characterData ? characterData.characterSpellcastingAbility : ''}
              characterSpellSaveDC={characterData ? characterData.characterSpellSaveDC : ''}
              characterSpellAttackBonus={characterData ? characterData.characterSpellAttackBonus : ''}
              characterSpellSlot1={characterData ? characterData.characterSpellSlot1 : ''}
              characterSpellSlot2={characterData ? characterData.characterSpellSlot2 : ''}
              characterSpellSlot3={characterData ? characterData.characterSpellSlot3 : ''}
              characterSpellSlot4={characterData ? characterData.characterSpellSlot4 : ''}
              characterSpellSlot5={characterData ? characterData.characterSpellSlot5 : ''}
              characterSpellSlot6={characterData ? characterData.characterSpellSlot6 : ''}
              characterSpellSlot7={characterData ? characterData.characterSpellSlot7 : ''}
              characterSpellSlot8={characterData ? characterData.characterSpellSlot8 : ''}
              characterSpellSlot9={characterData ? characterData.characterSpellSlot9 : ''}/>}

            {currentPage === 3 && <PlaySessionDndSheetThree
              updateCharacterOrganisation={updateCharacterOrganisation}
              characterOrganisationSymbol={updateCharacterOrganisation ? updateCharacterOrganisation : ''}
				      characterTreasure={updateCharacterTreasure ? updateCharacterTreasure : ''}
              characterName={characterData ? characterData.characterName : ''}
              characterAge={characterData ? characterData.characterAge : ''}
              characterEyes={characterData ? characterData.characterEyes : ''}
              characterHair={characterData ? characterData.characterHair : ''}
              characterHeight={characterData ? characterData.characterHeight : ''}
              characterSkin={characterData ? characterData.characterSkin : ''}
              characterWeight={characterData ? characterData.characterWeight : ''}
              characterTextAppearence={characterData ? characterData.characterTextAppearence : ''}
              characterBackstory={characterData ? characterData.characterBackstory : ''}
              profileImage={"/" + characterData.characterFaceImage}
              bodyImage={ "/" + characterData.characterBodyImage}/>}
          </div>

          <div className='col-12 d-flex justify-content-between' style={{padding: '0px 30px 0px 30px'}}>
            <Link to={`/LoadCharacter/${characterId.Id}`}>
              <header className="navbar-text" style={{ display: 'inline-block' }}>Edit Character Sheet</header>
            </Link>
            <header className="navbar-text" style={{ display: 'inline-block', textAlign: 'end' }} onClick={prevPage}>&lt; Previous Sheet </header>
            <header className="navbar-text" style={{ display: 'inline-block', textAlign: 'end' }} onClick={nextPage}>Next Sheet &gt;</header>
          </div>

        </div> 

      </div>

    </div>
  )
}


export default PlaySession