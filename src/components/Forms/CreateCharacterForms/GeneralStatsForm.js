import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function GeneralStatsForm({updateCharacterData}) {

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
		characterXp: ''
	}) 

	const updateGeneralStats = async (e) => {
		e.preventDefault();
		const { id, characterName, characterClass, characterHp, characterAc, characterLevel,
			characterRace, characterBackground, characterAlignment, characterSpeed, characterXp } = data;
	
		try {
			const response = await axios.put(`http://localhost:4000/CreateCharacter/UpdateGeneralStats/${id}`, {
				id, characterName, characterClass, characterHp, characterAc, characterLevel,
				characterRace, characterBackground, characterAlignment, characterSpeed,
				characterXp
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
						onChange={(e) => setData({ ...data, characterName: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-mid-field' placeholder='Class'
						onChange={(e) => setData({ ...data, characterClass: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='HP'
						onChange={(e) => setData({ ...data, characterHp: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='AC'
						onChange={(e) => setData({ ...data, characterAc: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='Level'
						onChange={(e) => setData({ ...data, characterLevel: e.target.value })}/>
					</div>
				</div>

				{/* Second Row*/}

				<div style={{ display: 'flex'}}>
					<div className='create-character-container'>
						<input className='create-character-field create-character-mid-field' placeholder='Race'
						onChange={(e) => setData({ ...data, characterRace: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-mid-field' placeholder='Background'
						onChange={(e) => setData({ ...data, characterBackground: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-mid-field' placeholder='Alignment'
						onChange={(e) => setData({ ...data, characterAlignment: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='Speed'
						onChange={(e) => setData({ ...data, characterSpeed: e.target.value })}/>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='Xp'
						onChange={(e) => setData({ ...data, characterXp: e.target.value })}/>
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