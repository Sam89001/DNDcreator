import '../../css/Site.css';
import '../../css/Components.css';
import '../../css/Animations.css';

function PopUp({closePopUp, popUpTitle}) {

  return (
    <div className='pop-up-overlay'>
      <div className="pop-up">

        <div className='pop-up-header'>
          <div className='row'>

            <div className='col-9'>
              <div className='pop-up-title'>{popUpTitle}</div>
            </div>

            <div className='col-3'>
              <button className='pop-up-button' onClick={closePopUp}>Close me</button>
            </div>
            
          </div>
        </div>

        <div className='pop-up-body'>

        </div>
      </div>
    </div>

  );
}


export default PopUp;
