//css
import '../../css/Site.css';
import '../../css/Animations.css';


function OptionChoice({ title, imageUrl, link }) {
  return (
    <div className="col-3 d-flex justify-content-center align-items-center">
      <a className="d-flex justify-content-center align-items-center reserved-hover-space">
        <div className="d-flex justify-content-center align-items-center selection-box row">

					<div class="col-12" style={{ paddingBottom: '15px' }}>
						<div class="selection-box-text" >{title}</div>
					</div>

					<div class="col-12 d-flex justify-content-center">
						<img class="img-fluid" src={imageUrl} style={{ maxWidth: '200px' }}/>
					</div>
					
        </div>
      </a>
    </div>
  );
}

export default OptionChoice;