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

          <OptionChoice title="Create a Character" imageUrl={CreateCharacterImage} link=""/>

          <OptionChoice title="Play a Session" imageUrl={PlaySessionImage} link=""/>

          <OptionChoice title="Host a Session" imageUrl={HostSessionImage} link=""/>

        </div>
      </div>

    </div>
  );
}

export default Home;