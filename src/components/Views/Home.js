//css
import '../../css/Site.css';
import '../../css/Animations.css';

//components
import Navbar from '../Layouts/Navbar';
import OptionChoice from '../Components/OptionChoice';
import { UserContext } from '../../context/userContext';

//images
import CreateCharacterImage from '../../images/PlaySession.png'
import PlaySessionImage from '../../images/PlaySession.png'
import HostSessionImage from '../../images/PlaySession.png'

//Dependencies
import React, { useContext } from 'react';

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <nav className='navigation-bar'>
        <Navbar navigationTitle="Account Settings" navigationTitleLink="/AccountEdit" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
      </nav>

      <div className="col-12 d-flex align-items-center justify-content-center page-styling" style={{ paddingBottom: '80px' }}>
        <header className="header text-center">
           Hello, {!!user && (user.name)}. <br></br> What would you like to do today?
        </header>
      </div>

      <div className="col-12 text-center justify-content-center align-items-center mb-0">
        <div className="row justify-content-center align-items-center"> 

          <OptionChoice title="Create a Character" imageUrl={CreateCharacterImage} link="/ChooseCharacter"/>

          <OptionChoice title="Play a Session" imageUrl={PlaySessionImage} link="/ChoosePlaySession"/>

          <OptionChoice title="Host a Session" imageUrl={HostSessionImage} link="/ChooseSession"/>

        </div>
      </div>

    </div>
  );
}

export default Home;