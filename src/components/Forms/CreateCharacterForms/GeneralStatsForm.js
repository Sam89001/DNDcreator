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
		<div style={{display: 'flex', justifyContent: 'center' }}>
			<div >
				{/* First Row*/}

				<div style={{ display: 'flex'}}>
					<div className='create-character-container'>
						<input className='create-character-field create-character-large-field' placeholder='Character Name'></input>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-mid-field' placeholder='Class'></input>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='HP'></input>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='AC'></input>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='Level'></input>
					</div>
				</div>

				{/* Second Row*/}

				<div style={{ display: 'flex'}}>
					<div className='create-character-container'>
						<input className='create-character-field create-character-mid-field' placeholder='Character Name'></input>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-mid-field' placeholder='Class'></input>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-mid-field' placeholder='HP'></input>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='AC'></input>
					</div>

					<div className='create-character-container'>
						<input className='create-character-field create-character-small-field' placeholder='Level'></input>
					</div>

					<div style={{width: '60px', textAlign: 'center'}}>
						<button className='create-character-button' type="submit" > Save</button>
					</div>

				</div>

			</div>
		</div>
	</form>
  );
}

export default GeneralStatsForm