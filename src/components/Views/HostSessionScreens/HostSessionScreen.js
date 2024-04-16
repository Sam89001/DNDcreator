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
  return (
    <div style={{paddingBottom: '20px'}}>
      <nav className='navigation-bar'>
        <Navbar navigationTitle="Session Menu" navigationTitleLink="/ChooseSession" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
      </nav>

      <div style={{paddingTop: '75px', maxWidth: '100vw', minWidth: '1500px', height: '97vh', position: 'relative'}}>

        <div className='row mx-auto justify-content-center' style={{height: '100%'}}  >
          <div className='col-9 row' >

            <div className='col-12'>
              <header className="form-header text-center">Map</header>
            </div>

          </div>

          <div className='col-3 row'>
            <DiceRoller/>
          </div>
        </div>

        <div style={{position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', 
        backgroundColor: 'transparent', cursor: 'pointer', zIndex: 999, height: '75%', width: '30%', display: 'flex', flexDirection: 'column'}}>
            <div style={{height: '50%', backgroundColor: 'blue', width: '7%', alignSelf: 'flex-end'}}>
                First Div
            </div>
            <div style={{height: '50%', backgroundColor: 'green', width: '7%', alignSelf: 'flex-end'}}>
                Second Div
            </div>
        </div>

      </div>

    </div>
  )
}

export default HostSession