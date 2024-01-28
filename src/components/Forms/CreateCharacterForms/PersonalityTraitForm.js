import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function PersonalityTraitForm() {
 return (
	<form>
  	<div className = "row">

			<div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'> 
				<div className="text-center form-titles">Add New Personality Trait</div>
			</div>

			<div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'>
				<input className='create-character-multichoice-field create-character-field' placeholder='Name'/>
			</div>

			<div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'> 
				<div className="text-center form-titles">View/Edit Personality Trait</div>
			</div>

			<div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'>
				<div className='create-character-multichoice-field create-character-field' placeholder='Name'></div>
			</div>

			
    
   
  	</div>
	</form>
 )
}

export default PersonalityTraitForm