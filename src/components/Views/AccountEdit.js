//css
import '../../css/Site.css';
import '../../css/Animations.css';

//components
import Navbar from '../Layouts/Navbar';
import OptionChoice from '../Components/OptionChoice';
import { UserContext } from '../../context/userContext';

//images
import CreateCharacterImage from '../../images/dungeons-and-dragons.jpg'
import PlaySessionImage from '../../images/play-a-session.jpg'
import HostSessionImage from '../../images/host-a-session.jpg'

//Dependencies
import React, { useContext } from 'react';

function AccountEdit() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <nav className='navigation-bar'>
        <Navbar navigationTitle="Main Menu" navigationTitleLink="/Home" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
      </nav>

      <div className="col-12 d-flex align-items-center justify-content-center page-styling" style={{ paddingBottom: '80px' }}>

        <header className="header text-center">Edit Account Details</header>
        <p className="text-center w-100" style="color: var(--textGrey);">Leave blank to keep details the same</p>

      </div>

      <div className="col-12 text-center justify-content-center align-items-center mb-0">
        
      </div>

    </div>
  );
}

export default AccountEdit;