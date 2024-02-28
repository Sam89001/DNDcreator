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
		characterSpellName: '',
		characterSpellLevel: '',
		characterSpellCastTime: '',
		characterSpellRangeArea: '',
		characterSpellDescription: '',
		characterSpellDuration: '',
		characterSpellSave: '',
		characterSpellSchool: '',
		characterSpellDamage: '',

	});

	//Handles Selection
	const handleSelectChange = (e) => {
    const selectedId = e.target.value; 
    setSelectedId({ selectedId: selectedId });
    //finds and updates the fields

  	const loadedValue = loadCharacterSpells.find(value => value._id === selectedId);
    setCharacterSpells({
      ...characterSpells,
      characterSpellName: loadedValue ? loadedValue.characterSpellName : '',
      characterSpellLevel: loadedValue ? loadedValue.characterSpellLevel : '',
      characterSpellCastTime: loadedValue ? loadedValue.characterSpellCastTime : '',
			characterSpellRangeArea: loadedValue ? loadedValue.characterSpellRangeArea : '',
      characterSpellDescription: loadedValue ? loadedValue.characterSpellDescription : '',
      characterSpellDuration: loadedValue ? loadedValue.characterSpellDuration : '',
			characterSpellSave: loadedValue ? loadedValue.characterSpellSave : '',
      characterSpellSchool: loadedValue ? loadedValue.characterSpellSchool : '',
      characterSpellDamage: loadedValue ? loadedValue.characterSpellDamage : '',
    }); 
	};
  const handleSubmit = async (e) => {
		e.preventDefault();
		if (!selectedId.selectedId) {
			await updateSpells();
		} else {
			
			await updateExistingSpells(selectedId.selectedId, characterSpells.characterSpellName, 
				characterSpells.characterSpellLevel, characterSpells.characterSpellCastTime,
				characterSpells.characterSpellRangeArea, characterSpells.characterSpellDescription,
				characterSpells.characterSpellDuration, characterSpells.characterSpellSave,
				characterSpells.characterSpellSchool, characterSpells.characterSpellDamage); 
			
		}
	}; 

	//Post Request
	 const updateSpells =  async (e) => {
		const {characterSpellName, characterSpellLevel,
      characterSpellCastTime, characterSpellRangeArea,
			characterSpellDescription, characterSpellDuration,
			characterSpellSave, characterSpellSchool, characterSpellDamage } = characterSpells;
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
					getCharacterData();
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
					<form onSubmit={handleSubmit}>
					<div className="spells-field spell-form-titles"> Cantrips</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"
						value={characterSpells.characterSpellName}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpell) => ({
								...prevCharacterSpell,
								characterSpellName: e.target.value,
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"
						value={characterSpells.characterSpellCastTime}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpell) => ({
								...prevCharacterSpell,
								characterSpellCastTime: e.target.value,
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"
							value={characterSpells.characterSpellDamage}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpell) => ({
									...prevCharacterSpell,
									characterSpellDamage: e.target.value,
								}))
						}/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"
						value={characterSpells.characterSpellDescription}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpell) => ({
								...prevCharacterSpell,
								characterSpellDescription: e.target.value,
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
							value={characterSpells.characterSpellDuration}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpell) => ({
									...prevCharacterSpell,
									characterSpellDuration: e.target.value,
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"
							value={characterSpells.characterSpellSave}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpell) => ({
									...prevCharacterSpell,
									characterSpellSave: e.target.value,
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"
							value={characterSpells.characterSpellSchool}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpell) => ({
									...prevCharacterSpell,
									characterSpellSchool: e.target.value,
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"
							value={characterSpells.characterSpellRangeArea}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpell) => ({
									...prevCharacterSpell,
									characterSpellRangeArea: e.target.value,
								}))
							}/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Cantrip</div>

					<select className='spell-edit-character-field' style={{height: '35px'}} onChange={handleSelectChange}>
						<option/>
						{loadCharacterSpells.map(spell => (
						  <option key={spell._id} value={spell._id}>{spell.characterSpellName}</option>
					  ))}
					</select>

					<button className='create-character-button' type="submit"
						onClick={() =>
							setCharacterSpells((prevCharacterSpell) => ({
								...prevCharacterSpell,
								characterSpellLevel: '0', 
							}))
						}> Update</button>

					</form>
				</div>

			</div>
		</div>

		<div className='col-3' style={{marginRight: '10px'}}>
			<div className='row'>

				{/* Spell Slot 1 */}
				<div className='col-12' style={{paddingBottom: '15px'}}>
					<form>
					<div className="spells-field justify-content-between"> 
						<div className='spell-form-titles'>Spell Slot 1</div>
						<input className='field-style' style={{width: '35%', borderRadius: '15px'}} placeholder="Total Slots"/>
					</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"/>
					</div>
					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"/>
					</div>

					<div className={`drop-down-spells-field ${dropdownStates['1'] ? 'active' : ''}`}>
						<div className={`spells-expand-box `} >
							<div className='form-titles' style={{width: '48%', marginRight: '10px'}}>Additional Fields</div>
							<img
              className={`spell-arrow ${dropdownStates['1'] ? 'active' : ''}`}
              src={DownArrowImage}
              onClick={() => toggleDropdown('1')} />
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Cantrip</div>

					<select className='edit-character-field' style={{height: '35px'}} onChange={handleSelectChange}>
						<option/>
						
					</select>

					</form>
				</div>

				{/* Spell Slot 2 */}
				<div className='col-12' style={{paddingBottom: '15px'}}>
					<form>
					<div className="spells-field spell-form-titles"> Spell Slot 2</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"/>
					</div>
					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"/>
					</div>

					<div className={`drop-down-spells-field ${dropdownStates['2'] ? 'active' : ''}`}>
						<div className={`spells-expand-box `} >
							<div className='form-titles' style={{width: '48%', marginRight: '10px'}}>Additional Fields</div>
							<img
              className={`spell-arrow ${dropdownStates['2'] ? 'active' : ''}`}
              src={DownArrowImage}
              onClick={() => toggleDropdown('2')} />
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Cantrip</div>

					<select className='edit-character-field' style={{height: '35px'}}>
						<option/>
					</select>

					</form>
				</div>

			</div>
		</div>

		<div className='col-3' style={{marginRight: '10px'}}>
			<div className='row'>

				{/* Spell Slot 3 */}
				<div className='col-12' style={{paddingBottom: '15px'}}>
					<form>
					<div className="spells-field spell-form-titles"> Spell Slot 3</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"/>
					</div>
					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"/>
					</div>

					<div className={`drop-down-spells-field ${dropdownStates['3'] ? 'active' : ''}`}>
						<div className={`spells-expand-box `} >
							<div className='form-titles' style={{width: '48%', marginRight: '10px'}}>Additional Fields</div>
							<img
              className={`spell-arrow ${dropdownStates['3'] ? 'active' : ''}`}
              src={DownArrowImage}
              onClick={() => toggleDropdown('3')} />
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Cantrip</div>

					<select className='edit-character-field' style={{height: '35px'}}>
						<option></option>
						<option>Robert</option>
					</select>

					</form>
				</div>

				{/* Spell Slot 4 */}
				<div className='col-12' style={{paddingBottom: '15px'}}>
					<form>
					<div className="spells-field spell-form-titles"> Spell Slot 4</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"/>
					</div>
					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"/>
					</div>

					<div className={`drop-down-spells-field ${dropdownStates['4'] ? 'active' : ''}`}>
						<div className={`spells-expand-box `} >
							<div className='form-titles' style={{width: '48%', marginRight: '10px'}}>Additional Fields</div>
							<img
              className={`spell-arrow ${dropdownStates['4'] ? 'active' : ''}`}
              src={DownArrowImage}
              onClick={() => toggleDropdown('4')} />
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Cantrip</div>

					<select className='edit-character-field' style={{height: '35px'}}>
						<option></option>
						<option>Robert</option>
					</select>

					</form>
				</div>

			</div>
		</div>

		<div className='col-3' style={{marginRight: '10px'}}>
			<div className='row'>

				{/* Spell Slot 5 */}
				<div className='col-12' style={{paddingBottom: '15px'}}>
					<form>
					<div className="spells-field spell-form-titles"> Spell Slot 5</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"/>
					</div>
					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"/>
					</div>

					<div className={`drop-down-spells-field ${dropdownStates['5'] ? 'active' : ''}`}>
						<div className={`spells-expand-box `} >
							<div className='form-titles' style={{width: '48%', marginRight: '10px'}}>Additional Fields</div>
							<img
              className={`spell-arrow ${dropdownStates['5'] ? 'active' : ''}`}
              src={DownArrowImage}
              onClick={() => toggleDropdown('5')} />
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Cantrip</div>

					<select className='edit-character-field' style={{height: '35px'}}>
						<option></option>
						<option>Robert</option>
					</select>

					</form>
				</div>

				{/* Spell Slot 6 */}
				<div className='col-12' style={{paddingBottom: '15px'}}>
					<form>
					<div className="spells-field spell-form-titles"> Spell Slot 6</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"/>
					</div>
					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"/>
					</div>

					<div className={`drop-down-spells-field ${dropdownStates['6'] ? 'active' : ''}`}>
						<div className={`spells-expand-box `} >
							<div className='form-titles' style={{width: '48%', marginRight: '10px'}}>Additional Fields</div>
							<img
              className={`spell-arrow ${dropdownStates['6'] ? 'active' : ''}`}
              src={DownArrowImage}
              onClick={() => toggleDropdown('6')} />
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Cantrip</div>

					<select className='edit-character-field' style={{height: '35px'}}>
						<option></option>
						<option>Robert</option>
					</select>

					</form>
				</div>

			</div>
		</div>

		<div className='col-3' style={{marginRight: '10px'}}>
			<div className='row'>

				{/* Spell Slot 7 */}
				<div className='col-12' style={{paddingBottom: '15px'}}>
					<form>
					<div className="spells-field spell-form-titles"> Spell Slot 7</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"/>
					</div>
					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"/>
					</div>

					<div className={`drop-down-spells-field ${dropdownStates['7'] ? 'active' : ''}`}>
						<div className={`spells-expand-box `} >
							<div className='form-titles' style={{width: '48%', marginRight: '10px'}}>Additional Fields</div>
							<img
              className={`spell-arrow ${dropdownStates['7'] ? 'active' : ''}`}
              src={DownArrowImage}
              onClick={() => toggleDropdown('7')} />
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Cantrip</div>

					<select className='edit-character-field' style={{height: '35px'}}>
						<option></option>
						<option>Robert</option>
					</select>

					</form>
				</div>

				{/* Spell Slot 8 */}
				<div className='col-12' style={{paddingBottom: '15px'}}>
					<form>
					<div className="spells-field spell-form-titles"> Spell Slot 8</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"/>
					</div>
					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"/>
					</div>

					<div className={`drop-down-spells-field ${dropdownStates['8'] ? 'active' : ''}`}>
						<div className={`spells-expand-box `} >
							<div className='form-titles' style={{width: '48%', marginRight: '10px'}}>Additional Fields</div>
							<img
              className={`spell-arrow ${dropdownStates['8'] ? 'active' : ''}`}
              src={DownArrowImage}
              onClick={() => toggleDropdown('8')} />
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Cantrip</div>

					<select className='edit-character-field' style={{height: '35px'}}>
						<option></option>
						<option>Robert</option>
					</select>

					</form>
				</div>

			</div>
		</div>

		<div className='col-3' style={{marginRight: '10px'}}>
			<div className='row'>

				{/* Spell Slot 9 */}
				<div className='col-12' style={{paddingBottom: '15px'}}>
					<form>
					<div className="spells-field spell-form-titles"> Spell Slot 9</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"/>
					</div>
					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"/>
					</div>

					<div className={`drop-down-spells-field ${dropdownStates['9'] ? 'active' : ''}`}>
						<div className={`spells-expand-box `} >
							<div className='form-titles' style={{width: '48%', marginRight: '10px'}}>Additional Fields</div>
							<img
              className={`spell-arrow ${dropdownStates['9'] ? 'active' : ''}`}
              src={DownArrowImage}
              onClick={() => toggleDropdown('9')} />
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Cantrip</div>

					<select className='edit-character-field' style={{height: '35px'}}>
						<option></option>
						<option>Robert</option>
					</select>

					</form>
				</div>

			</div>
		</div>

	</div>
)
}

export default SpellsForm