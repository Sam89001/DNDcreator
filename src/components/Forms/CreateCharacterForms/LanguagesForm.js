import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function LanguagesForm({characterLanguages, setCharacterLanguages, fetchData}) {
    const { id: urlId } = useParams();
	const [data, setData] = useState({
		id: urlId,
		characterLanguage: '',
	})
  //Sets user change
	const [selectedLanguage, setSelectedLanguage] = useState({
		selectedId: '',
		selectedCharacterLanguage: ''
	});

	//Handles user change
  const handleSelectChange = (e) => {
  	const selectedId = e.target.value; 
    const selectedValue = e.target.options[e.target.selectedIndex].text; 
    setSelectedLanguage({ selectedId: selectedId, selectedCharacterLanguage: selectedValue });
  };
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!selectedLanguage.selectedId && !selectedLanguage.selectedCharacterLanguage) {
			setData((prevData) => ({ ...prevData, id: urlId }));
			await updateLanguage();
		} else {
			 //await updateExistingLanguage(selectedLanguage.selectedId, data.characterLanguage); 
		}
	};

	//Post Request
	const updateLanguage =  async (e) => {
		const {id, characterLanguage} = data;
		try {
			const response = await axios.post(`http://localhost:4000/CreateCharacter/UpdateLanguage/${id}`, {
				id, characterLanguage
			});

			if (response.data.success) {
				const newLanguage = response.data.newLanguage;
				setCharacterLanguages(prevLanguage => [...prevLanguage, newLanguage]);
				toast.success('Updated character details');
			} else {
				toast.error('Failed to update character details');
			}
		} catch (error) {
			console.log(error)
		}
	}

	return(
    <form onSubmit={handleSubmit}>
      <div className = "row">
    
        <div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'> 
           <div className="text-center form-titles">Add New Language</div>
        </div>
    
        <div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'>
          <input className='create-character-field multichoice-input-field' placeholder='Name'
             onChange={(e) => setData({ ...data, characterLanguage: e.target.value})}/>
          </div>
    
          <div className='col-8 d-flex align-items-center justify-content-center skill-section-margin'> 
            <div className="text-center form-titles">View/Edit Bond</div>
          </div>
    
          <div className='col-8 d-flex align-items-center justify-content-center skill-section-margin'>
            <div className=' create-character-field multichoice-edit-field-small'>
                <select className='edit-character-field' id='characterPersonalityEdit'
                  onChange={handleSelectChange}>
                  <option/>
									{characterLanguages.map(Language => (
										<option key={Language._id} value={Language._id}>{Language.characterLanguage}</option>
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

export default LanguagesForm;