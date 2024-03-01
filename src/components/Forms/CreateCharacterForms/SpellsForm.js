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
		},
		spellSlot2: {
			characterSpellName: '',
			characterSpellLevel: '2',
			characterSpellCastTime: '',
			characterSpellRangeArea: '',
			characterSpellDescription: '',
			characterSpellDuration: '',
			characterSpellSave: '',
			characterSpellSchool: '',
			characterSpellDamage: '',
		},
		spellSlot3: {
			characterSpellName: '',
			characterSpellLevel: '3',
			characterSpellCastTime: '',
			characterSpellRangeArea: '',
			characterSpellDescription: '',
			characterSpellDuration: '',
			characterSpellSave: '',
			characterSpellSchool: '',
			characterSpellDamage: '',
		},
		spellSlot4: {
			characterSpellName: '',
			characterSpellLevel: '4',
			characterSpellCastTime: '',
			characterSpellRangeArea: '',
			characterSpellDescription: '',
			characterSpellDuration: '',
			characterSpellSave: '',
			characterSpellSchool: '',
			characterSpellDamage: '',
		},
		spellSlot5: {
			characterSpellName: '',
			characterSpellLevel: '5',
			characterSpellCastTime: '',
			characterSpellRangeArea: '',
			characterSpellDescription: '',
			characterSpellDuration: '',
			characterSpellSave: '',
			characterSpellSchool: '',
			characterSpellDamage: '',
		},
		spellSlot6: {
			characterSpellName: '',
			characterSpellLevel: '6',
			characterSpellCastTime: '',
			characterSpellRangeArea: '',
			characterSpellDescription: '',
			characterSpellDuration: '',
			characterSpellSave: '',
			characterSpellSchool: '',
			characterSpellDamage: '',
		},
		spellSlot7: {
			characterSpellName: '',
			characterSpellLevel: '7',
			characterSpellCastTime: '',
			characterSpellRangeArea: '',
			characterSpellDescription: '',
			characterSpellDuration: '',
			characterSpellSave: '',
			characterSpellSchool: '',
			characterSpellDamage: '',
		},
		spellSlot8: {
			characterSpellName: '',
			characterSpellLevel: '8',
			characterSpellCastTime: '',
			characterSpellRangeArea: '',
			characterSpellDescription: '',
			characterSpellDuration: '',
			characterSpellSave: '',
			characterSpellSchool: '',
			characterSpellDamage: '',
		},
		spellSlot9: {
			characterSpellName: '',
			characterSpellLevel: '9',
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

    setCharacterSpells(prevCharacterSpells => ({
        ...prevCharacterSpells,
        [spellLevel]: {
            ...prevCharacterSpells[spellLevel],
            ...loadedValue
        }
    }));
	};

  const handleSubmit = async (e, spellLevel) => {
		e.preventDefault();

		if (!selectedId.selectedId) {
			await updateSpells(spellLevel);
		} else {
			await updateExistingSpells(selectedId.selectedId, characterSpells[spellLevel].characterSpellName, 
				characterSpells[spellLevel].characterSpellLevel, characterSpells[spellLevel].characterSpellCastTime,
				characterSpells[spellLevel].characterSpellRangeArea, characterSpells[spellLevel].characterSpellDescription,
				characterSpells[spellLevel].characterSpellDuration, characterSpells[spellLevel].characterSpellSave,
				characterSpells[spellLevel].characterSpellSchool, characterSpells[spellLevel].characterSpellDamage); 
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
							{loadCharacterSpells
									.filter(spell => spell.characterSpellLevel === '0')
									.map(spell => (
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

				{/* Spell Slot 1 */}
				<div className='col-12' style={{paddingBottom: '20px'}}>
					<form onSubmit={(e) => handleSubmit(e, 'spellSlot1')}>

					<div className="spells-field spell-form-titles"> Spell Slot 1</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"
						value={characterSpells.spellSlot1.characterSpellName}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot1: {
											...prevCharacterSpells.spellSlot1,
											characterSpellName: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"
						value={characterSpells.spellSlot1.characterSpellCastTime}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot1: {
											...prevCharacterSpells.spellSlot1,
											characterSpellCastTime: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"
							value={characterSpells.spellSlot1.characterSpellDamage}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot1: {
												...prevCharacterSpells.spellSlot1,
												characterSpellDamage: e.target.value,
										}
								}))
							}/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"
						value={characterSpells.spellSlot1.characterSpellDescription}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot1: {
											...prevCharacterSpells.spellSlot1,
											characterSpellDescription: e.target.value,
									}
							}))
						}/>
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
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"
							value={characterSpells.spellSlot1.characterSpellDuration}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot1: {
												...prevCharacterSpells.spellSlot1,
												characterSpellDuration: e.target.value,
										}
								}))
							}/>
						</div>	

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"
							value={characterSpells.spellSlot1.characterSpellSave}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot1: {
												...prevCharacterSpells.spellSlot1,
												characterSpellSave: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"
							value={characterSpells.spellSlot1.characterSpellSchool}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot1: {
												...prevCharacterSpells.spellSlot1,
												characterSpellSchool: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"
							value={characterSpells.spellSlot1.characterSpellRangeArea}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot1: {
												...prevCharacterSpells.spellSlot1,
												characterSpellRangeArea: e.target.value,
										}
								}))
							}/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Spell</div>

					<select className='spell-edit-character-field' style={{height: '35px'}} onChange={handleSelectChange('spellSlot1')}>
							<option/>
							{loadCharacterSpells
									.filter(spell => spell.characterSpellLevel === '1')
									.map(spell => (
											<option key={spell._id} value={spell._id}>{spell.characterSpellName}</option>
									))}
					</select>

					<button className='create-character-button' type="submit"> Update</button>

					</form>
				</div>

				{/* Spell Slot 2 */}
				<div className='col-12' style={{paddingBottom: '20px'}}>
					<form onSubmit={(e) => handleSubmit(e, 'spellSlot2')}>

					<div className="spells-field spell-form-titles"> Spell Slot 2</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"
						value={characterSpells.spellSlot2.characterSpellName}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot2: {
											...prevCharacterSpells.spellSlot2,
											characterSpellName: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"
						value={characterSpells.spellSlot2.characterSpellCastTime}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot2: {
											...prevCharacterSpells.spellSlot2,
											characterSpellCastTime: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"
							value={characterSpells.spellSlot2.characterSpellDamage}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot2: {
												...prevCharacterSpells.spellSlot2,
												characterSpellDamage: e.target.value,
										}
								}))
							}/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"
						value={characterSpells.spellSlot2.characterSpellDescription}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot2: {
											...prevCharacterSpells.spellSlot2,
											characterSpellDescription: e.target.value,
									}
							}))
						}/>
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
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"
							value={characterSpells.spellSlot2.characterSpellDuration}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot2: {
												...prevCharacterSpells.spellSlot2,
												characterSpellDuration: e.target.value,
										}
								}))
							}/>
						</div>	

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"
							value={characterSpells.spellSlot2.characterSpellSave}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot2: {
												...prevCharacterSpells.spellSlot2,
												characterSpellSave: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"
							value={characterSpells.spellSlot2.characterSpellSchool}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot2: {
												...prevCharacterSpells.spellSlot2,
												characterSpellSchool: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"
							value={characterSpells.spellSlot2.characterSpellRangeArea}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot2: {
												...prevCharacterSpells.spellSlot2,
												characterSpellRangeArea: e.target.value,
										}
								}))
							}/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Spell</div>

					<select className='spell-edit-character-field' style={{height: '35px'}} onChange={handleSelectChange('spellSlot2')}>
							<option/>
							{loadCharacterSpells
									.filter(spell => spell.characterSpellLevel === '2')
									.map(spell => (
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

				{/* Spell Slot 3 */}
				<div className='col-12' style={{paddingBottom: '20px'}}>
					<form onSubmit={(e) => handleSubmit(e, 'spellSlot3')}>

					<div className="spells-field spell-form-titles"> Spell Slot 3</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"
						value={characterSpells.spellSlot3.characterSpellName}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot3: {
											...prevCharacterSpells.spellSlot3,
											characterSpellName: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"
						value={characterSpells.spellSlot3.characterSpellCastTime}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot3: {
											...prevCharacterSpells.spellSlot3,
											characterSpellCastTime: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"
							value={characterSpells.spellSlot3.characterSpellDamage}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot3: {
												...prevCharacterSpells.spellSlot3,
												characterSpellDamage: e.target.value,
										}
								}))
							}/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"
						value={characterSpells.spellSlot3.characterSpellDescription}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot3: {
											...prevCharacterSpells.spellSlot3,
											characterSpellDescription: e.target.value,
									}
							}))
						}/>
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
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"
							value={characterSpells.spellSlot3.characterSpellDuration}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot3: {
												...prevCharacterSpells.spellSlot3,
												characterSpellDuration: e.target.value,
										}
								}))
							}/>
						</div>	

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"
							value={characterSpells.spellSlot3.characterSpellSave}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot3: {
												...prevCharacterSpells.spellSlot3,
												characterSpellSave: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"
							value={characterSpells.spellSlot3.characterSpellSchool}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot3: {
												...prevCharacterSpells.spellSlot3,
												characterSpellSchool: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"
							value={characterSpells.spellSlot3.characterSpellRangeArea}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot3: {
												...prevCharacterSpells.spellSlot3,
												characterSpellRangeArea: e.target.value,
										}
								}))
							}/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Spell</div>

					<select className='spell-edit-character-field' style={{height: '35px'}} onChange={handleSelectChange('spellSlot3')}>
							<option/>
							{loadCharacterSpells
									.filter(spell => spell.characterSpellLevel === '3')
									.map(spell => (
											<option key={spell._id} value={spell._id}>{spell.characterSpellName}</option>
									))}
					</select>

					<button className='create-character-button' type="submit"> Update</button>

					</form>
				</div>

				{/* Spell Slot 4 */}
				<div className='col-12' style={{paddingBottom: '20px'}}>
					<form onSubmit={(e) => handleSubmit(e, 'spellSlot4')}>

					<div className="spells-field spell-form-titles"> Spell Slot 4</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"
						value={characterSpells.spellSlot4.characterSpellName}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot4: {
											...prevCharacterSpells.spellSlot4,
											characterSpellName: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"
						value={characterSpells.spellSlot4.characterSpellCastTime}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot4: {
											...prevCharacterSpells.spellSlot4,
											characterSpellCastTime: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"
							value={characterSpells.spellSlot4.characterSpellDamage}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot4: {
												...prevCharacterSpells.spellSlot4,
												characterSpellDamage: e.target.value,
										}
								}))
							}/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"
						value={characterSpells.spellSlot4.characterSpellDescription}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot4: {
											...prevCharacterSpells.spellSlot4,
											characterSpellDescription: e.target.value,
									}
							}))
						}/>
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
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"
							value={characterSpells.spellSlot4.characterSpellDuration}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot4: {
												...prevCharacterSpells.spellSlot4,
												characterSpellDuration: e.target.value,
										}
								}))
							}/>
						</div>	

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"
							value={characterSpells.spellSlot4.characterSpellSave}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot4: {
												...prevCharacterSpells.spellSlot4,
												characterSpellSave: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"
							value={characterSpells.spellSlot4.characterSpellSchool}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot4: {
												...prevCharacterSpells.spellSlot4,
												characterSpellSchool: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"
							value={characterSpells.spellSlot4.characterSpellRangeArea}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot4: {
												...prevCharacterSpells.spellSlot4,
												characterSpellRangeArea: e.target.value,
										}
								}))
							}/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Spell</div>

					<select className='spell-edit-character-field' style={{height: '35px'}} onChange={handleSelectChange('spellSlot4')}>
							<option/>
							{loadCharacterSpells
									.filter(spell => spell.characterSpellLevel === '4')
									.map(spell => (
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
				
				{/* Spell Slot 5 */}
				<div className='col-12' style={{paddingBottom: '20px'}}>
					<form onSubmit={(e) => handleSubmit(e, 'spellSlot5')}>

					<div className="spells-field spell-form-titles"> Spell Slot 5</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"
						value={characterSpells.spellSlot5.characterSpellName}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot5: {
											...prevCharacterSpells.spellSlot5,
											characterSpellName: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"
						value={characterSpells.spellSlot5.characterSpellCastTime}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot5: {
											...prevCharacterSpells.spellSlot5,
											characterSpellCastTime: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"
							value={characterSpells.spellSlot5.characterSpellDamage}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot5: {
												...prevCharacterSpells.spellSlot5,
												characterSpellDamage: e.target.value,
										}
								}))
							}/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"
						value={characterSpells.spellSlot5.characterSpellDescription}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot5: {
											...prevCharacterSpells.spellSlot5,
											characterSpellDescription: e.target.value,
									}
							}))
						}/>
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
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"
							value={characterSpells.spellSlot5.characterSpellDuration}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot5: {
												...prevCharacterSpells.spellSlot5,
												characterSpellDuration: e.target.value,
										}
								}))
							}/>
						</div>	

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"
							value={characterSpells.spellSlot5.characterSpellSave}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot5: {
												...prevCharacterSpells.spellSlot5,
												characterSpellSave: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"
							value={characterSpells.spellSlot5.characterSpellSchool}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot5: {
												...prevCharacterSpells.spellSlot5,
												characterSpellSchool: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"
							value={characterSpells.spellSlot5.characterSpellRangeArea}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot5: {
												...prevCharacterSpells.spellSlot5,
												characterSpellRangeArea: e.target.value,
										}
								}))
							}/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Spell</div>

					<select className='spell-edit-character-field' style={{height: '35px'}} onChange={handleSelectChange('spellSlot5')}>
							<option/>
							{loadCharacterSpells
									.filter(spell => spell.characterSpellLevel === '5')
									.map(spell => (
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

	</div>
)
}

export default SpellsForm