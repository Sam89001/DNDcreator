import {toast} from 'react-hot-toast'

function UpdateCharacterForm({ placeCharacterEditableValues, newAuraSize, setNewAuraSize, droppedItems, setDroppedItems }) {

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
    <div>
      <div>Character Information + {placeCharacterEditableValues.uniqueId}</div>

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
  )
}

export default UpdateCharacterForm;