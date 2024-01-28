import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function ProficiencyForm() {
 return (
  <form>
    <div className="row">
      <div className='col-6 d-flex align-items-center justify-content-center skill-section-margin form-title-border-right'> 
				<div className="text-center form-titles">Skills</div>
			</div>

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin form-title-border-left'> 
				<div className="text-center form-titles" >Saving Throws</div>
			</div>

	
    </div>
  </form>
 )
}

export default ProficiencyForm