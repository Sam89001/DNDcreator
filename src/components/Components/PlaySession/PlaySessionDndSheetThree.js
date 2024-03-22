import '../../../css/Site.css';
import '../../../css/Animations.css';
import '../../../css/Components.css';

//Images
import DndSheetImage from '../../../images/sheet3.png'

function DndSheetThree({}) {
  return (
    <div className='container' style={{ position: 'relative', minWidth: '500px',}}>

      
       {/* image */}
       <img className="img-fluid character-sheet" src={DndSheetImage} alt="Character Image" style={{minWidth: '450px'}}/>
    </div>
  )
}

export default DndSheetThree