import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

//Images
import DownArrowImage from '../../../images/Down Arrow.png'

function ProficiencyForm() {
  const { id: urlId } = useParams();
 return (
  <form>
    <div className="row">
      <div className='col-6 d-flex align-items-center justify-content-center skill-section-margin form-title-border-right'> 
				<div className="text-center form-titles">Skills</div>
			</div>    

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin form-title-border-left'> 
				<div className="text-center form-titles" >Saving Throws</div>
			</div>

      <div className='col-6 d-flex align-items-center justify-content-center skill-section-margin'>
        <div className='multichoice-edit-field'>

            <ul className='list-dropdown'>
              <li className='down-arrow-container' style={{position: 'relative'}}>
                <img className="img-fluid down-arrow" src={DownArrowImage} alt="Character Image"></img>
              </li>
              <li className='list-item'>
                <input type="checkbox" id="strength" name="strength" />
                <label htmlFor="strength">Strength</label>
              </li>
              <li className='list-item'>
                <input type="checkbox" id="dexterity" name="dexterity" />
                <label htmlFor="dexterity">Dexterity</label>
              </li>
              <li className='list-item'>
                <input type="checkbox" id="constitution" name="constitution" />
                <label htmlFor="constitution">Constitution</label>
              </li>
              <li className='list-item'>
                <input type="checkbox" id="intelligence" name="intelligence" />
                <label htmlFor="intelligence">Intelligence</label>
              </li>
              <li className='list-item'>
                <input type="checkbox" id="wisdom" name="wisdom" />
                <label htmlFor="wisdom">Wisdom</label>
              </li>
              <li className='list-item'>
                <input type="checkbox" id="charisma" name="charisma" />
                <label htmlFor="charisma">Charisma</label>
              </li>
            </ul>
        </div>
      </div>


      <div className='col-6 d-flex align-items-center justify-content-center skill-section-margin'>
				<div className=' create-character-field multichoice-edit-field-small'>
          <select className='edit-character-field'>
            <option>
            </option>
          </select>
				</div>
			</div>

	
    </div>
  </form>
 )
}

export default ProficiencyForm