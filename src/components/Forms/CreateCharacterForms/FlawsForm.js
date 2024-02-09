import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function FlawsForm({characterFlaws, setCharacterFlaws, fetchData}) {
	const { id: urlId } = useParams();
	const [data, setData] = useState({
		id: urlId,
		characterFlaw: '',
	})
	//Sets user change
	const [selectedFlaw, setSelectedFlaw] = useState({
		selectedId: '',
		selectedCharacterFlaw: ''
	});

	//Handles user change
	const handleSelectChange = (e) => {
    const selectedId = e.target.value; 
    const selectedValue = e.target.options[e.target.selectedIndex].text; 
    setSelectedFlaw({ selectedId: selectedId, selectedCharacterFlaw: selectedValue });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!selectedFlaw.selectedId && !selectedFlaw.selectedCharacterFlaw) {
			setData((prevData) => ({ ...prevData, id: urlId }));
			await updateFlaw();
		} else {
			 await updateExistingFlaw(selectedFlaw.selectedId, data.characterFlaw); 
		}
	};

	//Post Request
	const updateFlaw =  async (e) => {
		const {id, characterFlaw } = data;
		try {
			const response = await axios.post(`http://localhost:4000/CreateCharacter/UpdateFlaw/${id}`, {
				id, characterFlaw
			});

			if (response.data.success) {
				const newFlaw = response.data.newFlaw;
				setCharacterFlaws(prevFlaw => [...prevFlaw, newFlaw]);
				toast.success('Updated character details');
			} else {
				toast.error('Failed to update character details');
			}
		} catch (error) {
			console.log(error)
		}
	}
	
	//Put Request
	const updateExistingFlaw = async (id, characterFlaw) => {
		try {
				const response = await axios.put(`http://localhost:4000/CreateCharacter/ChangeFlaw/${id}`, {
					id,
					characterFlaw
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
           <div className="text-center form-titles">Add New Flaw</div>
        </div>
    
        <div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'>
          <input className='create-character-field multichoice-input-field' placeholder='Name'
             onChange={(e) => setData({ ...data, characterFlaw: e.target.value})}/>
          </div>
    
          <div className='col-8 d-flex align-items-center justify-content-center skill-section-margin'> 
            <div className="text-center form-titles">View/Edit Flaw</div>
          </div>
    
          <div className='col-8 d-flex align-items-center justify-content-center skill-section-margin'>
            <div className=' create-character-field multichoice-edit-field-small'>
                <select className='edit-character-field' id='characterPersonalityEdit'
                  onChange={handleSelectChange}>
                  <option/>
					{characterFlaws.map(Flaw => (
						<option key={Flaw._id} value={Flaw._id}>{Flaw.characterFlaw}</option>
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

export default FlawsForm;