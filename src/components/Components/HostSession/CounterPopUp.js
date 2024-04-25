import React, { useState } from 'react';

function CounterPopUp({ setEditCharacterPopup, editCharacterPopup, placeCharacteryEditableValues, droppedItems, setDroppedItems }) {
  const droppedItem = droppedItems.find(item => item.uniqueId === placeCharacteryEditableValues.uniqueId);
  const [newAuraSize, setNewAuraSize] = useState(droppedItem ? droppedItem.auraSize.toString() : '');

  const handleAuraSizeChange = (event) => {
    const newValue = event.target.value;
    // Parse the input value into a number and update state
    setNewAuraSize(parseFloat(newValue));
  };

  const updateAuraSize = () => {
    // Check if the aura size is a valid number
    if (!isNaN(newAuraSize)) {
      const updatedItems = droppedItems.map(item => {
        if (item.uniqueId === placeCharacteryEditableValues.uniqueId) {
          return { ...item, auraSize: newAuraSize };
        }
        return item;
      });
      console.log(updatedItems);
      setDroppedItems(updatedItems);
    } else {
      // Handle error if the aura size is not a valid number
      console.error('Aura size must be a valid number.');
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
