//CSS

import '../../css/Site.css';
import '../../css/Components.css';
import '../../css/Animations.css';

function DeletePopUp({deleteCharacter, closeDeletePopUp}) {

return(
  <div className='pop-up-overlay'>
    <div className="pop-up delete-pop-up d-flex flex-column align-items-center justify-content-center">
      <div className="text-center">
        Are you Sure You Want to Delete This Character?
      </div>
      <div className="mt-3">
        <button className="delete-property-button mr-2" onClick={deleteCharacter}>Yes</button>
        <button className="delete-property-button" onClick={closeDeletePopUp}>No</button>
      </div>
    </div>
  </div>
)

}

export default DeletePopUp