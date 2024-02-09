import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function FeaturesTraitsForm() {
  return (
    <form>
    <div className='row'>
      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div className="text-center form-titles">Add New Feature/Trait</div>
      </div>

      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div className='basic-field-container' style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
          <input className='create-character-field' style={{width: '65%'}} placeholder='Feature/Trait Name'/>
          <input className='create-character-field' style={{width: '33%'}} placeholder='Additional Detail'/>

        </div>
      </div>

      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div style={{width: '100%'}}>
          <textarea className='description-field' placeholder='Description'/>
        </div>
      </div>

      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
          <select className='create-character-field' style={{width: '75%'}} placeholder='Attack Name'>
            <option/>
          </select>
					<button className='create-character-button' type="submit" > Update</button>
        </div>
      </div>

    </div>
    </form>
  );
}

export default FeaturesTraitsForm