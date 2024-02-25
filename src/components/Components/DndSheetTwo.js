import '../../css/Site.css';
import '../../css/Animations.css';
import '../../css/Components.css';

//Images
import DndSheetImage from '../../images/sheet2.png'

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

function DndSheetTwo({fetchData}) {

const deleteItem =  async (e, id, address) => {
	e.preventDefault();
	try {
		const response = await axios.delete(address + `${id}`);
		if(response.error) {
			toast.error(response.data.error);
		} else {
			fetchData();
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
    <div>john</div>
  </div>

	{/* Spellcasting Ability */}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '7.7%', left: '45%', width: '9%', height: '2.5%', fontSize: '1.1vw' }}>
    <div>john</div>
  </div>

	{/* Spellcasting DC */}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '7.7%', left: '60.8%', width: '9%', height: '2.5%', fontSize: '1.1vw' }}>
    <div>john</div>
  </div>

	{/* Spellcasting Atk Bonus */}
	<div className="absolute-div dnd-sheet" style={{  backgroundColor: 'transparent', top: '7.7%', left: '77%', width: '9%', height: '2.5%', fontSize: '1.1vw' }}>
    <div>john</div>
  </div>

	<img className="img-fluid character-sheet" src={DndSheetImage} alt="Character Image" style={{minWidth: '450px', width: '90%'}}/>
</div>
)

}

export default DndSheetTwo;