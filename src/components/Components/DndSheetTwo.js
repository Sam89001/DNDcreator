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


	<img className="img-fluid character-sheet" src={DndSheetImage} alt="Character Image" style={{minWidth: '450px', width: '95%'}}/>
</div>
)

}

export default DndSheetTwo;