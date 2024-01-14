//CSS
import '../../css/Site.css';
import '../../css/Animations.css';

//Images
import Logo from '../../images/Logo.png';
import { Toaster } from 'react-hot-toast';

function NavBar() {
  return(
		<div className="row navigation-bar-height" >
			<div className="col-9 d-flex navigation-bar-height" >
				<img className="img-fluid p-2" src={Logo} />
			</div>			

			<div className="col-3 d-flex justify-content-center align-items-center p-0">
				 {/* fill this content depending on which page it is on */}
			</div>
		</div>
				
  );
}

export default NavBar;