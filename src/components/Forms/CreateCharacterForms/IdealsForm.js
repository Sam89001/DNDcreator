import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function IdealsForm ({characterIdeals, setCharacterIdeals, fetchData}) {

  const { id: urlId } = useParams();
	const [data, setData] = useState({
		id: urlId,
		characterIdeal: '',
	}) 

  //Sets user change
  const [selectedIdeal, setSelectedIdeal] = useState({
		selectedId: '',
		selectedCharacterIdeal: ''
	});
	const handleSelectChange = (e) => {
    const selectedId = e.target.value; 
    const selectedValue = e.target.options[e.target.selectedIndex].text; 
    setSelectedIdeal({ selectedId: selectedId, selectedCharacterIdeal: selectedValue });

	//populates the field
	const loadedValue = characterIdeals.find(value => value._id === selectedId);
	setData({
		...data,
		characterIdeal: loadedValue ? loadedValue.characterIdeal : '',
	  });
	};

	//Handles user change
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!selectedIdeal.selectedId && !selectedIdeal.selectedCharacterIdeal) {
			setData((prevData) => ({ ...prevData, id: urlId }));
			await updateIdeal();
		} else {
			await updateExistingIdeal(selectedIdeal.selectedId, data.characterIdeal);
		}
	};

	//Post Request
	const updateIdeal =  async (e) => {
		const {id, characterIdeal } = data;
		
		try {
			const response = await axios.post(`/CreateCharacter/UpdateIdeal/${id}`, {
				id, characterIdeal
			});

			if (response.data.success) {
				const newIdeal = response.data.newIdeal;
				setCharacterIdeals(prevIdeals => [...prevIdeals, newIdeal]);
				toast.success('Updated character details');
			} else {
				toast.error('Failed to update character details');
			}
		} catch (error) {
			console.log(error)
		}
	}

	//Put Request
	const updateExistingIdeal = async (id, characterIdeal) => {
		try {
				const response = await axios.put(`/CreateCharacter/ChangeIdeal/${id}`, {
					id,
					characterIdeal
				});

				if (response.error) {
					toast.error(response.data.error);
				} else {
					fetchData();
					toast.success('Updated character details');
				}
		} catch (error) {
				console.log(error);
		}
	};

 return(
    <form onSubmit={handleSubmit}>
  	<div className = "row">

			<div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'> 
				<div className="text-center form-titles">Add New Ideal</div>
			</div>

			<div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'>
				<input className='create-character-field multichoice-input-field' placeholder='Name'
				value={data.characterIdeal}
				onChange={(e) =>
					setData((prevData) => ({
						...prevData,
						characterIdeal: e.target.value,
					}))
				}/>
			</div>

			<div className='col-8 d-flex align-items-center justify-content-center skill-section-margin'> 
				<div className="text-center form-titles">View/Edit Ideal</div>
			</div>

			<div className='col-8 d-flex align-items-center justify-content-center skill-section-margin'>
				<div className=' create-character-field multichoice-edit-field-small'>
					<select className='edit-character-field' id='characterPersonalityEdit'
					 onChange={handleSelectChange}>
						<option/>
						{characterIdeals.map(Ideal => (
						<option key={Ideal._id} value={Ideal._id}>{Ideal.characterIdeal}</option>
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

export default IdealsForm