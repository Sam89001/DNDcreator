import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function EquipmentForm() {
  const { id: urlId } = useParams();
  const [data, setData] = useState({
    id: urlId,
    characterEquipmentName: '',
    characterEquipmentQuantity: '',
    characterEquipmentDescription: '',
  });

   //Sets user change
	const [selectedId, setSelectedId] = useState({
		selectedId: ''
	});

  return (
    <form>
    <div className='row'>
      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div className="text-center form-titles">Add New Equipment</div>
      </div>

      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div className='basic-field-container' style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
          <input className='create-character-field' style={{width: '74%'}} placeholder='Equipment Name'/>
          <input className='create-character-field' style={{width: '24%'}} placeholder='Quantity'/>
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

export default EquipmentForm