import '../../css/Site.css';
import '../../css/Animations.css';
import '../../css/Components.css';

//Images
import DndSheetImage from '../../images/sheet3.png'

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function DndSheetThree({propId, getCharacterData,

	characterName, characterAge, characterEyes, characterHair, 
	characterHeight, characterSkin, characterWeight,

	characterTextAppearence, characterBackstory}) {

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

	{/* Name */}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '7.7%', left: '9%', width: '30%', height: '3%', fontSize: '1.1vw' }}>
    <div>{characterName}</div>
  </div>

	{/* Age*/}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '6%', left: '42%', width: '12%', height: '2%', fontSize: '0.8vw' }}>
    <div>{characterAge}</div>
  </div>

	{/* Height*/}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '6%', left: '58.5%', width: '11%', height: '2%', fontSize: '0.8vw' }}>
    <div>{characterHeight}</div>
  </div>

	{/* Weight*/}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '6%', left: '73%', width: '11%', height: '2%', fontSize: '0.8vw' }}>
    <div>{characterWeight}</div>
  </div>

	{/* Eyes*/}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '9.5%', left: '42%', width: '12%', height: '2%', fontSize: '0.8vw' }}>
    <div>{characterEyes}</div>
  </div>

	{/* Skin*/}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '9.5%', left: '58.5%', width: '11%', height: '2%', fontSize: '0.8vw' }}>
    <div>{characterSkin}</div>
  </div>

	{/* Hair */}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '9.5%', left: '73%', width: '11%', height: '2%', fontSize: '0.8vw' }}>
    <div>{characterHair}</div>
  </div>

	{/* Character Appearence */}
	<div className="absolute-div dnd-sheet-noflex" style={{  backgroundColor: 'transparent', top: '16.5%', left: '7%', width: '24.5%', height: '28%', fontSize: '0.8vw' }}>
    <div>{characterTextAppearence}</div>
  </div>

	{/* Character Backstory */}
	<div className="absolute-div dnd-sheet-noflex" style={{  backgroundColor: 'transparent', top: '49%', left: '7%', width: '24.5%', height: '47%', fontSize: '0.8vw' }}>
    <div>{characterBackstory}</div>
  </div>

	<img className="img-fluid character-sheet" src={DndSheetImage} alt="Character Image" style={{minWidth: '450px', width: '95%'}}/>
</div>
)

}

export default DndSheetThree;