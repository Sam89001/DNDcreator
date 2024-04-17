//CSS
import '../../../css/Components.css'

//Images
import DiceImage from '../../../images/d20.png'

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
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

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

          <div style={{backgroundColor: 'green', width: '91%',}}>
            <div className='row' style={{height: '100%'}}>

              <div className='col-12'>
                <div className='text-center' style={{ display: 'block', width: '100%' }}>Default Characters</div>
                
                <div className='grid-counters-grid'>

                  {stateCharacters.map((character) => (
                    <div key={character.id} className='grid-counters'>
                      <img className='img-fluid' src={character.image} style={{ width:'100%'}} />
                    </div>
                  ))}

                </div>

              </div>

              <div className='col-12'>
                <div className='text-center' style={{ display: 'block', width: '100%'}}>User Uploaded</div>

                <div className='grid-counters-grid'>

                  <div className='grid-counters d-flex justify-content-center align-items-center flex-column'>
                    <img className='img-fluid' src={DiceImage} style={{ width:'70%'}}/>
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
        <div style={{padding: '5px'}}>
          <img className='img-fluid' src={DiceImage} style={{opacity: '0.7'}}></img>
        </div>
      );
    } else {
      return (
        <div>2nd Test</div>
      );
    }
  }

  //Map Functions
  const [userMapSize, setUserMapSize] = useState({
    dimensionOne: '',
    dimensionTwo: ''
  })
  useEffect(() => {
    setUserMapSize({ 
      dimensionOne: '20',
      dimensionTwo: '10'
     });
  }, []);

  const [userSquareHeight, setUserSquareHeight] = useState({
    squareHeight: '',
  })
  useEffect(() => {
    setUserSquareHeight({ squareHeight: '3' });
  }, []);

  function setMapSize() {
  if (!userMapSize.dimensionOne || !userMapSize.dimensionTwo 
    || isNaN(userMapSize.dimensionOne) || isNaN(userMapSize.dimensionTwo)) {
    toast.error('Please include numbers for map size.');
    return null;
  }

  const dimensionOne = parseInt(userMapSize.dimensionOne);
  const dimensionTwo = parseInt(userMapSize.dimensionTwo);

  const totalItems = dimensionOne * dimensionTwo;
  const listItems = [];

  for (let i = 1; i <= totalItems; i++) {
    listItems.push(
      <li key={`item-${i}`} style={{ display: 'inline-block', border: '1px solid grey', margin: 0, padding: 0, textAlign: 'center', width: 'calc(100% / ' + dimensionOne + ')' }}>
        x{i !== totalItems ? ',' : ''} {/* Add comma after each item except the last one */}
      </li>
    );

    // If the current item index is divisible by the dimensionOne, add a line break
    if (i % dimensionOne === 0) {
      listItems.push(<br key={`br-${i}`} />);
    }
  }
  return (
    <Droppable droppableId="droppable">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ backgroundColor: 'transparent', width: '100%', height: '100%', maxHeight: '700px', overflowY: 'hidden' }}
          >
            <ul style={{ padding: 0, margin: 0, fontSize: `${userSquareHeight.squareHeight}vw` }}>
              {listItems}
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
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

            <div className='col-12 d-flex justify-content-center'>
              <div className="spells-field spell-form-titles"> Initiative</div>
            </div>

            <div className='col-12' style={{height: '100%'}}>
              
              {/* List placed in here*/}
              <div style={{height: '100%', maxHeight: '700px'}}>
                <DragDropContext>
                  {setMapSize()}
                </DragDropContext>
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
            <div>
              {lowerPopoutContent()}  
            </div>
        </div>
        
      </div>

    </div>
  )
}

export default HostSession