//CSS

import '../../css/Site.css';
import '../../css/Components.css';
import '../../css/Animations.css';

function DeletePopUp({deleteCharacter, closeDeletePopUp}) {

return(
  <div className='pop-up-overlay'>
    <div className="pop-up delete-pop-up d-flex flex-column align-items-center justify-content-center">
      <div className="text-center" style={{fontSize: '1.3vw', paddingBottom: '20px'}}>
        Are you Sure You Want to Delete This Character?
      </div>
      <div className="mt-3">
        <button className="delete-pop-up-button mr-2" style={{marginRight: '30px', color: 'white'}}
        onClick ={(e) => deleteCharacter(e)} >Yes</button>
        <button className="delete-pop-up-button" style={{color: 'white'}}
        onClick={closeDeletePopUp}>No</button>
      </div>
    </div>
  </div>
)

}

export default DeletePopUp