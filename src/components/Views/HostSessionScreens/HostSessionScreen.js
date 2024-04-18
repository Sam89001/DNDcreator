//CSS
import '../../../css/Components.css'

//Images
import DiceImage from '../../../images/d20.png'
import UploadArrow from '../../../images/Upload Arrow No BK.png'
import UpArrow from '../../../images/Up Arrow.png'
import RightArrow from '../../../images/Right Arrow.png'
import LeftArrow from '../../../images/Left Arrow.png'

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
import { Droppable} from 'react-beautiful-dnd'

function HostSession() {

  //Popups
  const [popout, setActivePopOut] = useState(null);
  const [lowerPopOut, setActiveLowerPopOut] = useState(null);
  const handlePopOut = (index) => {
      setActivePopOut((prevPopout) => (prevPopout === index ? null : index));
  };
  const handleLowerPopOut = (index) => {
      setActiveLowerPopOut((prevPopout) => (prevPopout === index ? null : index));
  };

  
  //Popup Content
  function popoutContent() {
    if(popout == null) {
      return (
        <div className='d-flex justify-content-center align-items-center' style={{padding: '5px'}}>
          <img className='img-fluid' src={DiceImage} style={{opacity: '0.7'}}></img>
        </div>
      );
    } else {
      return (
        <div className='d-flex flex-row' style={{height: '100%', width: '100%'}}>

          <div style={{width: '91%', zIndex: '100'}}>
            <div className='row' style={{height: '100%'}}>

              <div className='col-12'>
                <div className='text-center' style={{ display: 'block', width: '100%' }}>Default Characters</div>
                
                <div className='grid-counters-grid'>
                  
                    {stateCharacters.map((character, index) => (
                      <div className='grid-counters'
                        draggable='true'>
                        <img className='img-fluid' src={character.image} style={{ width:'100%' }} />
                      </div>
                    ))}
                  
                </div>

              </div>

              <div className='col-12'>
                <div className='text-center' style={{ display: 'block', width: '100%'}}>User Uploaded</div>

                <div className='grid-counters-grid'>

                  <div className='grid-counters d-flex justify-content-center align-items-center flex-column'>
                    <img className='img-fluid' src={UploadArrow} style={{ width:'70%'}}/>
                    <div className='text-center' style={{fontSize: '1.5vh'}}>Upload</div>
                  </div>

                  {stateCharacters.map((character) => (
                    <div key={character.id} className='grid-counters'>
                      <img className='img-fluid' src={character.image} style={{ width:'100%'}}/>
                    </div>
                  ))}

                </div>

              </div>

            </div>
            
          </div >

          <div style={{backgroundColor: 'blue', width: '9%', height: '50%'}}>
            {/* Image to return goes here*/}
          </div>

        </div>
        
      );
    }
  }
  function lowerPopoutContent() {
    if(lowerPopOut == null) {
      return (
        <div className='d-flex justify-content-center align-items-center' style={{padding: '5px'}}>
          <img className='img-fluid' src={DiceImage} style={{opacity: '0.7'}}></img>
        </div>
      );
    } else {
      return (
        <div>2nd Test</div>
      );
    }
  }

  const droppableCharacters = [
    {
      id: 'defaultMage',
      uniqueId: '',
      image: DiceImage,
      name: 'Mage',
      userName: '',
      Hp: '',
      MaxHp: ''
    },
    {
      id: 'defaultMage',
      uniqueId: '',
      image: DiceImage,
      name: 'Mage',
      userName: '',
      Hp: '',
      MaxHp: ''
    },
    {
      id: 'defaultMage',
      uniqueId: '',
      image: DiceImage,
      name: 'Mage',
      userName: '',
      Hp: '',
      MaxHp: ''
    },
    {
      id: 'defaultMage',
      uniqueId: '',
      image: DiceImage,
      name: 'Mage',
      userName: '',
      Hp: '',
      MaxHp: ''
    },
    {
      id: 'defaultMage',
      uniqueId: '',
      image: DiceImage,
      name: 'Mage',
      userName: '',
      Hp: '',
      MaxHp: ''
    },
    {
      id: 'defaultMage',
      uniqueId: '',
      image: DiceImage,
      name: 'Mage',
      userName: '',
      Hp: '',
      MaxHp: ''
    },
    {
      id: 'defaultMage',
      uniqueId: '',
      image: DiceImage,
      name: 'Mage',
      userName: '',
      Hp: '',
      MaxHp: ''
    },
    {
      id: 'defaultMage',
      uniqueId: '',
      image: DiceImage,
      name: 'Mage',
      userName: '',
      Hp: '',
      MaxHp: ''
    },
    {
      id: 'defaultMage',
      uniqueId: '',
      image: DiceImage,
      name: 'Mage',
      userName: '',
      Hp: '',
      MaxHp: ''
    },
    {
      id: 'defaultMage',
      uniqueId: '',
      image: DiceImage,
      name: 'Mage',
      userName: '',
      Hp: '',
      MaxHp: ''
    },
    {
      id: 'defaultMage',
      uniqueId: '',
      image: DiceImage,
      name: 'Mage',
      userName: '',
      Hp: '',
      MaxHp: ''
    },
    
  ]
  const [stateCharacters, setStateCharacters] = useState(droppableCharacters)

  

  //Map Functions
  const [userMapSize, setUserMapSize] = useState({
    dimensionOne: '',
    dimensionTwo: ''
  })
  const [userSquareHeight, setUserSquareHeight] = useState({
    squareHeight: '',
  })
  useEffect(() => {
    setUserMapSize({ 
      dimensionOne: '30',
      dimensionTwo: '20'
     });
  }, []);
  useEffect(() => {
    setUserSquareHeight({ squareHeight: '1.5' });
  }, []);


  function setMapSize() {
    if (
      !userMapSize.dimensionOne ||
      !userMapSize.dimensionTwo ||
      isNaN(userMapSize.dimensionOne) ||
      isNaN(userMapSize.dimensionTwo)
    ) {
      toast.error('Please include numbers for map size.');
      return null;
    }
  
    const dimensionOne = parseInt(userMapSize.dimensionOne);
    const dimensionTwo = parseInt(userMapSize.dimensionTwo);
  
    // Generate the div elements with white border
    const divElements = [];
  
    for (let i = 1; i <= dimensionOne * dimensionTwo; i++) {
      divElements.push(
        <div
          key={`item-${i}`}
          style={{
            border: '1px solid white',
            boxSizing: 'border-box',
            width: '100%',
            height: '100%'
          }}
        />
      );
    }
  
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${dimensionOne}, 1fr)`,
          gridTemplateRows: `repeat(${dimensionTwo}, 1fr)`,
          gap: '0px', // No gap between grid items
          padding: 0,
          margin: 0,
          fontSize: `${userSquareHeight.squareHeight}vw`,
          width: '100%',
          height: '100%'
        }}
      >
        {divElements}
      </div>
    );
  }
  
  
  
  return (
    <div style={{paddingBottom: '20px'}}>
      <nav className='navigation-bar'>
        <Navbar navigationTitle="Session Menu" navigationTitleLink="/ChooseSession" secondNavigationTitle="Logout" navigationTitleSecondLink="/Login"/>
      </nav>

        <div className="d-flex align-items-center" style={{paddingTop: '75px', maxWidth: '100vw', minWidth: '1500px', height: '97vh', }}>

          <div className='row mx-auto justify-content-center' style={{height: '100%', width: '96%'}}  >
            <div className='col-9 row' >

              <div className='col-12 d-flex justify-content-center flex-column' style={{paddingBottom: '5px'}}>
                <div className="spells-field spell-form-titles text-center" style={{display: 'block', width: '100%', color: 'var(--textGrey)'}}> Initiative</div>

                <div className='d-flex flex-row justify-content-center' style={{width: '100%', paddingBottom: '10px'}}>
                  <div className='initiative-box d-flex justify-content-end align-items-center'>
                    <img className='img-fluid' src={LeftArrow} style={{maxHeight: '2.5vh'}}></img>
                  </div>

                  <div className='initiative-box text-center'>Mike</div>
                  <div className='initiative-box text-center'>John</div>
                  <div className='initiative-box text-center'>Steve</div>
                  <div className='initiative-box text-center'>Jerm</div>
                  <div className='initiative-box text-center'>Farrah</div>

                  <div className='initiative-box d-flex justify-content-start align-items-center'>
                    <img className='img-fluid' src={RightArrow} style={{maxHeight: '2.5vh'}}></img>
                  </div>
                </div>

                <div className="d-flex justify-content-center align-items-center flex-column" style={{ width: '100%'}}> 
                  <img className='img-fluid' src={UpArrow} style={{height: '1vh', width: '2vh'}}></img>
                  <div style={{fontSize: '1.5vh'}}>Turn Player</div>
                </div>

              </div>

              <div className='col-12' style={{height: '100%'}}>
                
                {/* List placed in here*/}          
                <div style={{height: '100%', maxHeight: '630px', marginBottom: '10px'}}>
                  <div style={{ backgroundColor: 'transparent', width: '100%', height: '100%', maxHeight: '700px', overflowY: 'hidden' }}>
                    {setMapSize()}
                  </div>
                </div>  

                <div className='d-flex flex-row'>
                {/* Grid Size*/}
                  <form onSubmit={(e) => { e.preventDefault(); setMapSize(); }}>
                    <label>Grid Size</label>
                    <div className='d-flex flex-row '>
                      
                        <input 
                          onChange={(e) => setUserMapSize((prevData) => ({
                            ...prevData,
                            dimensionOne: e.target.value
                        }))}/>
                        <div>x</div>
                        <input 
                          onChange={(e) => setUserMapSize((prevData) => ({
                            ...prevData,
                            dimensionTwo: e.target.value
                        }))}/>

                        <button type="submit">Submit</button>
                      
                    </div>
                  </form>
                  
                  {/* Square Height*/}
                  <div className='d-flex flex-row '>
                    <label>Square Height</label>
                    <input 
                      onChange={(e) => setUserSquareHeight((prevData) => ({
                        ...prevData,
                        squareHeight: e.target.value
                      }))}/>
                  </div>
                  
                </div>

              </div>
              
            </div>

            <div className='col-3 row'>
              <DiceRoller/>
            </div>
          </div>
          
  
          <div className={`host-popout ${popout === 0 ? 'active' : ''}`}
              style={{ backgroundColor: 'var(--textGrey)', top: '20%' }}
              onClick={() => handlePopOut(0)}>
              <div className='d-flex' style={{ flex: '1', width: '90%' }}>
                  {popoutContent()}
              </div>
          </div>


          <div className={`host-popout ${lowerPopOut === 1 ? 'active' : ''}`}
              style={{ backgroundColor: 'var(--lightBackgroundGrey)', bottom: '20%' }}
              onClick={() => handleLowerPopOut(1)}> {/* Changed index to 1 */}
              <div className='d-flex' style={{ flex: '1', width: '90%' }}>
                {lowerPopoutContent()}  
              </div>
          </div>
          
        </div>
                    
    </div>
  )
}

export default HostSession