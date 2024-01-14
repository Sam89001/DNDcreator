//css
import '../../css/Site.css';
import '../../css/Animations.css';

//Dependencies
import { Link } from 'react-router-dom';


function OptionChoice({ title, imageUrl, link }) {
  return (
    <div className="col-3 d-flex justify-content-center align-items-center">
      <Link className="d-flex justify-content-center align-items-center reserved-hover-space" to={link}>
        <div className="d-flex justify-content-center align-items-center selection-box row">

					<div className="col-12" style={{ paddingBottom: '15px' }}>
						<div className="selection-box-text" >{title}</div>
					</div>

					<div className="col-12 d-flex justify-content-center">
						<img className="img-fluid" src={imageUrl} style={{ maxWidth: '200px' }}/>
					</div>

        </div>
      </Link>
    </div>
  );
}

export default OptionChoice;