//CSS
import '../../../css/Components.css'

//Components
import Navbar from '../../Layouts/Navbar';
import { UserContext } from '../../../context/userContext';
import DiceRoller from '../../Components/DiceRoller';

//Dependencies
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast'
import ClipLoader from "react-spinners/ClipLoader";

function HostSession() {

  const [popout, setActivePopOut] = useState(null);
  const handlePopOut = (index) => {
    setActivePopOut((prevPopout) => (prevPopout === index ? null : index));
  };

  return (
    <div style={{paddingBottom: '20px'}}>
      <nav className='navigation-bar'>
        <Navbar navigationTitle="Session Menu" navigationTitleLink="/ChooseSession" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
      </nav>

      <div style={{paddingTop: '75px', maxWidth: '100vw', minWidth: '1500px', height: '97vh', position: 'relative'}}>

        <div className='row mx-auto justify-content-center' style={{height: '100%', width: '96%'}}  >
          <div className='col-9 row' >

            <div className='col-12'>
              <header className="form-header text-center">Map</header>
            </div>

          </div>

          <div className='col-3 row'>
            <DiceRoller/>
          </div>
        </div>

        <div className='host-popout-container'>
          
          <div className={`host-popout ${popout === 0 ? 'active' : ''}`}
            style={{ backgroundColor: 'var(--textGrey)' }}
            onClick={() => handlePopOut(0)}>
          Content 1</div>

          <div className={`host-popout ${popout === 1 ? 'active' : ''}`}
            style={{ backgroundColor: 'var(--lightBackgroundGrey)', bottom: 0, right: 0 }}
            onClick={() => handlePopOut(1)}>
          Content 2</div>

        </div>

      </div>

    </div>
  )
}

export default HostSession