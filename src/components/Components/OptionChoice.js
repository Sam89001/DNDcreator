//css
import '../../css/Site.css';
import '../../css/Animations.css';

//Images
import Temp from '../../images/dungeons-and-dragons.jpg';


function OptionChoice() {
  return (
    <div className="col-3 d-flex justify-content-center align-items-center">
      <a className="d-flex justify-content-center align-items-center reserved-hover-space">
        <div className="d-flex justify-content-center align-items-center selection-box row">
					<div class="col-12" style={{ paddingBottom: '15px' }}>
						<div class="selection-box-text" >Create a Character</div>
					</div>

					<div class="col-12 d-flex justify-content-center">
						<img class="img-fluid" src={Temp} style={{ maxWidth: '200px' }}/>
					</div>
        </div>
      </a>
    </div>
  );
}

export default OptionChoice;