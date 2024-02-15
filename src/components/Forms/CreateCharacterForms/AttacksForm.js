import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function AttacksForm({characterAttacks, setCharacterAttacks, fetchData}) {
  const { id: urlId } = useParams();
  const [data, setData] = useState({
    id: urlId,
    characterAttackName: '',
    characterAttackBonus: '',
    characterDamageType: '',
  });
  //Sets user change
	const [selectedAttack, setSelectedAttack] = useState({
		selectedId: ''
	});

  const handleSelectChange = (e) => {
    const selectedId = e.target.value; 
    setSelectedAttack({ selectedId: selectedId });
    //finds and updates the fields
    const loadedValue = characterAttacks.find(value => value._id === selectedId);
    setData({
      ...data,
      characterAttackName: loadedValue ? loadedValue.characterAttackName : '',
      characterAttackBonus: loadedValue ? loadedValue.characterAttackBonus : '',
      characterDamageType: loadedValue ? loadedValue.characterDamageType : ''
    });
	};
  const handleSubmit = async (e) => {
		e.preventDefault();
		if (!selectedAttack.selectedId) {
			setData((prevData) => ({ ...prevData, id: urlId }));
			await updateAttack();
		} else {
			await updateExistingAttack(selectedAttack.selectedId, data.characterAttackName, 
      data.characterAttackBonus, data.characterDamageType); 
		}
	};

  //Post Request
	const updateAttack =  async (e) => {
		const {id, characterAttackName, characterAttackBonus,
      characterDamageType } = data;
		try {

			const response = await axios.post(`http://localhost:4000/CreateCharacter/UpdateAttack/${id}`, {
				id, characterAttackName, characterAttackBonus,
        characterDamageType
			});

			if (response.data.success) {
				const newItem = response.data.newAttack;
				setCharacterAttacks(prevAttack => [...prevAttack, newItem]);
				toast.success('Updated character details');
			} else {
				toast.error('Failed to update character details');
			}
		} catch (error) {
			console.log(error)
		}
	}

  //Put Request
  const updateExistingAttack = async (id, characterAttackName, characterAttackBonus, characterDamageType) => {
		try {
				const response = await axios.put(`http://localhost:4000/CreateCharacter/ChangeAttack/${id}`, {
					id, characterAttackName, 
          characterAttackBonus, 
          characterDamageType
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
        <div className="text-center form-titles">Add New Attack</div>
      </div>

      <div className='col-12' style={{paddingBottom: '10px'}}>
        <div className='basic-field-container' style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
          <input className='create-character-field' style={{width: '55%'}} placeholder='Attack Name'
          value={data.characterAttackName}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              characterAttackName: e.target.value,
            }))
          }/>
          <input className='create-character-field' style={{width: '20%'}} placeholder='Atk Bonus'
          value={data.characterAttackBonus}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              characterAttackBonus: e.target.value,
            }))
          }/>
          <input className='create-character-field' style={{width: '20%'}} placeholder='Dmg Type'
          value={data.characterDamageType}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              characterDamageType: e.target.value,
            }))
          }/>
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
            {characterAttacks.map(attack => (
						  <option key={attack._id} value={attack._id}>{attack.characterAttackName}</option>
					  ))}
          </select>
					<button className='create-character-button' type="submit" > Update</button>
        </div>
      </div>

    </div>
    </form>
  );
}

export default AttacksForm