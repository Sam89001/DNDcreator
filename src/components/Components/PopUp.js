//CSS

import '../../css/Site.css';
import '../../css/Components.css';
import '../../css/Animations.css';

//Forms

import CreateCharacterForm from '../Forms/CreateCharacterForms/CreateCharacterForm';

function PopUp({closePopUp, popUpTitle, formType}) {

  {/* Form rendering*/ }

  const renderForm = () => {
    switch (formType) {
      case 'createCharacterForm':
        return <CreateCharacterForm/>;
      case 'createSessionForm':
        return ;
      default:
        return null;
    }
  };

  {/*HTML*/}

  return (
    <div className='pop-up-overlay'>
      <div className="pop-up pop-up-styling">

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
          {/* Load forms depending on view here */}
          {renderForm()}
        </div>
      </div>
    </div>
  );
}


export default PopUp;
