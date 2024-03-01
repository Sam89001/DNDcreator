import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast';

//User
import { UserContext } from '../../../context/userContext';

//Images
import DownArrowImage from '../../../images/Down Arrow.png'

function SpellsForm({propId, getCharacterData, updateCharacterSpellcastingFunction, 
	loadCharacterSpells, setLoadCharacterSpells}) {

	//Dropdown Code
	const [dropdownStates, setDropdownStates] = useState([]);
  const toggleDropdown = (index) => {
    const updatedStates = [...dropdownStates];
    updatedStates[index] = !updatedStates[index];
    setDropdownStates(updatedStates);
  };

	//Stores Character Id
	const characterId = propId.Id

	//Updates and Store General Spellcasting Information
	const [characterSpellcasting, setCharacterSpellcasting] = useState({
		characterSpellcastingClass: '',
		characterSpellcastingAbility: '',
		characterSpellSaveDC: '',
		characterSpellAttackBonus: ''
	});
	const updateGeneralStats = async (e) => {
		e.preventDefault();
		const { characterSpellcastingClass, characterSpellcastingAbility,
			characterSpellSaveDC, characterSpellAttackBonus } = characterSpellcasting;
	
		try {
			const response = await axios.put(`http://localhost:4000/CreateCharacter/UpdateGeneralSpellInfo/${characterId}`, {
				characterSpellcastingClass, characterSpellcastingAbility,
				characterSpellSaveDC, characterSpellAttackBonus
			});
	
			if (response.data.error) {
				toast.error(response.data.error);
			} else {
				updateCharacterSpellcastingFunction(characterSpellcasting)
				toast.success('Updated character details');
			}
		} catch (error) {
			console.log(error);
		}
	}

	//Updates and Stores Spell Information

	//Sets user change
	const [selectedId, setSelectedId] = useState({
		selectedId: ''
	});
	const [characterSpells, setCharacterSpells] = useState({
		cantrips: {
			characterSpellName: '',
			characterSpellLevel: '0',
			characterSpellCastTime: '',
			characterSpellRangeArea: '',
			characterSpellDescription: '',
			characterSpellDuration: '',
			characterSpellSave: '',
			characterSpellSchool: '',
			characterSpellDamage: '',
		},
		spellSlot1: {
			characterSpellName: '',
			characterSpellLevel: '1',
			characterSpellCastTime: '',
			characterSpellRangeArea: '',
			characterSpellDescription: '',
			characterSpellDuration: '',
			characterSpellSave: '',
			characterSpellSchool: '',
			characterSpellDamage: '',
		}

	});

	//Handles Selection
	const handleSelectChange = (spellLevel) => (e) => {
    const selectedId = e.target.value; 
    setSelectedId({ selectedId: selectedId });

    const loadedValue = loadCharacterSpells.find(value => value._id === selectedId);
    
    const updatedSpellData = {
        ...characterSpells,
        [spellLevel]: {
            ...characterSpells[spellLevel],
            characterSpellName: loadedValue ? loadedValue.characterSpellName : '',
            characterSpellLevel: loadedValue ? loadedValue.characterSpellLevel : '',
            characterSpellCastTime: loadedValue ? loadedValue.characterSpellCastTime : '',
            characterSpellRangeArea: loadedValue ? loadedValue.characterSpellRangeArea : '',
            characterSpellDescription: loadedValue ? loadedValue.characterSpellDescription : '',
            characterSpellDuration: loadedValue ? loadedValue.characterSpellDuration : '',
            characterSpellSave: loadedValue ? loadedValue.characterSpellSave : '',
            characterSpellSchool: loadedValue ? loadedValue.characterSpellSchool : '',
            characterSpellDamage: loadedValue ? loadedValue.characterSpellDamage : '',
        }
    };
    setCharacterSpells(updatedSpellData);
	};

  const handleSubmit = async (e, spellLevel) => {
		e.preventDefault();

		if (!selectedId.selectedId) {
			await updateSpells(spellLevel);
		} else {
			
			await updateExistingSpells(selectedId.selectedId, characterSpells.cantrips.characterSpellName, 
				characterSpells.cantrips.characterSpellLevel, characterSpells.cantrips.characterSpellCastTime,
				characterSpells.cantrips.characterSpellRangeArea, characterSpells.cantrips.characterSpellDescription,
				characterSpells.cantrips.characterSpellDuration, characterSpells.cantrips.characterSpellSave,
				characterSpells.cantrips.characterSpellSchool, characterSpells.cantrips.characterSpellDamage); 
			
		}
	}; 

	//Post Request
	 const updateSpells =  async (spellLevel) => {
		const {characterSpellName, characterSpellLevel,
      characterSpellCastTime, characterSpellRangeArea,
			characterSpellDescription, characterSpellDuration,
			characterSpellSave, characterSpellSchool, characterSpellDamage } = characterSpells[spellLevel];
		try {

			const response = await axios.post(`http://localhost:4000/CreateCharacter/UpdateSpells/${characterId}`, {
				characterSpellName, characterSpellLevel,
				characterSpellCastTime, characterSpellRangeArea,
				characterSpellDescription, characterSpellDuration,
				characterSpellSave, characterSpellSchool, characterSpellDamage
			});

			if (response.data.success) {
				const newItem = response.data.newSpells;
				setLoadCharacterSpells(prev => [...prev, newItem]);
				toast.success('Updated character details');
			} else {
				toast.error('Failed to update character details');
			}
		} catch (error) {
			console.log(error)
		}
	}

	//Put Request
	const updateExistingSpells = async (id, characterSpellName, characterSpellLevel,
		characterSpellCastTime, characterSpellRangeArea,
		characterSpellDescription, characterSpellDuration,
		characterSpellSave, characterSpellSchool, characterSpellDamage) => {
		try {
				const response = await axios.put(`http://localhost:4000/CreateCharacter/ChangeSpells/${id}`, {
					id, characterSpellName, characterSpellLevel,
					characterSpellCastTime, characterSpellRangeArea,
					characterSpellDescription, characterSpellDuration,
					characterSpellSave, characterSpellSchool, characterSpellDamage
				});

				if (response.error) {
					toast.error(response.data.error);
				} else {
					getCharacterData(characterId);
					toast.success('Updated character details');
				}
		} catch (error) {
				console.log(error);
		}
	}; 

return (
	<div className="row" style={{minWidth: '1300px', paddingLeft: '10px', paddingTop: '5px', flexWrap: 'nowrap'}}>
		<div className='col-3' style={{marginRight: '10px'}}>
			<div className='row'>

				{/* General Spell Stats */}
				<div className='col-12' style={{paddingBottom: '20px'}}>
					<form onSubmit={updateGeneralStats}>
					<div className="spells-field spell-form-titles"> Spellcasting Info</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spellcaster Class"
						onChange={(e) => setCharacterSpellcasting({ ...characterSpellcasting, characterSpellcastingClass: e.target.value })}/>
					</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spellcasting Ability"
						onChange={(e) => setCharacterSpellcasting({ ...characterSpellcasting, characterSpellcastingAbility: e.target.value })}/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spellsave DC"
						onChange={(e) => setCharacterSpellcasting({ ...characterSpellcasting, characterSpellSaveDC: e.target.value })}/>
					</div>

					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell ATK Bonus"
						onChange={(e) => setCharacterSpellcasting({ ...characterSpellcasting, characterSpellAttackBonus: e.target.value })}/>
					</div>

					<div className="spells-field">
						<button className='create-character-button' type="submit" > Update</button>
					</div>

					</form>
				</div>

				{/* Cantrips */}
				<div className='col-12' style={{paddingBottom: '20px'}}>
					<form onSubmit={(e) => handleSubmit(e, 'cantrips')}>

					<div className="spells-field spell-form-titles"> Cantrips</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"
						value={characterSpells.cantrips.characterSpellName}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									cantrips: {
											...prevCharacterSpells.cantrips,
											characterSpellName: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"
						value={characterSpells.cantrips.characterSpellCastTime}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									cantrips: {
											...prevCharacterSpells.cantrips,
											characterSpellCastTime: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"
							value={characterSpells.cantrips.characterSpellDamage}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										cantrips: {
												...prevCharacterSpells.cantrips,
												characterSpellDamage: e.target.value,
										}
								}))
							}/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"
						value={characterSpells.cantrips.characterSpellDescription}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									cantrips: {
											...prevCharacterSpells.cantrips,
											characterSpellDescription: e.target.value,
									}
							}))
						}/>
					</div>					

					<div className={`drop-down-spells-field ${dropdownStates['0'] ? 'active' : ''}`}>
						<div className={`spells-expand-box `} >
							<div className='form-titles' style={{width: '48%', marginRight: '10px'}}>Additional Fields</div>
							<img
              className={`spell-arrow ${dropdownStates['0'] ? 'active' : ''}`}
              src={DownArrowImage}
              onClick={() => toggleDropdown('0')} />
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"
							value={characterSpells.cantrips.characterSpellDuration}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										cantrips: {
												...prevCharacterSpells.cantrips,
												characterSpellDuration: e.target.value,
										}
								}))
							}/>
						</div>	

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"
							value={characterSpells.cantrips.characterSpellSave}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										cantrips: {
												...prevCharacterSpells.cantrips,
												characterSpellSave: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"
							value={characterSpells.cantrips.characterSpellSchool}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										cantrips: {
												...prevCharacterSpells.cantrips,
												characterSpellSchool: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"
							value={characterSpells.cantrips.characterSpellRangeArea}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										cantrips: {
												...prevCharacterSpells.cantrips,
												characterSpellRangeArea: e.target.value,
										}
								}))
							}/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Cantrip</div>

					<select className='spell-edit-character-field' style={{height: '35px'}} onChange={handleSelectChange('cantrips')}>
						<option/>
						{loadCharacterSpells.map(spell => (
						  <option key={spell._id} value={spell._id}>{spell.characterSpellName}</option>
					  ))}
					</select>

					<button className='create-character-button' type="submit"> Update</button>

					</form>
				</div>

			</div>
		</div>

		<div className='col-3' style={{marginRight: '10px'}}>
			<div className='row'>


			</div>
		</div>

		<div className='col-3' style={{marginRight: '10px'}}>
			<div className='row'>

				
			</div>
		</div>

		<div className='col-3' style={{marginRight: '10px'}}>
			<div className='row'>


			</div>
		</div>

		<div className='col-3' style={{marginRight: '10px'}}>
			<div className='row'>

			</div>
		</div>

		<div className='col-3' style={{marginRight: '10px'}}>
			<div className='row'>

			

			</div>
		</div>

	</div>
)
}

export default SpellsForm