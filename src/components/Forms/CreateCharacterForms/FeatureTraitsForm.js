import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function FeaturesTraitsForm({characterTraits, setCharacterTraits, fetchData}) {
  const { id: urlId } = useParams();
  const [data, setData] = useState({
		id: urlId,
		characterTraitTitle: '',
    characterTraitAdditionalInfo: '',
    characterTraitDescription: ''
	})
  //Sets user change
	const [selectedTrait, setSelectedTrait] = useState({
		selectedId: ''
	});

  //Handles user change
	const handleSelectChange = (e) => {
    const selectedId = e.target.value; 
    setSelectedTrait({ selectedId: selectedId });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!selectedTrait.selectedId) {
			setData((prevData) => ({ ...prevData, id: urlId }));
			await updateTrait();
		} else {
			//await updateExistingTrait(selectedTrait.selectedId, data.characterTraitTitle, 
      //data.characterTraitAdditionalInfo, data.characterTraitDescription); 
		}
	};

  //Post Request
	const updateTrait =  async (e) => {
		const {id, characterTraitTitle, characterTraitAdditionalInfo,
    characterTraitDescription } = data;
		try {

			const response = await axios.post(`http://localhost:4000/CreateCharacter/UpdateTrait/${id}`, {
				id, characterTraitTitle, characterTraitAdditionalInfo,
        characterTraitDescription
			});

			if (response.data.success) {
				const newTrait = response.data.newFeatureTrait;
				setCharacterTraits(prevTrait => [...prevTrait, newTrait]);
				toast.success('Updated character details');
			} else {
				toast.error('Failed to update character details');
			}
		} catch (error) {
			console.log(error)
		}
	}

  return (
    <form onSubmit={handleSubmit}>
    <div className='row'>
      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div className="text-center form-titles">Add New Feature/Trait</div>
      </div>

      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div className='basic-field-container' style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>

          <input className='create-character-field' style={{width: '65%'}} placeholder='Feature/Trait Name'
          onChange={(e) => setData({ ...data, characterTraitTitle: e.target.value})}/>

          <input className='create-character-field' style={{width: '33%'}} placeholder='Additional Detail'
          onChange={(e) => setData({ ...data, characterTraitAdditionalInfo: e.target.value})}/>

        </div>
      </div>

      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div style={{width: '100%'}}>

          <textarea className='description-field' placeholder='Description'
          onChange={(e) => setData({ ...data, characterTraitDescription: e.target.value})}/>

        </div>
      </div>

      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
          <select className='create-character-field' style={{width: '75%'}} 
          placeholder='Attack Name' onChange={handleSelectChange}>
            <option/>
            {characterTraits.map(trait => (
						  <option key={trait._id} value={trait._id}>{trait.characterTraitTitle}</option>
					  ))}
          </select>
					<button className='create-character-button' type="submit" > Update</button>
        </div>
      </div>

    </div>
    </form>
  );
}

export default FeaturesTraitsForm