import React, { useEffect, useState } from 'react';
import {toast} from 'react-hot-toast'

//Forms
import UpdateCharacterForm from '../../Forms/HostSessionForms/UpdateCharacterForm'

function CounterPopUp({ setEditCharacterPopup, editCharacterPopup, placeCharacterEditableValues, droppedItems, setDroppedItems, formSelection }) {
  const [newAuraSize, setNewAuraSize] = useState('');
  
  const droppedItem = droppedItems.find(item => item.uniqueId === placeCharacterEditableValues.uniqueId);
  useEffect(() => {
    if (droppedItem) {
      setNewAuraSize(droppedItem.auraSize.toString());
    }
  }, [droppedItem]);

  const handleAuraSizeChange = (event) => {
    const newValue = event.target.value;
    setNewAuraSize(newValue); 
  };

  const updateAuraSize = () => {
    const auraSizeNumber = parseFloat(newAuraSize);
    if (isNaN(auraSizeNumber)) {
      toast.error('Please enter a number');
    } else if (auraSizeNumber > 999) {
      toast.error('Value cannot exceed 999');
    } else {
      const updatedItems = droppedItems.map(item => {
        if (item.uniqueId === placeCharacterEditableValues.uniqueId) {
          return { ...item, auraSize: auraSizeNumber };
        }
        return item;
      });
      setDroppedItems(updatedItems);
    }
  };

  return (
    <div className={`d-flex align-items-center flex-column place-character-popup ${editCharacterPopup !== null ? 'active' : ''}`}>
      <div className='d-flex flex-end' style={{ width: '100%' }}>
        <button className='close-place-character-popup' onClick={() => setEditCharacterPopup(null)}>X</button>
      </div>

     {formSelection === 2 && <UpdateCharacterForm
        placeCharacterEditableValues={placeCharacterEditableValues}
        newAuraSize={newAuraSize}
        handleAuraSizeChange={handleAuraSizeChange}
        updateAuraSize={updateAuraSize}
     />}

    </div>
  );
}

export default CounterPopUp;
