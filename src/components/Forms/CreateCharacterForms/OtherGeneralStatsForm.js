import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast';

//User
import { UserContext } from '../../../context/userContext';

//Images
import DownArrowImage from '../../../images/Down Arrow.png'

function OtherGeneralStatsForm({propId, updateCharacterStats, setUpdateCharacterStats, getCharacterData,
  updateCharacterTreasure, setUpdateCharacterTreasure,

  updateCharacterOrganisation, setUpdateCharacterOrganisation,
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
  const [characterOrganisation, setCharacterOrganisation] = useState({
    characterOrganisation: {
      characterOrganisationName: '',
      characterOrganisationDescription: ''
    },
    characterSymbol: {
      characterSymbolName: '',
      characterSymbolDescription: ''
    }
  });
  const [selectedId, setSelectedId] = useState({
		treasureSelectedId: {
      selectedId: ''
    },
    AllyOrganisationSelectedId: {
      selectedId: ''
    },
    SymbolSelectedId: {
      selectedId: ''
    }
	});
  
  const characterAgeRef = useRef(null);
	const characterHeightRef = useRef(null);
	const characterWeightRef = useRef(null);
	const characterEyesRef = useRef(null);
	const characterSkinRef = useRef(null);
	const characterHairRef = useRef(null);
	const characterAppearenceRef = useRef(null);
	const characterBackstoryRef = useRef(null);

  //Sets Form Existing Information
	useEffect(() => {
		characterAgeRef.current.value = updateCharacterStats.characterAge || '';
		characterHeightRef.current.value = updateCharacterStats.characterHeight || '';
		characterWeightRef.current.value = updateCharacterStats.characterWeight || '';
		characterEyesRef.current.value = updateCharacterStats.characterEyes || '';
		characterSkinRef.current.value = updateCharacterStats.characterSkin || '';
		characterHairRef.current.value = updateCharacterStats.characterHair || '';
		characterAppearenceRef.current.value = updateCharacterStats.characterTextAppearence || '';
		characterBackstoryRef.current.value = updateCharacterStats.characterBackstory || '';

		setCharacterOtherStats(prevStats => ({
				...prevStats,
				characterAge: updateCharacterStats.characterAge,
				characterHeight: updateCharacterStats.characterHeight,
				characterWeight: updateCharacterStats.characterWeight,
				characterEyes: updateCharacterStats.characterEyes,
        characterSkin: updateCharacterStats.characterSkin,
        characterHair: updateCharacterStats.characterHair,
		}));
    setCharacterInfo(prevData => ({
      ...prevData,
      characterAppearence: {
        ...prevData.characterAppearence,
        appearence: updateCharacterStats.characterTextAppearence
      },
      characterBackstory: {
        ...prevData.characterBackstory,
        backstory: updateCharacterStats.characterBackstory
      }
    }));
	}, [updateCharacterStats]);

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
				setUpdateCharacterStats(prevState => ({
					...prevState,
          characterAge,
          characterEyes,
          characterHair,
          characterHeight,
          characterSkin,
          characterWeight
				}));
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
        getCharacterData(characterId)
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

  //Ally/Org/Symbol Functions
  const handleSelectChange = (e, fieldType) => {
    if (fieldType == 'AllyOrganisationSelectedId') {
      let selectedId = e.target.value 
      setSelectedId({ AllyOrganisationSelectedId: { selectedId } });

      const loadedValue = updateCharacterOrganisation.find(value => value._id === selectedId);
      setCharacterOrganisation((prevCharacterOrganisation) => ({
        ...prevCharacterOrganisation,
        characterOrganisation: {
          ...prevCharacterOrganisation.characterOrganisation,
          characterOrganisationName: loadedValue ? loadedValue.characterOrganisationName : '',
          characterOrganisationDescription: loadedValue ? loadedValue.characterOrganisationDescription : '',
        },
      }));

    } else if (fieldType == 'SymbolSelectedId') {
      let selectedId = e.target.value 
      setSelectedId({ SymbolSelectedId: { selectedId } });
      const loadedValue = updateCharacterOrganisation.find(value => value._id === selectedId);

      console.log(loadedValue)
      setCharacterOrganisation((prevCharacterOrganisation) => ({
        ...prevCharacterOrganisation,
        characterSymbol: {
          ...prevCharacterOrganisation.characterSymbol,
          characterSymbolName: loadedValue ? loadedValue.characterOrganisationName : '',
          characterSymbolDescription: loadedValue ? loadedValue.characterOrganisationDescription : '',
        }
      }))
      
    }
	};
  const handleSubmit = async (e, y, address ) => {
		e.preventDefault();
    if (y == 1) {

      if (!selectedId.AllyOrganisationSelectedId.selectedId) {
        await updateSymbolOrg(characterOrganisation.characterOrganisation.characterOrganisationName, 
          characterOrganisation.characterOrganisation.characterOrganisationDescription, 
          address);
      } else {
        await updateExistingSymbolOrg(selectedId.AllyOrganisationSelectedId.selectedId, 
          characterOrganisation.characterOrganisation.characterOrganisationName,
          characterOrganisation.characterOrganisation.characterOrganisationDescription,
          'ChangeOrganisation'); 
      }

    } else if (y == 2) {

      if (!selectedId.SymbolSelectedId.selectedId) {
        await updateSymbolOrg(characterOrganisation.characterSymbol.characterSymbolName, 
          characterOrganisation.characterSymbol.characterSymbolDescription, 
          address);
      } else {
        await updateExistingSymbolOrg(selectedId.SymbolSelectedId.selectedId, 
          characterOrganisation.characterSymbol.characterSymbolName, 
          characterOrganisation.characterSymbol.characterSymbolDescription, 
          'ChangeSymbol'); 
      }

    }
	};

  //SymbolOrg Post Request
	const updateSymbolOrg = async (characterOrganisationName, characterOrganisationDescription, address) => {
	
		try {
			const response = await axios.post(`http://localhost:4000/CreateCharacter/${address}/${characterId}`, {
				characterOrganisationName, characterOrganisationDescription
			});

			if (response.data.success) {
				const newItem = response.data.newOrganisation;
				setUpdateCharacterOrganisation(prev => [...prev, newItem]);
				toast.success('Updated character details');
			} else {
				toast.error('Failed to update character details');
			}
		} catch (error) {
			console.log(error)
		}
	}
  //SymbolOrg Put Request
  const updateExistingSymbolOrg = async (id, characterOrganisationName, 
    characterOrganisationDescription, address) => {

      console.log(id)
      console.log(characterOrganisationName)
      console.log(characterOrganisationDescription)
      console.log( address)

		try {
				const response = await axios.put(`http://localhost:4000/CreateCharacter/${address}/${id}`, {
					id, characterOrganisationName, 
          characterOrganisationDescription
				});

				if (response.error) {
					toast.error(response.data.error);
				} else {
					getCharacterData(characterId);
					toast.success('Updated character details');
				}
		} catch (error) {
				console.log(error);
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
					getCharacterData(characterId);
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
            ref={characterAgeRef}
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterAge: e.target.value })}
            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}/>
					</div>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Height"
            ref={characterHeightRef}
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterHeight: e.target.value })}
            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}/>
					</div>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Weight"
            ref={characterWeightRef}
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterWeight: e.target.value })}
            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}/>
					</div>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Eyes"
            ref={characterEyesRef}
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterEyes: e.target.value })}
            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}/>
					</div>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Skin"
            ref={characterSkinRef}
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterSkin: e.target.value })}
            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}/>
					</div>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Hair"
            ref={characterHairRef}
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterHair: e.target.value })}
            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}/>
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
          <div className='col-12'>
          <form onSubmit={(e) => handleSubmit(e, '1', 'UpdateOrganisation')}>
            <div className='row'>

              <div className='col-12' style={{paddingBottom: '2px'}}>
                <div className="text-center form-titles">Add New Ally/Organisation</div>
              </div>

                <div className='col-12' style={{paddingBottom: '10px'}}>
                  <input className='field-style' style={{width: '100%'}} placeholder="Name"
                    value={characterOrganisation.characterOrganisation.characterOrganisationName}
                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                    onChange={(e) =>
                      setCharacterOrganisation((prevCharacterOrganisation) => ({
                        ...prevCharacterOrganisation,
                        characterOrganisation: {
                          ...prevCharacterOrganisation.characterOrganisation,
                          characterOrganisationName: e.target.value,
                        },
                      }))
                    }/>
                </div>

                <div className='col-12' style={{paddingBottom: '10px'}}>
                  <textarea className='field-style description-field' style={{width: '100%'}} 
                  placeholder="Description"
                  value={characterOrganisation.characterOrganisation.characterOrganisationDescription}
                    onChange={(e) =>
                      setCharacterOrganisation((prevCharacterOrganisation) => ({
                        ...prevCharacterOrganisation,
                        characterOrganisation: {
                          ...prevCharacterOrganisation.characterOrganisation,
                          characterOrganisationDescription: e.target.value,
                        },
                      }))
                    }/>
                </div>

                <div className='col-8' style={{paddingBottom: '10px'}}>
                  <select className='edit-character-field'
                  onChange={(e) => handleSelectChange(e, 'AllyOrganisationSelectedId')}>
                    <option/>
                    {updateCharacterOrganisation
                    .filter(organisation => organisation.type === 'Organisation')
                    .map(organisation => (
                      <option key={organisation._id} value={organisation._id}>{organisation.characterOrganisationName}</option>
                    ))}

                  </select>
                </div>

                <div className='col-4' style={{paddingBottom: '10px'}}>
                  <button className='create-character-button' type="submit" > Update</button>
                </div>

            </div>
          </form>
          </div>

          {/* Symbols */}
          <div className='col-12'>
            <form onSubmit={(e) => handleSubmit(e, '2', 'UpdateSymbol')}>
              <div className='row'>

                <div className='col-12' style={{paddingBottom: '2px'}}>
                  <div className="text-center form-titles">Add New Symbol</div>
                </div>

                <div className='col-12' style={{paddingBottom: '10px'}}>
                  <input className='field-style' style={{width: '100%'}} placeholder="Name"
                    value={characterOrganisation.characterSymbol.characterSymbolName}
                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                    onChange={(e) =>
                      setCharacterOrganisation((prevCharacterOrganisation) => ({
                        ...prevCharacterOrganisation,
                        characterSymbol: {
                          ...prevCharacterOrganisation.characterSymbol,
                          characterSymbolName: e.target.value,
                        },
                      }))
                    }/>
                </div>

                <div className='col-12' style={{paddingBottom: '10px'}}>
                  <textarea className='field-style description-field' style={{width: '100%'}} 
                  placeholder="Description"
                  value={characterOrganisation.characterSymbol.characterSymbolDescription}
                    onChange={(e) =>
                      setCharacterOrganisation((prevCharacterOrganisation) => ({
                        ...prevCharacterOrganisation,
                        characterSymbol: {
                          ...prevCharacterOrganisation.characterSymbol,
                          characterSymbolDescription: e.target.value,
                        },
                      }))
                    }/>
                </div>

                <div className='col-8' style={{paddingBottom: '10px'}}>
                  <select className='edit-character-field'
                  onChange={(e) => handleSelectChange(e, 'SymbolSelectedId')}>
                  <option/>
                  {updateCharacterOrganisation
                    .filter(organisation => organisation.type === 'Symbol')
                    .map(organisation => (
                      <option key={organisation._id} value={organisation._id}>{organisation.characterOrganisationName}</option>
                    ))}
                  
                  </select>
                </div>

                <div className='col-4' style={{paddingBottom: '10px'}}>
                  <button className='create-character-button' type="submit" > Update</button>
                </div>

              </div>
            </form>
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
              onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
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
              onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
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
               onChange={handleSelectChangeTreasure}>

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
              ref={characterAppearenceRef}
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
              ref={characterBackstoryRef}
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