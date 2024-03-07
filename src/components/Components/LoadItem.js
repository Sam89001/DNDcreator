import '../../css/Site.css';
import '../../css/Animations.css';
import '../../css/Components.css';

//Dependencies
import { Link } from 'react-router-dom';

function LoadItem({ title, link, image }) {
    return (
      <Link className='col-2 d-flex align-items-center justify-content-center' style={{padding: '30px'}} to={link}>
				<div className="row text-center w-100 d-flex justify-content-center align-items-center choose-character" >
						<div className="col-12" style={{ paddingBottom: '10px', paddingTop: '20px' }}>
							<img className="img-fluid plus-symbol" src={image} alt={image} />
						</div>
						
						<div className="col-12" style={{ paddingBottom: '30px' }}>
							<div className="selection-box-text">{title}</div>
						</div>
				</div>
      </Link>
    );
  }

export default LoadItem;