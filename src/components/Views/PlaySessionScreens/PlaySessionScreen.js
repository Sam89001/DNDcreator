import Navbar from '../../Layouts/Navbar';
import { UserContext } from '../../../context/userContext';

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast'

function PlaySession() {
  return (
    <div style={{paddingBottom: '20px'}}>

      <nav className='navigation-bar'>
        <Navbar navigationTitle="Character Menu" navigationTitleLink="/ChoosePlaySession" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
      </nav>

      <div className='row mx-auto justify-content-center' style={{paddingTop: '85px', maxWidth: '1900px', minWidth: '1500px'}}> 

        <div className="col-3 d-flex justify-content-center align-items-center">
          <header className="form-header text-center">Combat Stats</header>

        </div>

        <div className="col-4 d-flex justify-content-center align-items-center">
          <header className="form-header text-center">Dice & Damage</header>

        </div>

        <div className="col-5 d-flex justify-content-center align-items-center">
          <header className="form-header text-center">Character Sheet</header>

        </div>

      </div>

    </div>
  )
}


export default PlaySession