
function UpdateCharacterForm({ placeCharacterEditableValues, newAuraSize, updateAuraSize, handleAuraSizeChange }) {

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