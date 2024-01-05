//CSS
import '../../css/App.css';
import '../../css/Site.css';
import '../../css/Animations.css';

//Images
import Logo from '../../images/Logo.png';
import CoverImage from '../../images/DND Image 2.jpg';

//Components
import RegisterForm from '../../components/Forms/RegisterForm';

//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function Register() {
  return (
      <div className="App">
        <div className="row d-flex container-fluid gx-0">

          <div className="col-8" >
            <img className="img-fluid d-block w-100 cover-image" src={CoverImage} />
          </div>

          <div className="col-4 page-fade-in">
            <div className="row justify-content-center align-content-center">

              <div className="col-12 d-flex justify-content-center align-items-center">
                <img className="img-fluid" src={Logo} ></img>
              </div>

              <div className="col-12 text-center">
                <header className="header">Login</header>
              </div>

              <div className="col-12 mb-4 d-flex align-items-center justify-content-center">
              <RegisterForm />
              </div>

              <div className="col-6 d-flex align-items-center justify-content-center">
                <div className="row">

                  <div className="col-6 d-flex justify-content-center align-items-center text-center">
                    <a className="cover-buttons">Register</a>
                  </div>

                  <div className="col-6 d-flex justify-content-center align-items-center text-center" >
                    <a className="cover-buttons">Forgot Password</a>
                  </div>

                </div>
              </div>

            </div>
          </div>


        </div>
      </div>
  );
}

export default Register;