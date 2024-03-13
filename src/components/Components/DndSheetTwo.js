import '../../css/Site.css';
import '../../css/Animations.css';
import '../../css/Components.css';

//Images
import DndSheetImage from '../../images/sheet2.png'

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function DndSheetTwo({getCharacterData, propId, characterSpellcastingClass, characterSpellcastingAbility,
	characterSpellSaveDC, characterSpellAttackBonus, loadCharacterSpells,

	characterSpellSlot1, characterSpellSlot2, characterSpellSlot3, characterSpellSlot4, characterSpellSlot5,
	characterSpellSlot6, characterSpellSlot7, characterSpellSlot8, characterSpellSlot9}) {

const characterId = propId.Id

const deleteItem =  async (e, id, address) => {
	e.preventDefault();
	try {
		const response = await axios.delete(address + `${id}`);
		if(response.error) {
			toast.error(response.data.error);
		} else {
			getCharacterData(characterId);
			toast.success('Successfully deleted');
		}
	} catch (error) {
		console.log(error)
	} 
}
	
return (
<div className='container' style={{ position: 'relative', minWidth: '500px',}}>

	{/* Spellcasting Class */}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '8.2%', left: '8%', width: '20%', height: '2.5%', fontSize: '1.1vw' }}>
    <div>{characterSpellcastingClass}</div>
  </div>

	{/* Spellcasting Ability */}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '7.7%', left: '43%', width: '9%', height: '2.5%', fontSize: '1.1vw' }}>
    <div>{characterSpellcastingAbility}</div>
  </div>

	{/* Spellcasting DC */}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '7.7%', left: '58%', width: '9%', height: '2.5%', fontSize: '1.1vw' }}>
    <div>{characterSpellSaveDC}</div>
  </div>

	{/* Spellcasting Atk Bonus */}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '7.7%', left: '73%', width: '9%', height: '2.5%', fontSize: '1.1vw' }}>
    <div>{characterSpellAttackBonus}</div>
  </div>

	{/* Cantrips */}
  <div className="absolute-div dnd-sheet-noflex" style={{  overflowY: 'auto', paddingRight: '15px', top: '23.3%', left: '5%', width: '26.5%', height: '13%', fontSize: '0.59vw' }}>
		{loadCharacterSpells
		.filter(spell => spell.characterSpellLevel === '0')
		.map(spell => (
			<div className='d-flex justify-content-between hover-red' key={spell._id} style={{display: 'block', width: '100%'}} >{spell.characterSpellName}
				<button className='delete-property-button' style={{width: '10%'}} 
				onClick={(e) => deleteItem(e, spell._id, 'http://localhost:4000/CreateCharacter/DeleteSpell/')}>X</button>
			</div>
		))}
	</div>

	{/* Spell Slot 1*/}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '39.5%', left: '8%', width: '4.5%', height: '2.5%', fontSize: '1.3vw' }}>
    <div>{characterSpellSlot1}</div>
  </div>

	<div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '45%', left: '6.5%', width: '24.5%', height: '21.5%', fontSize: '0.59vw' }}>
		{loadCharacterSpells
		.filter(spell => spell.characterSpellLevel === '1')
		.map(spell => (
			<div className='d-flex justify-content-between hover-red' key={spell._id} style={{display: 'block', width: '100%'}} >{spell.characterSpellName}
				<button className='delete-property-button' style={{width: '10%'}} 
				onClick={(e) => deleteItem(e, spell._id, 'http://localhost:4000/CreateCharacter/DeleteSpell/')}>X</button>
			</div>
		))}
	</div>

	{/* Spell Slot 2*/}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '68.5%', left: '8%', width: '4.5%', height: '2.5%', fontSize: '1.3vw' }}>
    <div>{characterSpellSlot2}</div>
  </div>

	<div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '71.7%', left: '6.5%', width: '24.5%', height: '23%', fontSize: '0.59vw' }}>
		{loadCharacterSpells
		.filter(spell => spell.characterSpellLevel === '2')
		.map(spell => (
			<div className='d-flex justify-content-between hover-red' key={spell._id} style={{display: 'block', width: '100%'}} >{spell.characterSpellName}
				<button className='delete-property-button' style={{width: '10%'}} 
				onClick={(e) => deleteItem(e, spell._id, 'http://localhost:4000/CreateCharacter/DeleteSpell/')}>X</button>
			</div>
		))}
	</div>

	{/* Spell Slot 3*/}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '18.5%', left: '36%', width: '4.5%', height: '2.5%', fontSize: '1.3vw' }}>
    <div>{characterSpellSlot3}</div>
  </div>

	<div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '22%', left: '34.5%', width: '24.5%', height: '23%', fontSize: '0.59vw' }}>
		{loadCharacterSpells
		.filter(spell => spell.characterSpellLevel === '3')
		.map(spell => (
			<div className='d-flex justify-content-between hover-red' key={spell._id} style={{display: 'block', width: '100%'}} >{spell.characterSpellName}
				<button className='delete-property-button' style={{width: '10%'}} 
				onClick={(e) => deleteItem(e, spell._id, 'http://localhost:4000/CreateCharacter/DeleteSpell/')}>X</button>
			</div>
		))}
	</div>

	{/* Spell Slot 4*/}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '47%', left: '36%', width: '4.5%', height: '2.5%', fontSize: '1.3vw' }}>
    <div>{characterSpellSlot4}</div>
  </div>

	<div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '50.3%', left: '34.5%', width: '24.5%', height: '23%', fontSize: '0.59vw' }}>
		{loadCharacterSpells
		.filter(spell => spell.characterSpellLevel === '4')
		.map(spell => (
			<div className='d-flex justify-content-between hover-red' key={spell._id} style={{display: 'block', width: '100%'}} >{spell.characterSpellName}
				<button className='delete-property-button' style={{width: '10%'}} 
				onClick={(e) => deleteItem(e, spell._id, 'http://localhost:4000/CreateCharacter/DeleteSpell/')}>X</button>
			</div>
		))}
	</div>

	{/* Spell Slot 5*/}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '75.5%', left: '36%', width: '4.5%', height: '2.5%', fontSize: '1.3vw' }}>
    <div>{characterSpellSlot5}</div>
  </div>

	<div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '79%', left: '34.5%', width: '24.5%', height: '16%', fontSize: '0.59vw' }}>
		{loadCharacterSpells
		.filter(spell => spell.characterSpellLevel === '5')
		.map(spell => (
			<div className='d-flex justify-content-between hover-red' key={spell._id} style={{display: 'block', width: '100%'}} >{spell.characterSpellName}
				<button className='delete-property-button' style={{width: '10%'}} 
				onClick={(e) => deleteItem(e, spell._id, 'http://localhost:4000/CreateCharacter/DeleteSpell/')}>X</button>
			</div>
		))}
	</div>

	{/* Spell Slot 6*/}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '18.5%', left: '63.5%', width: '4.5%', height: '2.5%', fontSize: '1.3vw' }}>
    <div>{characterSpellSlot6}</div>
  </div>

	<div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '22%', left: '62%', width: '24.5%', height: '16%', fontSize: '0.59vw' }}>
		{loadCharacterSpells
		.filter(spell => spell.characterSpellLevel === '6')
		.map(spell => (
			<div className='d-flex justify-content-between hover-red' key={spell._id} style={{display: 'block', width: '100%'}} >{spell.characterSpellName}
				<button className='delete-property-button' style={{width: '10%'}} 
				onClick={(e) => deleteItem(e, spell._id, 'http://localhost:4000/CreateCharacter/DeleteSpell/')}>X</button>
			</div>
		))}
	</div>

	{/* Spell Slot 7*/}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '40%', left: '63.5%', width: '4.5%', height: '2.5%', fontSize: '1.3vw' }}>
    <div>{characterSpellSlot7}</div>
  </div>

	<div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '43.5%', left: '62%', width: '24.5%', height: '16%', fontSize: '0.59vw' }}>
		{loadCharacterSpells
		.filter(spell => spell.characterSpellLevel === '7')
		.map(spell => (
			<div className='d-flex justify-content-between hover-red' key={spell._id} style={{display: 'block', width: '100%'}} >{spell.characterSpellName}
				<button className='delete-property-button' style={{width: '10%'}} 
				onClick={(e) => deleteItem(e, spell._id, 'http://localhost:4000/CreateCharacter/DeleteSpell/')}>X</button>
			</div>
		))}
	</div>
	
	{/* Spell Slot 8*/}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '61%', left: '63.5%', width: '4.5%', height: '2.5%', fontSize: '1.3vw' }}>
    <div>{characterSpellSlot8}</div>
  </div>

	<div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '65%', left: '62%', width: '24.5%', height: '12.5%', fontSize: '0.59vw' }}>
		{loadCharacterSpells
		.filter(spell => spell.characterSpellLevel === '8')
		.map(spell => (
			<div className='d-flex justify-content-between hover-red' key={spell._id} style={{display: 'block', width: '100%'}} >{spell.characterSpellName}
				<button className='delete-property-button' style={{width: '10%'}} 
				onClick={(e) => deleteItem(e, spell._id, 'http://localhost:4000/CreateCharacter/DeleteSpell/')}>X</button>
			</div>
		))}
	</div>

	{/* Spell Slot 9*/}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '79%', left: '63.5%', width: '4.5%', height: '2.5%', fontSize: '1.3vw' }}>
    <div>{characterSpellSlot9}</div>
  </div>

	<div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', paddingRight: '15px', top: '82.5%', left: '62%', width: '24.5%', height: '12.5%', fontSize: '0.59vw' }}>
		{loadCharacterSpells
		.filter(spell => spell.characterSpellLevel === '9')
		.map(spell => (
			<div className='d-flex justify-content-between hover-red' key={spell._id} style={{display: 'block', width: '100%'}} >{spell.characterSpellName}
				<button className='delete-property-button' style={{width: '10%'}} 
				onClick={(e) => deleteItem(e, spell._id, 'http://localhost:4000/CreateCharacter/DeleteSpell/')}>X</button>
			</div>
		))}
	</div>

	<img className="img-fluid character-sheet" src={DndSheetImage} alt="Character Image" style={{minWidth: '450px', width: '90%'}}/>
</div>
)

}

export default DndSheetTwo;