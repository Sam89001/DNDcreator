//CSS
import '../../css/Site.css';
import '../../css/Animations.css';

//Images
import Logo from '../../images/Logo.png';
import { Toaster } from 'react-hot-toast';

function NavBar({navigationTitle, secondNavigationTitle}) {
  return(
		<div className="row navigation-bar-height" >
			<Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
			<div className="col-9 d-flex navigation-bar-height" >
				<img className="img-fluid p-2" src={Logo} />
			</div>			

			<div className="col-3 d-flex justify-content-center align-items-center p-0">

				<div className="d-flex justify-content-center w-50 h-75" style={{ borderRight: '1px solid var(--textGrey)' }}>
   		 		<a className="d-flex justify-content-center align-items-center w-100 navbar-text" href="/Home/EditAccountDetails">{navigationTitle}</a>
				</div>

				<div className="d-flex justify-content-center w-50 h-75" style={{ borderLeft: '1px solid var(--textGrey)' }}>
					<a className="d-flex justify-content-center align-items-center w-100 navbar-text" href="/Home/Login" style={{ paddingRight: '60px' }}>{secondNavigationTitle}</a>
				</div>

			</div>
		</div>
				
  );
}

export default NavBar;