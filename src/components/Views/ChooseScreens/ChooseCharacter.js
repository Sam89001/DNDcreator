//css
import '../../../css/Site.css';
import '../../../css/Animations.css';

//components
import Navbar from '../../Layouts/Navbar';
import Create from '../../Components/Create'
import LoadItem from '../../Components/LoadItem';
import PopUp from '../../Components/PopUp';
import { UserContext } from '../../../context/userContext';

//Dependencies
import React, { useContext, useState } from 'react';

//Temp Images
import TempImage from '../../../images/temp-character.jpg'


function ChooseCharacter() {
  const { user } = useContext(UserContext);
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const handleItemClick = () => {
    // Set the state to true when the item is clicked
    setPopupVisibility(true);
  };

  const handleClosePopup = () => {
    // Set the state to false when the popup is closed
    setPopupVisibility(false);
  };

  return (
    <div>
      <nav className='navigation-bar'>
        <Navbar navigationTitle="Main Menu" navigationTitleLink="/Home" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
      </nav>

      <div className="col-12 d-flex align-items-center justify-content-center page-styling">
        <header className="header text-center">Choose Your Character</header>
      </div>

      <div className="col-12 text-center justify-content-center align-items-center mb-0" style={{padding: '30px'}}>
        <div className="d-flex character-select-box justify-content-center" >
          <div className="row h-100 w-100 d-flex" >  
            <Create title="Create a Character"/>
            <LoadItem title="Mike" link="/CreateCharacter" image={TempImage} onClick={handleItemClick}/>
          </div>
        </div>
      </div>

      {isPopupVisible && <PopUp onClose={handleClosePopup} />}
    </div>
  );
}

export default ChooseCharacter;
