import '../../../css/Form.css';
import '../../../css/Site.css';

import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function SkillsForm() {

//HTML
  return (
	<form >
		<div className='row' style={{padding: '20px'}}>

			<div className='col-6 d-flex align-items-center justify-content-center'> 
  			<input className='profficient-field' type="checkbox" />
			</div>

      <div className='col-6'> 
			  <input className='skills-field'></input>
      </div>

			<div className='col-6 d-flex align-items-center justify-content-center'> 
  			<input className='profficient-field' type="checkbox" />
			</div>

      <div className='col-6'> 
			  <input className='skills-field'></input>
      </div>

			<div className='col-6 d-flex align-items-center justify-content-center'> 
  			<input className='profficient-field' type="checkbox" />
			</div>

      <div className='col-6'> 
			  <input className='skills-field'></input>
      </div>

			<div className='col-6 d-flex align-items-center justify-content-center'> 
  			<input className='profficient-field' type="checkbox" />
			</div>

      <div className='col-6'> 
			  <input className='skills-field'></input>
      </div>

			<div className='col-6 d-flex align-items-center justify-content-center'> 
  			<input className='profficient-field' type="checkbox" />
			</div>

      <div className='col-6'> 
			  <input className='skills-field'></input>
      </div>

			<div className='col-6 d-flex align-items-center justify-content-center'> 
  			<input className='profficient-field' type="checkbox" />
			</div>

      <div className='col-6'> 
			  <input className='skills-field'></input>
      </div>

			


		</div>
			
	</form>
  );
}

export default SkillsForm