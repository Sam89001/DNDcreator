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

      <div className='row mx-auto justify-content-center'  style={{paddingTop: '75px', maxWidth: '1900px', minWidth: '1500px', height: '97vh'}}>
        <div className='col-9 row' >

          <div className='col-12'>
            <header className="form-header text-center">Map</header>
          </div>

        </div>

        <div className='col-3 row'>
          <DiceRoller/>
        </div>

      </div>

    </div>
  )
}

export default HostSession