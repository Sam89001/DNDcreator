import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function EquipmentForm() {
  return (
    <form>
    <div className='row'>
      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div className="text-center form-titles">Add New Equipment</div>
      </div>

      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div className='basic-field-container' style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
          <input className='create-character-field' style={{width: '55%'}} placeholder='Attack Name'/>
          <input className='create-character-field' style={{width: '20%'}} placeholder='Atk Bonus'/>
          <input className='create-character-field' style={{width: '20%'}} placeholder='Dmg Type'/>
        </div>
      </div>

      <div className='col-12'>
        <div className='basic-field-container'>
          <input className='create-character-field' style={{width: '100%'}} placeholder='Description'/>
        </div>
      </div>

    </div>
    </form>
  ); 
}

export default EquipmentForm