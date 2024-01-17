import '../../css/Site.css';
import '../../css/Animations.css';

//Images
import PlusImage from '../../images/Plus Graphic.png'

//Dependencies
import { Link } from 'react-router-dom';

function Create({ title, link }) {
    return (
      <Link className="w-100 d-flex justify-content-center align-items-center choose-character" to={link}>
        <div className="row text-center">
          <div className="col-12" style={{ paddingBottom: '10px', paddingTop: '20px' }}>
            <img className="img-fluid" src={PlusImage} alt="Plus Graphic" style={{ maxWidth: '80%' }} />
          </div>
          
          <div className="col-12" style={{ paddingBottom: '30px' }}>
            <div className="selection-box-text">{title}</div>
          </div>
        </div>
      </Link>
    );
  }

export default Create;