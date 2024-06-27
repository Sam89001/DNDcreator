import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function GeneralStatsForm({updateCharacterData, characterData}) {

	const { id: urlId } = useParams();
	const [data, setData] = useState({
		id: urlId,
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
		characterInspiration: '',
		characterProficiencyBonus: '',
		characterPerception: '',
		characterHitDice: '',
	}) 

	const characterNameRef = useRef(null);
	const characterClassRef = useRef(null);
	const characterHPRef = useRef(null);
	const characterACRef = useRef(null);
	const characterLevelRef = useRef(null);
	const characterInspirationRef = useRef(null);
	const characterPerceptionRef = useRef(null);
	const characterRaceRef = useRef(null);
	const characterBackgroundRef = useRef(null);
	const characterAlignmentRef = useRef(null);
	const characterSpeedRef = useRef(null);
	const characterXpRef = useRef(null);
	const characterPbonusRef = useRef(null);
	const characterHitDiceRef = useRef(null);

	useEffect(() => {
		characterNameRef.current.value = characterData.characterName;
		characterClassRef.current.value = characterData.characterClass;
		characterHPRef.current.value = characterData.characterHp;
		characterACRef.current.value = characterData.characterAc;
		characterLevelRef.current.value = characterData.characterLevel;
		characterRaceRef.current.value = characterData.characterRace;
		characterBackgroundRef.current.value = characterData.characterBackground;
		characterAlignmentRef.current.value = characterData.characterAlignment;
		characterSpeedRef.current.value = characterData.characterSpeed;
		characterXpRef.current.value = characterData.characterXp;
		characterInspirationRef.current.value = characterData.characterInspiration;
		characterPbonusRef.current.value = characterData.characterProficiencyBonus;
		characterPerceptionRef.current.value = characterData.characterPerception;
		characterHitDiceRef.current.value = characterData.characterHitDice;

		setData(prevData => ({
				...prevData,
				characterName: characterData.characterName,
				characterClass: characterData.characterClass,
				characterHp: characterData.characterHp,
				characterAc: characterData.characterAc,
				characterLevel: characterData.characterLevel,
				characterRace: characterData.characterRace,
				characterBackground: characterData.characterBackground,
				characterAlignment: characterData.characterAlignment,
				characterSpeed: characterData.characterSpeed,
				characterXp: characterData.characterXp,
				characterInspiration: characterData.characterInspiration,
				characterProficiencyBonus: characterData.characterProficiencyBonus,
				characterPerception: characterData.characterPerception,
				characterHitDice: characterData.characterHitDice,
		}));
	}, [characterData]);

	const updateGeneralStats = async (e) => {
		e.preventDefault();
		const { id, characterName, characterClass, characterHp, characterAc, characterLevel,
			characterRace, characterBackground, characterAlignment, characterSpeed, characterXp,
			characterInspiration, characterProficiencyBonus, characterPerception, characterHitDice } = data;
	
		try {
			const response = await axios.put(`/CreateCharacter/UpdateGeneralStats/${id}`, {
				id, characterName, characterClass, characterHp, characterAc, characterLevel,
				characterRace, characterBackground, characterAlignment, characterSpeed,
				characterXp, characterInspiration, characterProficiencyBonus, characterPerception, characterHitDice
			});
	
			if (response.data.error) {
				toast.error(response.data.error);
			} else {
				updateCharacterData(data);
				setData((prevData) => ({ ...prevData, id: urlId }));
				toast.success('Updated character details');
			}
		} catch (error) {
			console.log(error);
		}
	}

//HTML
  return (
	<form onSubmit={updateGeneralStats}>
		<div style={{display: 'flex', justifyContent: 'center' }}>
			<div >
				{/* First Row*/}

				<div style={{ display: 'flex'}}>

					<div className='create-character-container'>
						<input className='create-character-field create-character-large-field' placeholder='Character Name'
						ref={characterNameRef}
						onChange={(e) => setData({ ...data, characterName: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-mid-field' placeholder='Class'
						ref={characterClassRef}
						onChange={(e) => setData({ ...data, characterClass: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='HP'
						ref={characterHPRef}
						onChange={(e) => setData({ ...data, characterHp: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='AC'
						ref={characterACRef}
						onChange={(e) => setData({ ...data, characterAc: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='Level'
						ref={characterLevelRef}
						onChange={(e) => setData({ ...data, characterLevel: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='Inspiration'
						ref={characterInspirationRef}
						onChange={(e) => setData({ ...data, characterInspiration: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='Perception'
						ref={characterPerceptionRef}
						onChange={(e) => setData({ ...data, characterPerception: e.target.value })}/>
					</div>
				</div>

				{/* Second Row*/}

				<div style={{ display: 'flex'}}>
					<div className='create-character-container'>
						<input className='create-character-field create-character-mid-field' placeholder='Race'
						ref={characterRaceRef}
						onChange={(e) => setData({ ...data, characterRace: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-mid-field' placeholder='Background'
						ref={characterBackgroundRef}
						onChange={(e) => setData({ ...data, characterBackground: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-mid-field' placeholder='Alignment'
						ref={characterAlignmentRef}
						onChange={(e) => setData({ ...data, characterAlignment: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='Speed'
						ref={characterSpeedRef}
						onChange={(e) => setData({ ...data, characterSpeed: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='Xp'
						ref={characterXpRef}
						onChange={(e) => setData({ ...data, characterXp: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='P-Bonus'
						ref={characterPbonusRef}
						onChange={(e) => setData({ ...data, characterProficiencyBonus: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='Hit Dice'
						ref={characterHitDiceRef}
						onChange={(e) => setData({ ...data, characterHitDice: e.target.value })}/>
					</div>

					<div style={{width: '60px', textAlign: 'center'}}>
						<button className='create-character-button' type="submit" > Update</button>
					</div>

				</div>

			</div>
		</div>
	</form>
  );
}

export default GeneralStatsForm