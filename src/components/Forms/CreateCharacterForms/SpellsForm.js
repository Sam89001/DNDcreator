import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast';

//User
import { UserContext } from '../../../context/userContext';

//Images
import DownArrowImage from '../../../images/Down Arrow.png'

function SpellsForm({propId, getCharacterData, updateCharacterSpellcasting, setUpdateCharacterSpellcasting, 
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

	const characterSpellcasterClassRef = useRef(null);
	const characterSpellcasterAbilityRef = useRef(null);
	const characterSpellsaveDcRef= useRef(null);
	const characterSpellAttackBonusRef = useRef(null);
	const characterSpellSlot1Ref = useRef(null);
	const characterSpellSlot2Ref = useRef(null);
	const characterSpellSlot3Ref = useRef(null);
	const characterSpellSlot4Ref = useRef(null);
	const characterSpellSlot5Ref = useRef(null);
	const characterSpellSlot6Ref = useRef(null);
	const characterSpellSlot7Ref = useRef(null);
	const characterSpellSlot8Ref = useRef(null);
	const characterSpellSlot9Ref = useRef(null);

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
				setUpdateCharacterSpellcasting(prevState => ({
					...prevState,
					characterSpellcastingClass,
					characterSpellcastingAbility,
					characterSpellSaveDC,
					characterSpellAttackBonus
				}));
				toast.success('Updated character details');
			}
		} catch (error) {
			console.log(error);
		}
	}

	//Updates and Store Total Spell Slots
	const [characterSpellSlots, setCharacterSpellSlots] = useState({
		characterSpellSlot1: '',
		characterSpellSlot2: '',
		characterSpellSlot3: '',
		characterSpellSlot4: '',
		characterSpellSlot5: '',
		characterSpellSlot6: '',
		characterSpellSlot7: '',
		characterSpellSlot8: '',
		characterSpellSlot9: '',
	});
	const updateSpellSlots = async (e) => {
		e.preventDefault();
		const { characterSpellSlot1, characterSpellSlot2, characterSpellSlot3,
			characterSpellSlot4, characterSpellSlot5, characterSpellSlot6, characterSpellSlot7,
		  characterSpellSlot8, characterSpellSlot9 } = characterSpellSlots;
	
		try {
			const response = await axios.put(`http://localhost:4000/CreateCharacter/UpdateTotalSpellSlots/${characterId}`, {
				characterSpellSlot1, characterSpellSlot2, characterSpellSlot3,
				characterSpellSlot4, characterSpellSlot5, characterSpellSlot6, 
				characterSpellSlot7, characterSpellSlot8, characterSpellSlot9
			});
	
			if (response.data.error) {
				toast.error(response.data.error);
			} else {
				setUpdateCharacterSpellcasting(prevState => ({
					...prevState,
					characterSpellSlot1,
					characterSpellSlot2,
					characterSpellSlot3,
					characterSpellSlot4,
					characterSpellSlot5,
					characterSpellSlot6,
					characterSpellSlot7,
					characterSpellSlot8,
					characterSpellSlot9
				}));
				toast.success('Updated character details');
			}
		} catch (error) {
			console.log(error);
		}
	}

	//Sets Form Existing Spellcasting Information
	useEffect(() => {
		characterSpellcasterClassRef.current.value = updateCharacterSpellcasting.characterSpellcastingClass || '';
		characterSpellcasterAbilityRef.current.value = updateCharacterSpellcasting.characterSpellcastingAbility || '';
		characterSpellsaveDcRef.current.value = updateCharacterSpellcasting.characterSpellSaveDC || '';
		characterSpellAttackBonusRef.current.value = updateCharacterSpellcasting.characterSpellAttackBonus || '';
		characterSpellSlot1Ref.current.value = updateCharacterSpellcasting.characterSpellSlot1 || '';
		characterSpellSlot2Ref.current.value = updateCharacterSpellcasting.characterSpellSlot2 || '';
		characterSpellSlot3Ref.current.value = updateCharacterSpellcasting.characterSpellSlot3 || '';
		characterSpellSlot4Ref.current.value = updateCharacterSpellcasting.characterSpellSlot4 || '';
		characterSpellSlot5Ref.current.value = updateCharacterSpellcasting.characterSpellSlot5 || '';
		characterSpellSlot6Ref.current.value = updateCharacterSpellcasting.characterSpellSlot6 || '';
		characterSpellSlot7Ref.current.value = updateCharacterSpellcasting.characterSpellSlot7 || '';
		characterSpellSlot8Ref.current.value = updateCharacterSpellcasting.characterSpellSlot8 || '';
		characterSpellSlot9Ref.current.value = updateCharacterSpellcasting.characterSpellSlot9 || '';

		setCharacterSpellcasting(prevSpells => ({
				...prevSpells,
				characterSpellcastingClass: updateCharacterSpellcasting.characterSpellcastingClass,
				characterSpellcastingAbility: updateCharacterSpellcasting.characterSpellcastingAbility,
				characterSpellSaveDC: updateCharacterSpellcasting.characterSpellSaveDC,
				characterSpellAttackBonus: updateCharacterSpellcasting.characterSpellAttackBonus,
		}));
		setCharacterSpellSlots(prevData => ({
			...prevData,
			characterSpellSlot1: updateCharacterSpellcasting.characterSpellSlot1,
			characterSpellSlot2: updateCharacterSpellcasting.characterSpellSlot2,
			characterSpellSlot3: updateCharacterSpellcasting.characterSpellSlot3,
			characterSpellSlot4: updateCharacterSpellcasting.characterSpellSlot4,
			characterSpellSlot5: updateCharacterSpellcasting.characterSpellSlot5,
			characterSpellSlot6: updateCharacterSpellcasting.characterSpellSlot6,
			characterSpellSlot7: updateCharacterSpellcasting.characterSpellSlot7,
			characterSpellSlot8: updateCharacterSpellcasting.characterSpellSlot8,
			characterSpellSlot9: updateCharacterSpellcasting.characterSpellSlot9,
		}));
	}, [updateCharacterSpellcasting]);

	//Updates and Stores Spell Information
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

			const response = await axios.post(`/CreateCharacter/UpdateSpells/${characterId}`, {
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
				toast.error(response.data.error);
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
				const response = await axios.put(`/CreateCharacter/ChangeSpells/${id}`, {
					id, characterSpellName, characterSpellLevel,
					characterSpellCastTime, characterSpellRangeArea,
					characterSpellDescription, characterSpellDuration,
					characterSpellSave, characterSpellSchool, characterSpellDamage
				});

				if (response.data.error) {
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
	<div className="row" style={{minWidth: '1300px', paddingLeft: '10px', flexWrap: 'nowrap'}}>
		<div className='col-3' style={{marginRight: '10px'}}>
			<div className='row'>

				{/* General Spell Stats */}
				<div className='col-12' style={{paddingBottom: '5px', paddingLeft: '5px', paddingRight: '5px'}}>
					<form onSubmit={updateGeneralStats}>
					<div className="spells-field spell-form-titles"> Spellcasting Info</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spellcaster Class"
						ref={characterSpellcasterClassRef}
						onChange={(e) => setCharacterSpellcasting({ ...characterSpellcasting, characterSpellcastingClass: e.target.value })}
						onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}/>
					</div>

					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spellcasting Ability"
						ref={characterSpellcasterAbilityRef}
						onChange={(e) => setCharacterSpellcasting({ ...characterSpellcasting, characterSpellcastingAbility: e.target.value })}
						onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spellsave DC"
						ref={characterSpellsaveDcRef}
						onChange={(e) => setCharacterSpellcasting({ ...characterSpellcasting, characterSpellSaveDC: e.target.value })}
						onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}/>
					</div>

					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell ATK Bonus"
						ref={characterSpellAttackBonusRef}
						onChange={(e) => setCharacterSpellcasting({ ...characterSpellcasting, characterSpellAttackBonus: e.target.value })}
						onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}/>
					</div>

					<div className="spells-field">
						<button className='create-character-button' type="submit" > Update</button>
					</div>

					</form>
				</div>

				{/* Total Spell Stats */}
				<div className='col-12' style={{paddingBottom: '5px'}}>
					<form onSubmit={updateSpellSlots}>
						<div className="spell-form-titles"> Total Spell Slots</div>

						<div className='row'>
							<div className='col-2 total-spell-slots-layout'>
								<label className='spell-form-label'>Slot 1</label>
								<input className='field-style' style={{width: '100%'}} placeholder="Slot 1"
								ref={characterSpellSlot1Ref}
								onChange={(e) => setCharacterSpellSlots({ ...characterSpellSlots, characterSpellSlot1: e.target.value })}/>
							</div>

							<div className='col-2 total-spell-slots-layout'>
								<label className='spell-form-label'>Slot 2</label>
								<input className='field-style' style={{width: '100%'}} placeholder="Slot 2"
								ref={characterSpellSlot2Ref}
								onChange={(e) => setCharacterSpellSlots({ ...characterSpellSlots, characterSpellSlot2: e.target.value })}/>
							</div>

							<div className='col-2 total-spell-slots-layout'>
								<label className='spell-form-label'>Slot 3</label>
								<input className='field-style' style={{width: '100%'}} placeholder="Slot 3"
								ref={characterSpellSlot3Ref}
								onChange={(e) => setCharacterSpellSlots({ ...characterSpellSlots, characterSpellSlot3: e.target.value })}/>
							</div>

							<div className='col-2 total-spell-slots-layout'>
								<label className='spell-form-label'>Slot 4</label>
								<input className='field-style' style={{width: '100%'}} placeholder="Slot 4"
								ref={characterSpellSlot4Ref}
								onChange={(e) => setCharacterSpellSlots({ ...characterSpellSlots, characterSpellSlot4: e.target.value })}/>
							</div>

							<div className='col-2 total-spell-slots-layout'>
								<label className='spell-form-label'>Slot 5</label>
								<input className='field-style' style={{width: '100%'}} placeholder="Slot 5"
								ref={characterSpellSlot5Ref}
								onChange={(e) => setCharacterSpellSlots({ ...characterSpellSlots, characterSpellSlot5: e.target.value })}/>
							</div>

							<div className='col-2 total-spell-slots-layout'>
								<label className='spell-form-label'>Slot 6</label>
								<input className='field-style' style={{width: '100%'}} placeholder="Slot 6"
								ref={characterSpellSlot6Ref}
								onChange={(e) => setCharacterSpellSlots({ ...characterSpellSlots, characterSpellSlot6: e.target.value })}/>
							</div>

							<div className='col-2 total-spell-slots-layout'>
								<label className='spell-form-label'>Slot 7</label>
								<input className='field-style' style={{width: '100%'}} placeholder="Slot 7"
								ref={characterSpellSlot7Ref}
								onChange={(e) => setCharacterSpellSlots({ ...characterSpellSlots, characterSpellSlot7: e.target.value })}/>
							</div>

							<div className='col-2 total-spell-slots-layout'>
								<label className='spell-form-label'>Slot 8</label>
								<input className='field-style' style={{width: '100%'}} placeholder="Slot 8"
								ref={characterSpellSlot8Ref}
								onChange={(e) => setCharacterSpellSlots({ ...characterSpellSlots, characterSpellSlot8: e.target.value })}/>
							</div>

							<div className='col-2 total-spell-slots-layout'>
								<label className='spell-form-label'>Slot 9</label>
								<input className='field-style' style={{width: '100%'}} placeholder="Slot 9"
								ref={characterSpellSlot9Ref}
								onChange={(e) => setCharacterSpellSlots({ ...characterSpellSlots, characterSpellSlot9: e.target.value })}/>
							</div>

							<div className='col-6 total-spell-slots-layout' style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
									<button className='create-character-button' type="submit" style={{ height: '50%' }}>Update</button>
							</div>

						</div>

					</form>
				</div>

				{/* Cantrips */}
				<div className='col-12' style={{paddingLeft: '5px', paddingRight: '5px'}}>
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
				<div className='col-12' style={{paddingBottom: '10px'}}>
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
				<div className='col-12' style={{paddingBottom: '10px'}}>
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

				{/* Spell Slot 6 */}
				<div className='col-12' style={{paddingBottom: '10px'}}>
					<form onSubmit={(e) => handleSubmit(e, 'spellSlot6')}>

					<div className="spells-field spell-form-titles"> Spell Slot 6</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"
						value={characterSpells.spellSlot6.characterSpellName}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot6: {
											...prevCharacterSpells.spellSlot6,
											characterSpellName: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"
						value={characterSpells.spellSlot6.characterSpellCastTime}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot6: {
											...prevCharacterSpells.spellSlot6,
											characterSpellCastTime: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"
							value={characterSpells.spellSlot6.characterSpellDamage}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot6: {
												...prevCharacterSpells.spellSlot6,
												characterSpellDamage: e.target.value,
										}
								}))
							}/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"
						value={characterSpells.spellSlot6.characterSpellDescription}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot6: {
											...prevCharacterSpells.spellSlot6,
											characterSpellDescription: e.target.value,
									}
							}))
						}/>
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
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"
							value={characterSpells.spellSlot6.characterSpellDuration}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot6: {
												...prevCharacterSpells.spellSlot6,
												characterSpellDuration: e.target.value,
										}
								}))
							}/>
						</div>	

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"
							value={characterSpells.spellSlot6.characterSpellSave}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot6: {
												...prevCharacterSpells.spellSlot6,
												characterSpellSave: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"
							value={characterSpells.spellSlot6.characterSpellSchool}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot6: {
												...prevCharacterSpells.spellSlot6,
												characterSpellSchool: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"
							value={characterSpells.spellSlot6.characterSpellRangeArea}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot6: {
												...prevCharacterSpells.spellSlot6,
												characterSpellRangeArea: e.target.value,
										}
								}))
							}/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Spell</div>

					<select className='spell-edit-character-field' style={{height: '35px'}} onChange={handleSelectChange('spellSlot6')}>
							<option/>
							{loadCharacterSpells
									.filter(spell => spell.characterSpellLevel === '6')
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

				{/* Spell Slot 7 */}
				<div className='col-12' style={{paddingBottom: '20px'}}>
					<form onSubmit={(e) => handleSubmit(e, 'spellSlot7')}>

					<div className="spells-field spell-form-titles"> Spell Slot 7</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"
						value={characterSpells.spellSlot7.characterSpellName}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot7: {
											...prevCharacterSpells.spellSlot7,
											characterSpellName: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"
						value={characterSpells.spellSlot7.characterSpellCastTime}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot7: {
											...prevCharacterSpells.spellSlot7,
											characterSpellCastTime: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"
							value={characterSpells.spellSlot7.characterSpellDamage}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot7: {
												...prevCharacterSpells.spellSlot7,
												characterSpellDamage: e.target.value,
										}
								}))
							}/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"
						value={characterSpells.spellSlot7.characterSpellDescription}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot7: {
											...prevCharacterSpells.spellSlot7,
											characterSpellDescription: e.target.value,
									}
							}))
						}/>
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
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"
							value={characterSpells.spellSlot7.characterSpellDuration}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot7: {
												...prevCharacterSpells.spellSlot7,
												characterSpellDuration: e.target.value,
										}
								}))
							}/>
						</div>	

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"
							value={characterSpells.spellSlot7.characterSpellSave}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot7: {
												...prevCharacterSpells.spellSlot7,
												characterSpellSave: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"
							value={characterSpells.spellSlot7.characterSpellSchool}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot7: {
												...prevCharacterSpells.spellSlot7,
												characterSpellSchool: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"
							value={characterSpells.spellSlot7.characterSpellRangeArea}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot7: {
												...prevCharacterSpells.spellSlot7,
												characterSpellRangeArea: e.target.value,
										}
								}))
							}/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Spell</div>

					<select className='spell-edit-character-field' style={{height: '35px'}} onChange={handleSelectChange('spellSlot7')}>
							<option/>
							{loadCharacterSpells
									.filter(spell => spell.characterSpellLevel === '7')
									.map(spell => (
											<option key={spell._id} value={spell._id}>{spell.characterSpellName}</option>
									))}
					</select>

					<button className='create-character-button' type="submit"> Update</button>

					</form>
				</div>

				{/* Spell Slot 8 */}
				<div className='col-12' style={{paddingBottom: '10px'}}>
					<form onSubmit={(e) => handleSubmit(e, 'spellSlot8')}>

					<div className="spells-field spell-form-titles"> Spell Slot 8</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"
						value={characterSpells.spellSlot8.characterSpellName}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot8: {
											...prevCharacterSpells.spellSlot8,
											characterSpellName: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"
						value={characterSpells.spellSlot8.characterSpellCastTime}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot8: {
											...prevCharacterSpells.spellSlot8,
											characterSpellCastTime: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"
							value={characterSpells.spellSlot8.characterSpellDamage}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot8: {
												...prevCharacterSpells.spellSlot8,
												characterSpellDamage: e.target.value,
										}
								}))
							}/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"
						value={characterSpells.spellSlot8.characterSpellDescription}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot8: {
											...prevCharacterSpells.spellSlot8,
											characterSpellDescription: e.target.value,
									}
							}))
						}/>
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
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"
							value={characterSpells.spellSlot8.characterSpellDuration}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot8: {
												...prevCharacterSpells.spellSlot8,
												characterSpellDuration: e.target.value,
										}
								}))
							}/>
						</div>	

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"
							value={characterSpells.spellSlot8.characterSpellSave}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot8: {
												...prevCharacterSpells.spellSlot8,
												characterSpellSave: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"
							value={characterSpells.spellSlot8.characterSpellSchool}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot8: {
												...prevCharacterSpells.spellSlot8,
												characterSpellSchool: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"
							value={characterSpells.spellSlot8.characterSpellRangeArea}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot8: {
												...prevCharacterSpells.spellSlot8,
												characterSpellRangeArea: e.target.value,
										}
								}))
							}/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Spell</div>

					<select className='spell-edit-character-field' style={{height: '35px'}} onChange={handleSelectChange('spellSlot8')}>
							<option/>
							{loadCharacterSpells
									.filter(spell => spell.characterSpellLevel === '8')
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

					{/* Spell Slot 9 */}
				<div className='col-12' style={{paddingBottom: '10px'}}>
					<form onSubmit={(e) => handleSubmit(e, 'spellSlot9')}>

					<div className="spells-field spell-form-titles"> Spell Slot 9</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"
						value={characterSpells.spellSlot9.characterSpellName}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot9: {
											...prevCharacterSpells.spellSlot9,
											characterSpellName: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"
						value={characterSpells.spellSlot9.characterSpellCastTime}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot9: {
											...prevCharacterSpells.spellSlot9,
											characterSpellCastTime: e.target.value,
									}
							}))
						}/>
					</div>

					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"
							value={characterSpells.spellSlot9.characterSpellDamage}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot9: {
												...prevCharacterSpells.spellSlot9,
												characterSpellDamage: e.target.value,
										}
								}))
							}/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"
						value={characterSpells.spellSlot9.characterSpellDescription}
						onChange={(e) =>
							setCharacterSpells((prevCharacterSpells) => ({
									...prevCharacterSpells,
									spellSlot9: {
											...prevCharacterSpells.spellSlot9,
											characterSpellDescription: e.target.value,
									}
							}))
						}/>
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
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"
							value={characterSpells.spellSlot9.characterSpellDuration}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot9: {
												...prevCharacterSpells.spellSlot9,
												characterSpellDuration: e.target.value,
										}
								}))
							}/>
						</div>	

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"
							value={characterSpells.spellSlot9.characterSpellSave}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot9: {
												...prevCharacterSpells.spellSlot9,
												characterSpellSave: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"
							value={characterSpells.spellSlot9.characterSpellSchool}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot9: {
												...prevCharacterSpells.spellSlot9,
												characterSpellSchool: e.target.value,
										}
								}))
							}/>
						</div>

						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"
							value={characterSpells.spellSlot9.characterSpellRangeArea}
							onChange={(e) =>
								setCharacterSpells((prevCharacterSpells) => ({
										...prevCharacterSpells,
										spellSlot9: {
												...prevCharacterSpells.spellSlot9,
												characterSpellRangeArea: e.target.value,
										}
								}))
							}/>
						</div>
					</div>

					<div className="spells-field form-titles"> Edit Spell</div>

					<select className='spell-edit-character-field' style={{height: '35px'}} onChange={handleSelectChange('spellSlot9')}>
							<option/>
							{loadCharacterSpells
									.filter(spell => spell.characterSpellLevel === '9')
									.map(spell => (
											<option key={spell._id} value={spell._id}>{spell.characterSpellName}</option>
									))}
					</select>
					<button className='create-character-button' type="submit"> Update</button>
					</form>
				</div>

			</div>
		</div>

	</div>
)
}

export default SpellsForm