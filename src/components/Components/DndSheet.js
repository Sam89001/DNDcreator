import '../../css/Site.css';
import '../../css/Animations.css';
import '../../css/Components.css';

//Images
import DndSheetImage from '../../images/sheet1.jpg'


//Dependencies

function DndSheet({ title, openPopUp }) {
	return (
    <div>
      <div className='container'>
        <img className="img-fluid" src={DndSheetImage} alt="Character Image" />
      </div>
    </div>
  );
}

export default DndSheet;