import '../../css/Site.css';
import '../../css/Components.css';
import '../../css/Animations.css';

function DeletePopUp({closePopUp, loadCharacterSpells, selectedId}) {

return(
  <div className='pop-up-overlay'>
    
    {loadCharacterSpells
    .filter(spell => spell._id === selectedId)
    .map((spell) => (
    
    <div className="pop-up spell-pop-up d-flex flex-column align-items-center ">

      <div style={{ width: '100%' }}>
        <button className="spell-pop-up-button flex-start" onClick={closePopUp}>Close</button>
      </div>


      <div className='row align-items-center justify-content-center' style={{ width: '100%' }}>

        <div className='col-12 text-center' style={{ paddingBottom: '20px', font: '400 2vw Grenze Gotisch, sans-serif' }}>Spell Details</div>
        <div className='col-12 row justify-content-center' style={{paddingBottom: '20px'}}>

          <div className='col-7 row d-flex justify-content-between' style={{paddingBottom: '20px'}}>
            <div className='col-12 d-flex justify-content-between'>
              <div className='text-center spell-pop-up-title-field' style={{ width: '18%' }}>Spell Level</div>
              <div className='text-center spell-pop-up-title-field' style={{ width: '80%' }}>Spell Name</div>
            </div>

            <div className='col-12 d-flex justify-content-between'>
              <div className='text-center spell-pop-up-field' style={{ width: '18%' }}>{spell.characterSpellLevel}</div>
              <div className='text-center spell-pop-up-field' style={{ width: '80%' }}>{spell.characterSpellName}</div>
            </div>
          </div>

          <div className='col-5 row d-flex justify-content-between' style={{paddingBottom: '20px'}}>

            <div className='col-12 d-flex justify-content-between' >
              <div className='text-center spell-pop-up-title-field' style={{ width: '48%' }}>Spell Cast Time</div>
              <div className='text-center spell-pop-up-title-field' style={{ width: '48%' }}>Spell Damage/Effect</div>
            </div>

            <div className='col-12 d-flex justify-content-between' >
              <div className='text-center spell-pop-up-field' style={{ width: '48%' }}>{spell.characterSpellCastTime}</div>
              <div className='text-center spell-pop-up-field' style={{ width: '48%' }}>{spell.characterSpellDamage}</div>
            </div>

          </div>

          <div className='col-12 row d-flex' style={{paddingBottom: '40px'}}>

            <div className='col-12 text-center'>
              <div className='spell-pop-up-title-field'>Spell Description</div>
            </div>

            <div className='col-12 text-center' style={{ maxHeight: '9em',  }}>
              <div className='text-center spell-pop-up-field' 
              style={{ width: '98%', height: '100%', overflowY: 'auto', whiteSpace: 'pre-wrap', 
              wordWrap: 'break-word', padding: '0px 15px 0px 15px' }}>{spell.characterSpellDescription}</div>
            </div>

          </div>

          <div className='col-12 row d-flex' style={{width: '98%'}}>

            <div className='col-12 d-flex justify-content-between'>
              <div className='text-center spell-pop-up-title-field' style={{ width: '24%' }}>Spell Duration</div>
              <div className='text-center spell-pop-up-title-field' style={{ width: '24%' }}>Spell Save</div>
              <div className='text-center spell-pop-up-title-field' style={{ width: '24%' }}>Spell School</div>
              <div className='text-center spell-pop-up-title-field' style={{ width: '24%' }}>Spell Range/Area</div>
            </div>

          </div>

          <div className='col-12 row d-flex' style={{width: '98%'}}>

            <div className='col-12 d-flex justify-content-between'>
              <div className='text-center spell-pop-up-field' style={{ width: '24%' }}>{spell.characterSpellDuration}</div>
              <div className='text-center spell-pop-up-field' style={{ width: '24%' }}>{spell.characterSpellSave}</div>
              <div className='text-center spell-pop-up-field' style={{ width: '24%' }}>{spell.characterSpellSchool}</div>
              <div className='text-center spell-pop-up-field' style={{ width: '24%' }}>{spell.characterSpellRangeArea}</div>
            </div>

          </div>

          <div className='col-12 row d-flex' style={{ width: '98%' }}>
            <div className="d-flex justify-content-between" style={{ width: '100%' }}>
              <button className="spell-pop-up-button">Edit</button>
              <button className="spell-pop-up-button">Delete</button>
            </div>
          </div>

        </div>
        
      </div>

      
    </div>
    ))}
  </div>
)

}

export default DeletePopUp