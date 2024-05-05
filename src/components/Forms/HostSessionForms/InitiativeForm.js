import React, { useState } from 'react';

function InitiativeForm({ addCharacterToUserInitiativeState }) {
  const [characterName, setCharacterName] = useState('');
  const [characterInitiative, setCharacterInitiative] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (characterName.trim() !== '' && characterInitiative.trim() !== '') {
      addCharacterToUserInitiativeState(characterName, parseInt(characterInitiative));
      setCharacterName('');
      setCharacterInitiative('');
    }
  };

  return (
    <div>
      <div>Add character to initiative slider</div>

      <form onSubmit={handleSubmit}>
        <div className="w-100">
          <label>Character Name</label>
          <input value={characterName} onChange={(e) => setCharacterName(e.target.value)} />
        </div>

        <div className="w-100">
          <label>Character Initiative</label>
          <input value={characterInitiative} onChange={(e) => setCharacterInitiative(e.target.value)} />
        </div>

        <button type="submit">Submit</button>
      </form>

    </div>
  );
}

export default InitiativeForm;