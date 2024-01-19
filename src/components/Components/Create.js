import '../../css/Site.css';
import '../../css/Animations.css';
import '../../css/Components.css';

//Images
import PlusImage from '../../images/Plus Graphic.png'


//Dependencies

function Create({ title, openPopUp}) {

    return (
      <div className='col-2 d-flex align-items-center justify-content-center' style={{padding: '30px'}} >
        <button className="row text-center w-100 d-flex justify-content-center align-items-center choose-character" onClick={openPopUp}>
            <div className="col-12" style={{ paddingBottom: '10px', paddingTop: '20px' }}>
              <img className="img-fluid plus-symbol" src={PlusImage} alt="Plus Graphic" />
            </div>
            
            <div className="col-12" style={{ paddingBottom: '30px' }}>
              <div className="selection-box-text">{title}</div>
            </div>
        </button>
      </div>     
    );
  }

export default Create;