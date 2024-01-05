//CSS
import '../../css/Site.css';
import '../../css/Animations.css';
import '../../css/Form.css';

//Images
import Logo from '../../images/Logo.png';
import CoverImage from '../../images/DND Image 2.jpg';

//Components
import RegisterForm from '../../components/Forms/RegisterForm';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function Register() {
  return (
      <div className="App">
        <div className="row d-flex container-fluid gx-0">

          <div className="col-8" >
            <img className="img-fluid d-block w-100 cover-image" src={CoverImage} />
          </div>

          <div className="col-4 page-fade-in">
            <div className="row justify-content-center align-content-center">

              <div className="col-12 d-flex justify-content-center align-items-center cover-logo-container" >
                <img className="img-fluid cover-logo" src={Logo} ></img>
              </div>

              <div className="col-12 text-center">
                <header className="header">Register</header>
              </div>

              <div className="col-12 d-flex align-items-center justify-content-center ">
                <RegisterForm />
              </div>

              <div className="col-6 d-flex justify-content-center text-center" >          
                <a className="cover-buttons" href="/">Return</a>     
              </div>

            </div>
          </div>


        </div>
      </div>
  );
}

export default Register;