import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function PersonalityTraitForm({characterPersonalityTraits, setCharacterPersonalityTraits, fetchData}) {

	const { id: urlId } = useParams();
	const [data, setData] = useState({
		id: urlId,
		characterPersonalityTrait: '',
	}) 

	//Sets user change
	const [selectedTrait, setSelectedTrait] = useState({
		selectedId: '',
		selectedCharacterPersonalityTrait: ''
	});

	const handleSelectChange = (e) => {
    const selectedId = e.target.value; 
    const selectedValue = e.target.options[e.target.selectedIndex].text; 
    setSelectedTrait({ selectedId: selectedId, selectedCharacterPersonalityTrait: selectedValue });

	
	const loadedValue = characterPersonalityTraits.find(value => value._id === selectedId);
	setData({
		...data,
		characterPersonalityTrait: loadedValue ? loadedValue.characterPersonalityTrait : '',
	  });
	};
	
	//Handles user change
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!selectedTrait.selectedId && !selectedTrait.selectedCharacterPersonalityTrait) {
			setData((prevData) => ({ ...prevData, id: urlId }));
			await updatePersonalityTrait();
		} else {
			await updateExistingPersonalityTrait(selectedTrait.selectedId, data.characterPersonalityTrait);
		}
	};

	//Post Request
	const updatePersonalityTrait =  async (e) => {
		const {id, characterPersonalityTrait } = data;
		
		try {
			const response = await axios.post(`/CreateCharacter/UpdatePersonalityTrait/${id}`, {
				id, characterPersonalityTrait
			});

			if (response.data.success) {
				const newTrait = response.data.newPersonalityTrait;
				setCharacterPersonalityTraits(prevTraits => [...prevTraits, newTrait]);
				toast.success('Updated character details');
			} else {
				toast.error('Failed to update character details');
			}
		} catch (error) {
			console.log(error)
		}
	}

	//Put Request
	const updateExistingPersonalityTrait = async (id, characterPersonalityTrait) => {
		try {
				const response = await axios.put(`/CreateCharacter/ChangePersonalityTrait/${id}`, {
					id,
					characterPersonalityTrait
				});

				if (response.error) {
					toast.error(response.data.error);
				} else {
					//Calls the get request
					fetchData();
					toast.success('Updated character details');
				}
		} catch (error) {
				console.log(error);
		}
	};

 return (
	<form onSubmit={handleSubmit}>
  	<div className = "row">

			<div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'> 
				<div className="text-center form-titles">Add New Personality Trait</div>
			</div>

			<div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'>
				<input className='create-character-field multichoice-input-field' placeholder='Name'
					value={data.characterPersonalityTrait}
					onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              characterPersonalityTrait: e.target.value,
            }))
          }/>
			</div>

			<div className='col-8 d-flex align-items-center justify-content-center skill-section-margin'> 
				<div className="text-center form-titles">View/Edit Personality Trait</div>
			</div>

			<div className='col-8 d-flex align-items-center justify-content-center skill-section-margin'>
				<div className=' create-character-field multichoice-edit-field-small'>
					<select className='edit-character-field' id='characterPersonalityEdit'
					 onChange={handleSelectChange}>
						<option/>
						{characterPersonalityTraits.map(trait => (
						<option key={trait._id} value={trait._id}>{trait.characterPersonalityTrait}</option>
						))}
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