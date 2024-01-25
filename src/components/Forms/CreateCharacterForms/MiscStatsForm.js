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

			{/* First Titles */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin form-title-border-right'> 
				<div className="text-center form-titles">Inspiration</div>
			</div>

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin form-title-border-left'> 
				<div className="text-center form-titles" >P Bonus</div>
			</div>

			{/* First Fields */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin '> 
				<input className='create-character-field create-character-small-field'></input>
			</div>

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin'> 
				<input className='create-character-field create-character-small-field' style={{borderRadius: '10px'}}></input>
			</div>


			{/* Second Titles */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin form-title-border-right'> 
				<div className="text-center form-titles">Perception</div>
			</div>

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin form-title-border-left'> 
				<div className="text-center form-titles" >Hit Dice</div>
			</div>

			{/* Second Fields */}

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin '> 
				<input className='create-character-field create-character-small-field'></input>
			</div>

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin '> 
				<input className='create-character-field create-character-small-field' style={{borderRadius: '10px'}}></input>
			</div>

			<div className='col-12 d-flex align-items-center justify-content-center' style={{marginBottom: '10px'}}> 
  			<button className='create-character-button' type="submit" > Update</button>
			</div>

		</div>
			
	</form>
  );
}

export default SkillsForm