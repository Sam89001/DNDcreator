import '../../../css/Site.css';
import '../../../css/Animations.css';
import '../../../css/Components.css';

//Depenedencies
import React, { useState } from 'react';

//Images
import DndSheetImage from '../../../images/sheet2.png'

//Components
import SpellPopUp from '../SpellPopUp'

function DndSheetTwo({characterSpellcastingClass, characterSpellcastingAbility,
	characterSpellSaveDC, characterSpellAttackBonus, loadCharacterSpells,

	characterSpellSlot1, characterSpellSlot2, characterSpellSlot3, characterSpellSlot4, characterSpellSlot5,
	characterSpellSlot6, characterSpellSlot7, characterSpellSlot8, characterSpellSlot9}) {

  const [popUp, setPopUp] = useState(false);
  const [selectedId, setSelectedId] = useState({
    selectedId: ''
  })
  const openPopUp = (id) => {
    setPopUp(true)
    setSelectedId({
      selectedId: id || ''
    })
  }
  const closePopUp = () => {
    setPopUp(false)
    setSelectedId('')
  }
    
  return (
    <div className='container' style={{ position: 'relative', minWidth: '500px',}}>

      {/* Spellcasting Class */}
      <div className="absolute-div dnd-sheet" style={{ overflowY: 'auto', paddingBottom: '15px', whiteSpace: 'nowrap', top: '8.2%', left: '8%', width: '25%', height: '5%', fontSize: '1.1vw' }}>
        <div>{characterSpellcastingClass}</div>
      </div>

      {/* Spellcasting Ability */}
      <div className="absolute-div dnd-sheet" style={{ overflowY: 'auto',  paddingBottom: '15px', whiteSpace: 'nowrap',  top: '7.2%', left: '45%', width: '9.2%', height: '5%', fontSize: '1.1vw' }}>
        <div>{characterSpellcastingAbility}</div>
      </div>

      {/* Spellcasting DC */}
      <div className="absolute-div dnd-sheet" style={{ overflowY: 'auto',  paddingBottom: '15px', whiteSpace: 'nowrap', backgroundColor: 'transparent', top: '7.2%', left: '61%', width: '9%', height: '5%', fontSize: '1.1vw' }}>
        <div>{characterSpellSaveDC}</div>
      </div>

      {/* Spellcasting Atk Bonus */}
      <div className="absolute-div dnd-sheet" style={{ overflowY: 'auto',  paddingBottom: '15px', whiteSpace: 'nowrap', backgroundColor: 'transparent', top: '7.2%', left: '77.5%', width: '9%', height: '5%', fontSize: '1.1vw' }}>
        <div>{characterSpellAttackBonus}</div>
      </div>

      {/* Cantrips */}
      <div className="absolute-div dnd-sheet-noflex" style={{  overflowY: 'auto', paddingRight: '15px', top: '23.3%', left: '5%', width: '26.5%', height: '13%', fontSize: '0.59vw' }}>
        <div className='row'>
          {loadCharacterSpells
          .filter(spell => spell.characterSpellLevel === '0')
          .map(spell => (
            <div className='col-12 hover-red d-flex align-items-center justify-content-between' 
            onClick={() => openPopUp(spell._id)}>
              <div  style={{ overflowY: 'auto', marginRight: '10px', paddingBottom: '12px', whiteSpace: 'nowrap' }}>
              {spell.characterSpellName}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spell Slot 1*/}
      <div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '39.5%', left: '8.5%', width: '3%', height: '2.5%', fontSize: '1vw' }}>
        <div>{characterSpellSlot1}</div>
      </div>

      <div className="absolute-div dnd-sheet-noflex" style={{ overflowX: 'auto', paddingRight: '15px', top: '45%', left: '7%', width: '24.5%', height: '21.5%', fontSize: '0.59vw' }}>
        <div className='row'>
          {loadCharacterSpells
          .filter(spell => spell.characterSpellLevel === '1')
          .map(spell => (
            <div className='col-12 hover-red d-flex align-items-center justify-content-between' key={spell._id}
            onClick={() => openPopUp(spell._id)}> 
              <div style={{ overflowY: 'auto', marginRight: '10px', paddingBottom: '12px', whiteSpace: 'nowrap' }}>
              {spell.characterSpellName}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spell Slot 2*/}
      <div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '68.4%', left: '8.5%', width: '4.5%', height: '2.5%', fontSize: '1vw' }}>
        <div>{characterSpellSlot2}</div>
      </div>

      <div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '71.7%', left: '7%', width: '24.5%', height: '23%', fontSize: '0.59vw' }}>
        <div className='row'>
          {loadCharacterSpells
          .filter(spell => spell.characterSpellLevel === '2')
          .map(spell => (
            <div className='col-12 hover-red d-flex align-items-center justify-content-between' 
            onClick={() => openPopUp(spell._id)}> 
              <div style={{ overflowY: 'auto', marginRight: '10px', paddingBottom: '12px', whiteSpace: 'nowrap' }}>
              {spell.characterSpellName}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spell Slot 3*/}
      <div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '18.5%', left: '38.5%', width: '4.5%', height: '2.5%', fontSize: '1vw' }}>
        <div>{characterSpellSlot3}</div>
      </div>

      <div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '22%', left: '37%', width: '24.5%', height: '23%', fontSize: '0.59vw' }}>
        <div className='row'>
          {loadCharacterSpells
          .filter(spell => spell.characterSpellLevel === '3')
          .map(spell => (
            <div className='col-12 hover-red d-flex align-items-center justify-content-between'
            onClick={() => openPopUp(spell._id)}> 
              <div style={{ overflowY: 'auto', marginRight: '10px', paddingBottom: '12px', whiteSpace: 'nowrap' }}>
              {spell.characterSpellName}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spell Slot 4*/}
      <div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '47%', left: '38.5%', width: '4.5%', height: '2.5%', fontSize: '1vw' }}>
        <div>{characterSpellSlot4}</div>
      </div>

      <div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '50.3%', left: '37%', width: '24.5%', height: '23%', fontSize: '0.59vw' }}>
        <div className='row'>
          {loadCharacterSpells
          .filter(spell => spell.characterSpellLevel === '4')
          .map(spell => (
            <div className='col-12 hover-red d-flex align-items-center justify-content-between' 
            onClick={() => openPopUp(spell._id)}>
              <div style={{ overflowY: 'auto', marginRight: '10px', paddingBottom: '12px', whiteSpace: 'nowrap' }} >
                {spell.characterSpellName}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spell Slot 5*/}
      <div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '75.5%', left: '38.5%', width: '4.5%', height: '2.5%', fontSize: '1vw' }}>
        <div>{characterSpellSlot5}</div>
      </div>

      <div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '79%', left: '37%', width: '24.5%', height: '16%', fontSize: '0.59vw' }}>
        <div className='row'>
          {loadCharacterSpells
          .filter(spell => spell.characterSpellLevel === '5')
          .map(spell => (
            <div className='col-12 hover-red d-flex align-items-center justify-content-between' 
            onClick={() => openPopUp(spell._id)}>
              <div style={{ overflowY: 'auto', marginRight: '10px', paddingBottom: '12px', whiteSpace: 'nowrap' }}>
              {spell.characterSpellName}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spell Slot 6*/}
      <div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '18.5%', left: '67.7%', width: '4.5%', height: '2.5%', fontSize: '1vw' }}>
        <div>{characterSpellSlot6}</div>
      </div>

      <div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '22%', left: '66.5%', width: '24.5%', height: '16%', fontSize: '0.59vw' }}>
        <div className='row'>
          {loadCharacterSpells
          .filter(spell => spell.characterSpellLevel === '6')
          .map(spell => (
            <div className='col-12 hover-red d-flex align-items-center justify-content-between' 
            onClick={() => openPopUp(spell._id)}> 
              <div style={{ overflowY: 'auto', marginRight: '10px', paddingBottom: '12px', whiteSpace: 'nowrap' }} >
              {spell.characterSpellName}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spell Slot 7*/}
      <div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '40%', left: '67.7%', width: '4.5%', height: '2.5%', fontSize: '1vw' }}>
        <div>{characterSpellSlot7}</div>
      </div>

      <div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '43.5%', left: '66.5%', width: '24.5%', height: '16%', fontSize: '0.59vw' }}>
        <div className='row'> 
          {loadCharacterSpells
          .filter(spell => spell.characterSpellLevel === '7')
          .map(spell => (
            <div className='col-12 hover-red d-flex align-items-center justify-content-between' 
            onClick={() => openPopUp(spell._id)}> 
              <div style={{ overflowY: 'auto', marginRight: '10px', paddingBottom: '12px', whiteSpace: 'nowrap' }}>
              {spell.characterSpellName}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Spell Slot 8*/}
      <div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '61%', left: '67.7%', width: '4.5%', height: '2.5%', fontSize: '1vw' }}>
        <div>{characterSpellSlot8}</div>
      </div>

      <div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '65%', left: '66.5%', width: '24.5%', height: '12.5%', fontSize: '0.59vw' }}>
        <div className='row'> 
          {loadCharacterSpells
          .filter(spell => spell.characterSpellLevel === '8')
          .map(spell => (
            <div className='col-12 hover-red d-flex align-items-center justify-content-between'
            onClick={() => openPopUp(spell._id)} > 
              <div style={{ overflowY: 'auto', marginRight: '10px', paddingBottom: '12px', whiteSpace: 'nowrap' }}>
              {spell.characterSpellName}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spell Slot 9*/}
      <div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '79%', left: '67.7%', width: '4.5%', height: '2.5%', fontSize: '1vw' }}>
        <div>{characterSpellSlot9}</div>
      </div>

      <div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '82.5%', left: '66.5%', width: '24.5%', height: '12.5%', fontSize: '0.59vw' }}>
        <div className='row'>
          {loadCharacterSpells
          .filter(spell => spell.characterSpellLevel === '9')
          .map(spell => (
            <div className='col-12 hover-red d-flex align-items-center justify-content-between'
            onClick={() => openPopUp(spell._id)} > 
              <div style={{ overflowY: 'auto', marginRight: '10px', paddingBottom: '12px', whiteSpace: 'nowrap' }}>
                {spell.characterSpellName}</div>
            </div>
          ))}
        </div>
      </div>

      
       {/* image */}
       <img className="img-fluid character-sheet" src={DndSheetImage} alt="Character Image" style={{minWidth: '450px'}}/>
       {popUp && <SpellPopUp closePopUp={closePopUp} selectedId={selectedId.selectedId} loadCharacterSpells={loadCharacterSpells}/>}
    </div>
  )
}

export default DndSheetTwo