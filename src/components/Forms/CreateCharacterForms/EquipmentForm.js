import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function EquipmentForm({setCharacterEquipment, characterEquipment, fetchData}) {
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

  const handleSelectChange = (e) => {
    const selectedId = e.target.value; 
    setSelectedId({ selectedId: selectedId });
    //finds and updates the fields
    const loadedValue = characterEquipment.find(value => value._id === selectedId);
    setData({
      ...data,
      characterEquipmentName: loadedValue ? loadedValue.characterEquipmentName : '',
      characterEquipmentQuantity: loadedValue ? loadedValue.characterEquipmentQuantity : '',
      characterEquipmentDescription: loadedValue ? loadedValue.characterEquipmentDescription : ''
    });
	};
  const handleSubmit = async (e) => {
		e.preventDefault();
		if (!selectedId.selectedId) {
			setData((prevData) => ({ ...prevData, id: urlId }));
			await updateEquipment();
		} else {
			await updateExistingEquipment(selectedId.selectedId, data.characterEquipmentName, 
      data.characterEquipmentQuantity, data.characterEquipmentDescription); 
		}
	};

  //Post Request
	const updateEquipment =  async (e) => {
		const {id, characterEquipmentName, characterEquipmentQuantity,
      characterEquipmentDescription } = data;
		try {

			const response = await axios.post(`http://localhost:4000/CreateCharacter/UpdateEquipment/${id}`, {
				id, characterEquipmentName, characterEquipmentQuantity,
        characterEquipmentDescription
			});

			if (response.data.success) {
				const newItem = response.data.newEquipment;
				setCharacterEquipment(prev => [...prev, newItem]);
				toast.success('Updated character details');
			} else {
				toast.error('Failed to update character details');
			}
		} catch (error) {
			console.log(error)
		}
	}

  //Put Request
  const updateExistingEquipment = async (id, characterEquipmentName, characterEquipmentQuantity, characterEquipmentDescription) => {
		try {
				const response = await axios.put(`http://localhost:4000/CreateCharacter/ChangeEquipment/${id}`, {
					id, characterEquipmentName, 
          characterEquipmentQuantity, 
          characterEquipmentDescription
				});

				if (response.error) {
					toast.error(response.data.error);
				} else {
					fetchData();
					toast.success('Updated character details');
				}
		} catch (error) {
				console.log(error);
		}
	}; 


  return (
    <form onSubmit={handleSubmit}>
    <div className='row'>
      
      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div className="text-center form-titles">Add New Equipment</div>
      </div>

      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div className='basic-field-container' style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>

          <input className='create-character-field' style={{width: '74%'}} placeholder='Equipment Name'
          value={data.characterEquipmentName}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              characterEquipmentName: e.target.value,
            }))
          }/>

          <input className='create-character-field' style={{width: '24%'}} placeholder='Quantity'
          value={data.characterEquipmentQuantity}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              characterEquipmentQuantity: e.target.value,
            }))
          }/>
        </div>
      </div>

      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div style={{width: '100%'}}>

          <textarea className='description-field' placeholder='Description'
          value={data.characterEquipmentDescription}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              characterEquipmentDescription: e.target.value,
            }))
          }/>

        </div>
      </div>

      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
          <select className='create-character-field' style={{width: '75%'}} 
          placeholder='Attack Name' onChange={handleSelectChange}>

            <option/>
            {characterEquipment.map(equipment => (
						  <option key={equipment._id} value={equipment._id}>{equipment.characterEquipmentName}</option>
					  ))}

          </select>
					<button className='create-character-button' type="submit" > Update</button>
        </div>
      </div>

    </div>
    </form>
  ); 
}

export default EquipmentForm