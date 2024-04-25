import React, { useState } from 'react';
import {toast} from 'react-hot-toast'

function CounterPopUp({ setEditCharacterPopup, editCharacterPopup, placeCharacteryEditableValues, droppedItems, setDroppedItems }) {
  const droppedItem = droppedItems.find(item => item.uniqueId === placeCharacteryEditableValues.uniqueId);
  const [newAuraSize, setNewAuraSize] = useState(droppedItem ? droppedItem.auraSize.toString() : '');

  const handleAuraSizeChange = (event) => {
    const newValue = event.target.value;
    setNewAuraSize(parseFloat(newValue));
  };

  const updateAuraSize = () => {
    if (isNaN(newAuraSize)) {
      toast.error('Please enter a number');
    } else if (newAuraSize > 999) {
      toast.error('Value cannot exceed 999');
    } else {
      const updatedItems = droppedItems.map(item => {
        if (item.uniqueId === placeCharacteryEditableValues.uniqueId) {
          return { ...item, auraSize: newAuraSize };
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

      <div>Character Information + {placeCharacteryEditableValues.uniqueId}</div>

      <div>
        <label>Character Name</label>
        <input />
      </div>

      <div>
        <label>Character Max Health</label>
        <input />
      </div>

      <div>
        <label>Character Aura</label>
        <div>
          {/* Input for aura size */}
          <input value={newAuraSize} onChange={handleAuraSizeChange} />
          {/* Button to update aura size */}
          <button onClick={updateAuraSize}>Update Aura Size</button>
        </div>
      </div>
    </div>
  );
}


export default CounterPopUp;
