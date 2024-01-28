import '../../../css/Form.css';
import '../../../css/Site.css';

import { useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import {toast} from 'react-hot-toast'


function SkillsForm({}) {

	const { id: urlId } = useParams();
	const [data, setData] = useState({
		id: urlId,
		characterStrength: '',
		characterDexterity: '',
		characterConstitution: '',
		characterIntelligence: '',
		characterWisdom: '',
		characterCharisma: '',
		characterProficiencys: [],
	})

	const handleCheckboxChange = (e, skill) => {
    const { checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      characterProficiencys: checked
        ? [...prevData.characterProficiencys, skill]
        : prevData.characterProficiencys.filter((proficiency) => proficiency !== skill),
    }));
  };	

	const updateSkills = async (e) => {
		e.preventDefault();
		const {id, characterStrength, characterDexterity, characterConstitution, characterIntelligence,
		characterWisdom, characterCharisma, characterProficiencys} = data;

		try {
			const response = await axios.put(`http://localhost:4000/CreateCharacter/UpdateSkills/${id}`, {
				id, characterStrength, characterDexterity, characterConstitution, characterIntelligence,
				characterWisdom, characterCharisma, characterProficiencys
			})

			if (response.error) {
				toast.error(response.data.error);
			} else {
				
				setData((prevData) => ({ ...prevData, id: urlId }));
				toast.success('Updated character details');
			}
		} catch (error) {
			console.log(error)
		}

		
	};
	

//HTML
  return (
	<form onSubmit={updateSkills}>
		<div className='row' style={{padding: '5px'}}>

			{/* Titles */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin form-title-border-right'> 
				<div className="text-center form-titles">Proficiency</div>
			</div>

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin form-title-border-left'> 
				<div className="text-center form-titles" style={{paddingRight: '10px'}}>Skills</div>
			</div>

			{/* Strength */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin' > 
  			<input className='profficient-field' type="checkbox" value='Strength'
				onChange={(e) => handleCheckboxChange(e, 'Strength')}/>
			</div>

      <div className='col-6 skill-section-margin' > 
			  <input className='skills-field' placeholder='Strength'
				onChange={(e) => setData({ ...data, characterStrength: e.target.value })}/>
      </div>

			{/* Dexterity */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin' > 
  			<input className='profficient-field' type="checkbox" value='Dexterity'
				onChange={(e) => handleCheckboxChange(e, 'Dexterity')}/>
			</div>

      <div className='col-6 skill-section-margin' > 
			  <input className='skills-field' placeholder='Dexterity'
				onChange={(e) => setData({ ...data, characterDexterity: e.target.value })}/>
      </div>

			{/* Constitution */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin' > 
  			<input className='profficient-field' type="checkbox" value='Constitution'
				onChange={(e) => handleCheckboxChange(e, 'Constitution')}/>
			</div>

      <div className='col-6 skill-section-margin' > 
			  <input className='skills-field' placeholder='Constitution'
				onChange={(e) => setData({ ...data, characterConstitution: e.target.value })}/>
      </div>

			{/* Intelligence */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin' > 
  			<input className='profficient-field' type="checkbox" value='Intelligence'
				onChange={(e) => handleCheckboxChange(e, 'Intelligence')}/>
			</div>

      <div className='col-6 skill-section-margin' > 
			  <input className='skills-field' placeholder='Intelligence'
				onChange={(e) => setData({ ...data, characterIntelligence: e.target.value })}/>
      </div>

			{/* Wisdom */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin' > 
  			<input className='profficient-field' type="checkbox" value='Wisdom' 
				onChange={(e) => handleCheckboxChange(e, 'Wisdom')}/>
			</div>

      <div className='col-6 skill-section-margin' > 
			  <input className='skills-field' placeholder='Wisdom'
				onChange={(e) => setData({ ...data, characterWisdom: e.target.value })}/>
      </div>

			{/* Charisma */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin' > 
  			<input className='profficient-field' type="checkbox" value='Charisma' 
				onChange={(e) => handleCheckboxChange(e, 'Charisma')}/>
			</div>

      <div className='col-6 skill-section-margin' > 
			  <input className='skills-field' placeholder='Charisma'
				onChange={(e) => setData({ ...data, characterCharisma: e.target.value })}/>
      </div>

			{/* Save button */}

			<div className='col-12 d-flex align-items-center justify-content-center' style={{marginBottom: '10px'}}> 
  			<button className='create-character-button' type="submit" > Update</button>
			</div>

		</div>
			
	</form>
  );
}

export default SkillsForm