import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function GeneralStatsForm() {

//HTML
  return (
	<form >
		<div >
			<input className='create-character-field'></input>
		
			<input className='create-character-field'></input>
					
			<input className='create-character-field'></input>
				
			<input className='create-character-field'></input>

			<input className='create-character-field'></input>
		</div>
			
	</form>
  );
}

export default GeneralStatsForm