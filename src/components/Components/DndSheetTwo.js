import '../../css/Site.css';
import '../../css/Animations.css';
import '../../css/Components.css';

//Images
import DndSheetImage from '../../images/sheet2.png'

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function DndSheetTwo({getCharacterData, propId, characterSpellcastingClass, characterSpellcastingAbility,
	characterSpellSaveDC, characterSpellAttackBonus, loadCharacterSpells}) {

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

  <div className="absolute-div dnd-sheet-noflex" style={{  backgroundColor: 'transparent', top: '23.3%', left: '5%', width: '25%', height: '13%', fontSize: '0.59vw' }}>
		{loadCharacterSpells
		.filter(spell => spell.characterSpellLevel === '0')
		.map(spell => (
			<div className='d-flex justify-content-between' key={spell._id} style={{display: 'block', width: '100%'}} >{spell.characterSpellName}
				<button className='delete-property-button' style={{width: '10%'}} 
				onClick={(e) => deleteItem(e, spell._id, 'http://localhost:4000/CreateCharacter/DeleteSpell/')}>X</button>
			</div>
		))}
	</div>

	<div className="absolute-div dnd-sheet-noflex" style={{  backgroundColor: 'transparent', top: '45%', left: '6.5%', width: '23.5%', height: '13%', fontSize: '0.59vw' }}>
		{loadCharacterSpells
		.filter(spell => spell.characterSpellLevel === '1')
		.map(spell => (
			<div className='d-flex justify-content-between' key={spell._id} style={{display: 'block', width: '100%'}} >{spell.characterSpellName}
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