import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast';

//User
import { UserContext } from '../../../context/userContext';

//Images
import DownArrowImage from '../../../images/Down Arrow.png'

function OtherGeneralStatsForm({propId, updateCharacterStatsFunction, getCharacterData,
  updateCharacterTreasure, setUpdateCharacterTreasure
}) {

  const characterId = propId.Id

  const [characterOtherStats, setCharacterOtherStats] = useState({
		characterAge: '',
		characterHeight: '',
		characterWeight: '',
		characterEyes: '',
		characterSkin: '',
		characterHair: ''
	});
  const [characterInfo, setCharacterInfo] = useState({
    characterAppearence: {
      appearence: ''
    },
    characterBackstory: {
      backstory: ''
    }
  });
  const [characterTreasure, setCharacterTreasure] = useState({
    characterTreasureName: '',
    characterTreasureQuantity: '',
    characterTreasureDescription: '',
  });
  const [selectedId, setSelectedId] = useState({
		treasureSelectedId: {
      selectedId: ''
    },
	});

  //General Stats Post
  const updateGeneralOtherStats = async (e) => {
		e.preventDefault();
		const { characterAge, characterHeight, characterWeight,
			characterEyes, characterSkin, characterHair } = characterOtherStats;
	
		try {
			const response = await axios.put(`http://localhost:4000/CreateCharacter/UpdateOtherGeneralStats/${characterId}`, {
				characterAge, characterHeight, characterWeight,
			  characterEyes, characterSkin, characterHair
			});
	
			if (response.data.error) {
				toast.error(response.data.error);
			} else {
				updateCharacterStatsFunction(characterOtherStats)
				toast.success('Updated character details');
			}
		} catch (error) {
			console.log(error);
		}
	}
  //Other General Stats Post
  const update = async (e, contentInfo, address) => {
		e.preventDefault();	
		try {
			const response = await axios.put(`http://localhost:4000/CreateCharacter/${address}/${characterId}`, {
				contentInfo
			});
	
			if (response.data.error) {
				toast.error(response.data.error);
			} else {
        getCharacterData()
				toast.success('Updated character details');
			}
		} catch (error) {
			console.log(error);
		}
	}

  //Treasure Functions
  const handleSelectChangeTreasure = (e) => {
    const selectedId = e.target.value; 
    setSelectedId({ treasureSelectedId: { selectedId } });

    //finds and updates the fields
    const loadedValue = updateCharacterTreasure.find(value => value._id === selectedId);
    setCharacterTreasure({
      ...characterTreasure,
      characterTreasureName: loadedValue ? loadedValue.characterTreasureName : '',
      characterTreasureQuantity: loadedValue ? loadedValue.characterTreasureQuantity : '',
      characterTreasureDescription: loadedValue ? loadedValue.characterTreasureDescription : ''
    });
	};
  
  const handleSubmitTreasure = async (e) => {
		e.preventDefault();
		if (!selectedId.treasureSelectedId.selectedId) {
			await updateTreasure();
		} else {
			await updateExistingTreasure(selectedId.treasureSelectedId.selectedId, characterTreasure.characterTreasureName, 
      characterTreasure.characterTreasureQuantity, characterTreasure.characterTreasureDescription); 
		}
	};
   //Treasure Post Request
	const updateTreasure = async (e) => {
		const { characterTreasureName, characterTreasureQuantity,
      characterTreasureDescription } = characterTreasure;
		try {

			const response = await axios.post(`http://localhost:4000/CreateCharacter/UpdateTreasure/${characterId}`, {
				characterTreasureName, characterTreasureQuantity,
        characterTreasureDescription
			});

			if (response.data.success) {
				const newItem = response.data.newTreasure;
				setUpdateCharacterTreasure(prev => [...prev, newItem]);
				toast.success('Updated character details');
			} else {
				toast.error('Failed to update character details');
			}
		} catch (error) {
			console.log(error)
		}
	}

  //Treasure Put Request
  const updateExistingTreasure = async (id, characterTreasureName, 
    characterTreasureQuantity, characterTreasureDescription) => {
		try {
				const response = await axios.put(`http://localhost:4000/CreateCharacter/ChangeTreasure/${id}`, {
					id, characterTreasureName, 
          characterTreasureQuantity, 
          characterTreasureDescription
				});

				if (response.error) {
					toast.error(response.data.error);
				} else {
					getCharacterData();
					toast.success('Updated character details');
				}
		} catch (error) {
				console.log(error);
		}
	}; 

  return (
    <div className='row'>

      {/* General Stats */}
      <div className='col-12' style={{paddingBottom: '10px'}}>
        <form onSubmit={updateGeneralOtherStats}>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Age"
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterAge: e.target.value })}/>
					</div>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Height"
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterHeight: e.target.value })}/>
					</div>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Weight"
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterWeight: e.target.value })}/>
					</div>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Eyes"
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterEyes: e.target.value })}/>
					</div>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Skin"
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterSkin: e.target.value })}/>
					</div>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Hair"
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterHair: e.target.value })}/>
					</div>

          <div className="d-flex align-items-center spells-field">
						<button className='create-character-button' type="submit" > Update</button>
					</div>

        </form>
      </div>

      {/* Ally/Org/Symbol */}
      <div className='col-4'>
        <div className='row'>

          {/* Ally/Organisation */}
          <div className='col-12' style={{paddingBottom: '2px'}}>
            <div className="text-center form-titles">Add New Ally/Organisation</div>
          </div>

          <div className='col-12' style={{paddingBottom: '10px'}}>
					  <input className='field-style' style={{width: '100%'}} placeholder="Name"/>
					</div>

          <div className='col-12' style={{paddingBottom: '10px'}}>
					  <textarea className='field-style description-field' style={{width: '100%'}} 
            placeholder="Description"/>
					</div>

          <div className='col-8' style={{paddingBottom: '10px'}}>
            <select className='edit-character-field' id='characterPersonalityEdit'>
              <option/>		
            </select>
          </div>

          <div className='col-4' style={{paddingBottom: '10px'}}>
            <button className='create-character-button' type="submit" > Update</button>
          </div>

          {/* Symbols */}
          <div className='col-12' style={{paddingBottom: '2px'}}>
            <div className="text-center form-titles">Add New Symbol</div>
          </div>

          <div className='col-12' style={{paddingBottom: '10px'}}>
					  <input className='field-style' style={{width: '100%'}} placeholder="Name"/>
					</div>

          <div className='col-12' style={{paddingBottom: '10px'}}>
					  <textarea className='field-style description-field' style={{width: '100%'}} 
            placeholder="Description"/>
					</div>

          <div className='col-8' style={{paddingBottom: '10px'}}>
            <select className='edit-character-field' id='characterPersonalityEdit'>
              <option/>		
            </select>
          </div>

          <div className='col-4' style={{paddingBottom: '10px'}}>
            <button className='create-character-button' type="submit" > Update</button>
          </div>

        </div>
      </div>

      {/* Treasure */}
      <div className='col-8'>
      <form onSubmit={handleSubmitTreasure}>
        <div className='row'>

            <div className='col-12' style={{paddingBottom: '2px'}}>
              <div className="text-center form-titles">Add New Treasure</div>
            </div>

            <div className='col-8' style={{paddingBottom: '10px'}}>
              <input className='field-style' style={{width: '100%'}} placeholder="Name"
              value={characterTreasure.characterTreasureName}
              onChange={(e) =>
                setCharacterTreasure((prevCharacterTreasure) => ({
                  ...prevCharacterTreasure,
                  characterTreasureName: e.target.value,
                }))
              }/>
            </div>

            <div className='col-4' style={{paddingBottom: '10px'}}>
              <input className='field-style' style={{width: '100%'}} placeholder="Quantity"
              value={characterTreasure.characterTreasureQuantity}
              onChange={(e) =>
                setCharacterTreasure((prevCharacterTreasure) => ({
                  ...prevCharacterTreasure,
                  characterTreasureQuantity: e.target.value,
                }))
              }/>
            </div>

            <div className='col-12' style={{paddingBottom: '10px'}}>
              <textarea className='field-style spell-description-field-treasure' style={{width: '100%'}} 
              placeholder="Description"
              value={characterTreasure.characterTreasureDescription}
              onChange={(e) =>
                setCharacterTreasure((prevCharacterTreasure) => ({
                  ...prevCharacterTreasure,
                  characterTreasureDescription: e.target.value,
                }))
              }/>
            </div>

            <div className='col-8' style={{paddingBottom: '10px'}}>
              <select className='edit-character-field' id='characterPersonalityEdit'
                placeholder='Attack Name' onChange={handleSelectChangeTreasure}>

                  <option/>
                  {updateCharacterTreasure.map(treasure => (
                    <option key={treasure._id} value={treasure._id}>{treasure.characterTreasureName}</option>
                  ))}

              </select>
            </div>

            <div className='col-4' style={{paddingBottom: '10px'}}>
              <button className='create-character-button' type="submit" > Update</button>
            </div>

          </div>
        </form>
      </div>

      {/* Appearence */}
      <div className='col-4'>
        <div className='row'>
          <form onSubmit={(e) => update(e, characterInfo.characterAppearence.appearence, 'UpdateAppearence')}>

            <div className='col-12' style={{paddingBottom: '2px'}}>
              <div className="text-center form-titles">Appearence (Text)</div>
            </div>

            <div className='col-12' style={{paddingBottom: '10px'}}>
              <textarea className='field-style spell-description-field' style={{width: '100%'}} 
              placeholder="Description"
              onChange={(e) => {
                setCharacterInfo({ ...characterInfo, characterAppearence: { ...characterInfo.characterAppearence, appearence: e.target.value }})
              }}/>
            </div>

            <div className='col-12' style={{paddingBottom: '10px'}}>
              <button className='create-character-button' type="submit" > Update</button>
            </div>

          </form>

        </div>
      </div>

      {/* Backstory */}
      <div className='col-8'>
        <div className='row'>
          <form onSubmit={(e) => update(e, characterInfo.characterBackstory.backstory, 'UpdateBackstory')}>

            <div className='col-12' style={{paddingBottom: '2px'}}>
              <div className="text-center form-titles">Backstory</div>
            </div>

            <div className='col-12' style={{paddingBottom: '10px'}}>
              <textarea className='field-style spell-description-field' style={{width: '100%'}} 
              placeholder="Description"
              onChange={(e) => {
                setCharacterInfo({ ...characterInfo, characterBackstory: { ...characterInfo.characterBackstory, backstory: e.target.value }})
              }}/>
            </div>

            <div className='col-12' style={{paddingBottom: '10px'}}>
              <button className='create-character-button' type="submit" > Update</button>
            </div>

          </form>

        </div>
      </div>

    </div>
  )
}

export default OtherGeneralStatsForm