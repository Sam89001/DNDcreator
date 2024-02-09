import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function BondsForm({characterBonds, setCharacterBonds, fetchData}) {
	const { id: urlId } = useParams();
	const [data, setData] = useState({
		id: urlId,
		characterBond: '',
	})
	 //Sets user change
	const [selectedBond, setSelectedBond] = useState({
		selectedId: '',
		selectedCharacterBond: ''
	});
	const handleSelectChange = (e) => {
    const selectedId = e.target.value; 
    const selectedValue = e.target.options[e.target.selectedIndex].text; 
    setSelectedBond({ selectedId: selectedId, selectedCharacterBond: selectedValue });
	};

	//Handles user change
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!selectedBond.selectedId && !selectedBond.selectedCharacterBond) {
			setData((prevData) => ({ ...prevData, id: urlId }));
			await updateBond();
		} else {
			 await updateExistingBond(selectedBond.selectedId, data.characterBond); 
		}
	};

	//Post Request
	const updateBond =  async (e) => {
		const {id, characterBond } = data;
		try {
			const response = await axios.post(`http://localhost:4000/CreateCharacter/UpdateBond/${id}`, {
				id, characterBond
			});

			if (response.data.success) {
				const newBond = response.data.newBond;
				setCharacterBonds(prevBond => [...prevBond, newBond]);
				toast.success('Updated character details');
			} else {
				toast.error('Failed to update character details');
			}
		} catch (error) {
			console.log(error)
		}
	}

	//Put Request
	const updateExistingBond = async (id, characterBond) => {
		try {
				const response = await axios.put(`http://localhost:4000/CreateCharacter/ChangeBond/${id}`, {
					id,
					characterBond
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
           <div className="text-center form-titles">Add New Bond</div>
        </div>
    
        <div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'>
          <input className='create-character-field multichoice-input-field' placeholder='Name'
             onChange={(e) => setData({ ...data, characterBond: e.target.value})}/>
          </div>
    
          <div className='col-8 d-flex align-items-center justify-content-center skill-section-margin'> 
            <div className="text-center form-titles">View/Edit Bond</div>
          </div>
    
          <div className='col-8 d-flex align-items-center justify-content-center skill-section-margin'>
            <div className=' create-character-field multichoice-edit-field-small'>
                <select className='edit-character-field' id='characterPersonalityEdit'
                  onChange={handleSelectChange}>
                  <option/>
									{characterBonds.map(Bond => (
										<option key={Bond._id} value={Bond._id}>{Bond.characterBond}</option>
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

export default BondsForm