//css
import '../../css/Site.css';
import '../../css/Animations.css';

//components
import Navbar from '../Layouts/Navbar';
import Create from '../Components/Create'
import { UserContext } from '../../context/userContext';

//Dependencies
import React, { useContext } from 'react';


function ChooseCharacter() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <nav className='navigation-bar'>
        <Navbar navigationTitle="Main Menu" navigationTitleLink="/Home" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
      </nav>

      <div className="col-12 d-flex align-items-center justify-content-center page-styling" >
        <header className="header text-center">Choose Your Character</header>
      </div>

      <div className="col-12 text-center justify-content-center align-items-center mb-0" style={{padding: '30px'}}>
        <div className="d-flex character-select-box justify-content-center" >
          <div className="row h-100 w-100 d-flex" > 
            <div className="col-2 d-flex align-items-center justify-content-center" style={{padding: '30px'}}>

              <Create title="Create a Character" link=""/>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default ChooseCharacter;