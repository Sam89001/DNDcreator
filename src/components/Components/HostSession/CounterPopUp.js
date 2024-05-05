import React, { useEffect, useState } from 'react';

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

  return (
    <div className={`d-flex align-items-center flex-column place-character-popup ${editCharacterPopup !== null ? 'active' : ''}`}>
      <div className='d-flex flex-end' style={{ width: '100%' }}>
        <button className='close-place-character-popup' onClick={() => setEditCharacterPopup(null)}>X</button>
      </div>

     {formSelection === 2 && <UpdateCharacterForm
        placeCharacterEditableValues={placeCharacterEditableValues}
        newAuraSize={newAuraSize}
        setNewAuraSize={setNewAuraSize}
        droppedItems={droppedItems}
        setDroppedItems={setDroppedItems}
     />}

    </div>
  );
}

export default CounterPopUp;
