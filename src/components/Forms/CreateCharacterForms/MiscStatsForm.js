import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function SkillsForm({updateCharacterMisc}) {

	const { id: urlId } = useParams();
	const [data, setData] = useState({
		id: urlId,
		characterInspiration: '',
		characterProficiencyBonus: '',
		characterPerception: '',
		characterHitDice: '',
	}) 

	const updateMiscStats = async (e) => {
		e.preventDefault();
		const { id, characterInspiration, characterProficiencyBonus, characterPerception,
			characterHitDice } = data;

		try {
			const response = await axios.put(`http://localhost:4000/CreateCharacter/UpdateMiscStats/${id}`, {
				id, characterInspiration, characterProficiencyBonus, characterPerception,
				characterHitDice
			});

			if (response.data.error) {
				toast.error(response.data.error);
			} else {
				updateCharacterMisc(data)
				setData((prevData) => ({ ...prevData, id: urlId }));
				toast.success('Updated character details');
			}
			
		} catch (error) {
			console.log(error);
		}

	}

//HTML
  return (
	<form onSubmit={updateMiscStats}>
		<div className='row' style={{padding: '5px'}}>

			{/* First Titles */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin form-title-border-right'> 
				<div className="text-center form-titles">Inspiration</div>
			</div>

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin form-title-border-left'> 
				<div className="text-center form-titles" >P Bonus</div>
			</div>

			{/* First Fields */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin '> 
				<input className='create-character-field create-character-small-field' placeholder='Inspiration'
				onChange={(e) => setData({ ...data, characterInspiration: e.target.value})}/>
			</div>

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin'> 
				<input className='create-character-field create-character-small-field' style={{borderRadius: '10px'}} placeholder='P Bonus'
				onChange={(e) => setData({ ...data, characterProficiencyBonus: e.target.value})}/>
			</div>


			{/* Second Titles */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin form-title-border-right'> 
				<div className="text-center form-titles">Perception</div>
			</div>

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin form-title-border-left'> 
				<div className="text-center form-titles" >Hit Dice</div>
			</div>

			{/* Second Fields */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin '> 
				<input className='create-character-field create-character-small-field' placeholder='Perception'
				onChange={(e) => setData({ ...data, characterPerception: e.target.value})}/>
			</div>

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin '> 
				<input className='create-character-field create-character-small-field' style={{borderRadius: '10px'}} placeholder='Hit Dice'
				onChange={(e) => setData({ ...data, characterHitDice: e.target.value})}/>
			</div>

			<div className='col-12 d-flex align-items-center justify-content-center' style={{marginBottom: '10px'}}> 
  			<button className='create-character-button' type="submit" > Update</button>
			</div>

		</div>
			
	</form>
  );
}

export default SkillsForm