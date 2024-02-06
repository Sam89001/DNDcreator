import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function PersonalityTraitForm() {

	const { id: urlId } = useParams();
	const [data, setData] = useState({
		id: urlId,
		characterPersonalityTrait: '',
	}) 

	const updatePersonalityTrait =  async (e) => {
		e.preventDefault()
		const {id, characterPersonalityTrait } = data;
		try {
			const response = await axios.put(`http://localhost:4000/CreateCharacter/UpdatePersonalityTrait/${id}`, {
				id, characterPersonalityTrait
			});

			if(response.error) {
				toast.error(response.data.error);
			} else {
				setData((prevData) => ({ ...prevData, id: urlId }));
				toast.success('Updated character details');
			}

		} catch (error) {
			console.log(error)
		}
	}

 return (
	<form onSubmit={updatePersonalityTrait}>
  	<div className = "row">

			<div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'> 
				<div className="text-center form-titles">Add New Personality Trait</div>
			</div>

			<div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'>
				<input className='create-character-multichoice-field create-character-field' placeholder='Name'
				onChange={(e) => setData({ ...data, characterPersonalityTrait: e.target.value})}/>
			</div>

			<div className='col-8 d-flex align-items-center justify-content-center skill-section-margin'> 
				<div className="text-center form-titles">View/Edit Personality Trait</div>
			</div>

			<div className='col-8 d-flex align-items-center justify-content-center skill-section-margin'>
				<div className='create-character-multichoice-field create-character-field'>
					<select className='edit-character-field' id='characterPersonalityEdit'>
						<option></option>
						
					</select>
				</div>
			</div>

			<div className='col-3 d-flex align-items-center justify-content-center skill-section-margin'>
				<button className='create-character-button' type="submit" > Update</button>
			</div>

			
    
   
  	</div>
	</form>
 )
}

export default PersonalityTraitForm