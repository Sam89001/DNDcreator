import '../../../css/Form.css';
import '../../../css/Site.css';

import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function SkillsForm() {

//HTML
  return (
	<form >
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
  			<input className='profficient-field' type="checkbox" />
			</div>

      <div className='col-6 skill-section-margin' > 
			  <input className='skills-field' placeholder='Strength'></input>
      </div>

			{/* Dexterity */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin' > 
  			<input className='profficient-field' type="checkbox" />
			</div>

      <div className='col-6 skill-section-margin' > 
			  <input className='skills-field' placeholder='Dexterity'></input>
      </div>

			{/* Constitution */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin' > 
  			<input className='profficient-field' type="checkbox" />
			</div>

      <div className='col-6 skill-section-margin' > 
			  <input className='skills-field' placeholder='Constitution'></input>
      </div>

			{/* Intelligence */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin' > 
  			<input className='profficient-field' type="checkbox" />
			</div>

      <div className='col-6 skill-section-margin' > 
			  <input className='skills-field' placeholder='Intelligence'></input>
      </div>

			{/* Wisdom */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin' > 
  			<input className='profficient-field' type="checkbox" />
			</div>

      <div className='col-6 skill-section-margin' > 
			  <input className='skills-field' placeholder='Wisdom'></input>
      </div>

			{/* Charisma */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin' > 
  			<input className='profficient-field' type="checkbox" />
			</div>

      <div className='col-6 skill-section-margin' > 
			  <input className='skills-field' placeholder='Charisma'></input>
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