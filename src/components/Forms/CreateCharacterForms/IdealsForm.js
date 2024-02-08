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
	};

	//Handles user change

 return(
    <form >
  	<div className = "row">

			<div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'> 
				<div className="text-center form-titles">Add New Ideal</div>
			</div>

			<div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'>
				<input className='create-character-field multichoice-input-field' placeholder='Name'
				onChange={(e) => setData({ ...data, characterIdeal: e.target.value})}/>
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