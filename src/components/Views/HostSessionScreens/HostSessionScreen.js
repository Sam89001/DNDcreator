//CSS
import '../../../css/Components.css'

//Images
import GearIcon from '../../../images/Gear Icon White.png'

//Temp Images
import DiceImage from '../../../images/d20.png'
import SecondDiceImage from '../../../images/d4.png'
import WideMap from '../../../images/wide map.jpg'
import SquareMap from '../../../images/Guard-Post.jpg'
import LongMap from '../../../images/map.jpg'


import UploadArrow from '../../../images/Upload Arrow No BK.png'
import UpArrow from '../../../images/Up Arrow.png'
import RightArrow from '../../../images/Right Arrow.png'
import LeftArrow from '../../../images/Left Arrow.png'

//Components
import Navbar from '../../Layouts/Navbar';
import { UserContext } from '../../../context/userContext';
import DiceRoller from '../../Components/DiceRoller';

//Dependencies
import ReactDOM from 'react-dom';
import { useDrop, useDrag, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast'
import ClipLoader from "react-spinners/ClipLoader";

function HostSession() {

  //Width Slider
  const [gridWidthValue, setGridWidthValue] = useState(100);
  const [mapWidthValue, setMapWidthValue] = useState(50);
  const [gridOpacityValue, setGridOpacityValue] = useState(0.5)
  const [gridColour, setGridColour] = useState({
    redValue: '',
    greenValue: '',
    blueValue: ''
  })
  const gridSliderChange = (event) => {
    setGridWidthValue(parseInt(event.target.value));
  };
  const gridOpacitySliderChange = (event) => { 
    setGridOpacityValue( parseFloat(event.target.value));
  };
  const mapSliderChange = (event) => {
    setMapWidthValue(parseInt(event.target.value));
  };

  const gridInputChange = (event) => {
    let newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) {
      if (newValue < 1) {
        newValue = 1;
      } else if (newValue > 100) {
        newValue = 100;
      }
      setGridWidthValue(newValue);
    }
  };
  const gridOpacityInputChange = (event) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 1) {
      setGridOpacityValue(newValue);
    }
  };
  const mapInputChange = (event) => {
    let newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) {
      if (newValue < 1) {
        newValue = 1;
      } else if (newValue > 100) {
        newValue = 100;
      }
      setMapWidthValue(newValue);
    }
  };
  
  //Default Map Size & Colour
  const [userMapSize, setUserMapSize] = useState({
    dimensionOne: '',
    dimensionTwo: ''
  })
  //Size
  useEffect(() => {
    setUserMapSize({ 
      dimensionOne: '10',
      dimensionTwo: '10'
    });
  }, []);
  //Colour
  useEffect(() => {
    setGridColour({
      redValue: 255,
      greenValue: 255,
      blueValue: 255
    })
  }, [])


  // State for dropped items
  const [droppedItems, setDroppedItems] = useState([]);
  const droppableCharacters = [
    {
      id: 'defaultMage',
      uniqueId: null,
      image: DiceImage,
      name: 'Mage',
      userName: '',
      Hp: '',
      MaxHp: '',
      content: 'Mage Content'
    },
    {
      id: 'defaultBarb',
      uniqueId: null,
      image: SecondDiceImage,
      name: 'Barbarian',
      userName: '',
      Hp: '',
      MaxHp: '',
      content: 'Barbarian Content'
    }
    
  ]
  const [stateCharacters, setStateCharacters] = useState(droppableCharacters)

  function generateUniqueId(itemId) {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
    return `${itemId}-${timestamp}-${random}`;
  }
  
  // Function to handle drop
  const handleDrop = (item, squareIndex) => {
    const existingItemIndex = droppedItems.findIndex((droppedItem) => droppedItem.uniqueId === item.uniqueId);
  
    // Check if there's already an item in the square
    const squareOccupied = droppedItems.some((droppedItem) => droppedItem.index === squareIndex);

    // If the square is already occupied, show an error message and return
    if (squareOccupied) {
      toast.error('This square is already occupied!');
      return;
    }
  
    if (existingItemIndex !== -1) {
      // If the item exists, update its position
      const updatedItems = [...droppedItems];
      updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], index: squareIndex };
      setDroppedItems(updatedItems);
    } else {
      // If the item does not exist, add it with the generated unique ID
      setDroppedItems((prevItems) => [
        ...prevItems,
        {
          ...item,
          uniqueId: generateUniqueId(item.id),
          index: squareIndex,
        },
      ]);
    }
};

  
  //Map Generation
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

    return (
      <DndProvider backend={HTML5Backend}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${dimensionOne}, 1fr)`,
            gridTemplateRows: `repeat(${dimensionTwo}, 1fr)`,
            gap: '0px',
            padding: 0,
            margin: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {/* Render DroppableSquare components */}
          {Array.from({ length: dimensionOne * dimensionTwo }, (_, index) => (
            <DroppableSquare key={`item-${index}`} onDrop={handleDrop} droppedItems={droppedItems} squareIndex={index} />
          ))}
        </div>
      </DndProvider>
    );
  }

  //Dropppable Grid Generation
  function DroppableSquare({ onDrop, droppedItems, squareIndex }) {
    const [{ isOver }, drop] = useDrop({
      accept: 'DRAGGABLE_ITEM_TYPE',
      drop: (item) => onDrop(item, squareIndex),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    // Filter dropped items to only include those belonging to this square
    const itemsInSquare = droppedItems.filter((item) => item.index === squareIndex);

    return (
      <div
        ref={drop}
        className='droppable-area'
        style={{
          border: `1px solid rgba(${gridColour.redValue}, ${gridColour.greenValue}, ${gridColour.blueValue}, ${gridOpacityValue})`,
          boxSizing: 'border-box',
          width: '100%',
          height: '100%',
          backgroundColor: isOver ? 'lightblue' : 'transparent',
          position: 'relative',
        }}
      >
        {/* Render dropped items within the square */}
        {itemsInSquare.map((item) => (
          <DraggableGridItem key={item.id} item={item} />
        ))}
      </div>
    );
  }

  function DraggableGridItem({ item }) {
    const [{ isDragging }, drag] = useDrag({
      type: 'DRAGGABLE_ITEM_TYPE',
      item: { id: item.id, type: 'character', name: item.name, image: item.image, uniqueId: item.uniqueId },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
          position: 'relative',
          height: '100%',
          backgroundColor: 'var(--textGrey)',
          borderRadius: '50%',
        }}
      >
        <div className='d-flex justify-content-center align-items-center'>
          <img className='img-fluid' src={item.image} style={{ width: '50%' }} alt={item.name} />
        </div>
        {!isDragging && (
          <div style={{ fontSize: '1.3vw', position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '3px' }}>20/20</div>
        )}
      </div>
    );
  }

  function DraggableCharacter({ character }) {
    const [{ isDragging }, drag] = useDrag({
      type: 'DRAGGABLE_ITEM_TYPE',
      item: { 
        id: character.id, 
        uniqueId: character.uniqueId, 
        type: 'character', 
        name: character.name, 
        image: character.image 
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
  
    return (
      <div
        className='grid-counters'
        ref={drag} // Attach the drag ref to make the element draggable
        style={{
          opacity: isDragging ? 0.5 : 1, // Change opacity when dragging
        }}
      >
        <img className='img-fluid' src={character.image} style={{ width: '100%' }} alt={character.name} />
      </div>
    );
  }
  

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

          <div style={{width: '91.5%', zIndex: '100'}} onClick={(e) => e.stopPropagation()}>
            <div className='row' style={{height: '100%'}}>

              <div className='col-12'>
                <div className='text-center' style={{ display: 'block', width: '100%' }}>Default Characters</div>
                
                <div className='grid-counters-grid'>
                  {stateCharacters.map((character, index) => (
                    <DraggableCharacter key={character.id} character={character} />
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

          <div style={{width: '8.5%', height: '50%'}}>
            <div className='d-flex align-items-center justify-content-center'  style={{width: '100%', height: '100%'}}>
              <img className='img-fluid' src={RightArrow}></img>
            </div>
          </div>

        </div>
      );
    }
  }
  function lowerPopoutContent() {
    if(lowerPopOut == null) {
      return (
        <div className='d-flex justify-content-center align-items-center' style={{padding: '5px'}}>
          <img className='img-fluid' src={GearIcon} style={{opacity: '0.7'}}></img>
        </div>
      );
    } else {
      return (
        <div className='d-flex flex-row' style={{height: '100%', width: '100%', padding: '10px'}}>

           <div className='d-flex flex-column' style={{width: '91.5%', zIndex: '100'}} onClick={(e) => e.stopPropagation()}>

              <div style={{fontSize: '1.5vw', paddingBottom: '10px'}}>Grid Settings</div>
              {/* Grid Height and Width*/}
              <div className='d-flex flex-row' style={{paddingBottom: '5px'}}>
                <label>Width</label>
                <input 
                    style={{width: '5vw', height: '3vh'}}
                    onChange={(e) => setUserMapSize((prevData) => ({
                      ...prevData,
                      dimensionOne: e.target.value
                    }))}
                />
              
                <label>Height</label>
                <input 
                  style={{width: '5vw', height: '3vh'}}
                          onChange={(e) => setUserMapSize((prevData) => ({
                            ...prevData,
                            dimensionTwo: e.target.value
                  }))}
                />
              </div>
              
              {/* Grid Size*/}
              <div className='d-flex flex-row' style={{paddingBottom: '5px'}}>
                <label>Choose Grid Width:</label>
                <input type="range" value={gridWidthValue} onChange={gridSliderChange} style={{width: '8vw', height: '3vh'}}/>
                <input type="number" value={gridWidthValue} onChange={gridInputChange} style={{width: '5vw', height: '3vh'}}/>
              </div>
              
              {/* Grid Opacity*/}
              <div className='d-flex flex-row' style={{paddingBottom: '5px'}}>
                <label>Choose Grid Opacity:</label>
                <input type="range" min="0" max="1" step="0.01" value={gridOpacityValue} onChange={gridOpacitySliderChange} style={{width: '8vw', height: '3vh'}}/>
                <input type="number" min="0" max="1" step="0.01" value={gridOpacityValue} onChange={gridOpacityInputChange} style={{ width: '5vw', height: '3vh' }}/>
              </div>
              
              {/* Grid Colour*/}
              <div className='d-flex flex-row' style={{paddingBottom: '5px'}}>
                <label>Choose Grid Colour:</label>
                <select onChange={(e) => setGridColour({
                  redValue: e.target.options[e.target.selectedIndex].getAttribute('value'),
                  greenValue: e.target.options[e.target.selectedIndex].getAttribute('value2'),
                  blueValue: e.target.options[e.target.selectedIndex].getAttribute('value3')
                })}>
                  <option value="255" value2="255" value3="255">White</option>
                  <option value="255" value2="0" value3="0">Red</option>

                  <option value="144" value2="238" value3="144">Light Green</option>
                  <option value="0" value2="255" value3="0">Green</option>

                  <option value="173" value2="216" value3="230">Light Blue</option>
                  <option value="0" value2="0" value3="255">Dark Blue</option>
                </select>
              </div>

              <div style={{fontSize: '1.5vw', paddingBottom: '10px'}}>Image Settings</div>

              {/* Image Size*/}
              <div className='d-flex flex-row' style={{paddingBottom: '5px'}}>
                <label>Choose Image Width:</label>
                <input type="range" value={mapWidthValue} onChange={mapSliderChange} style={{width: '8vw', height: '3vh'}}/>
                <input type="number" value={mapWidthValue} onChange={mapInputChange} style={{width: '5vw', height: '3vh'}}/>
              </div>
           </div>

           <div style={{ width: '8.5%', height: '100%'}}>

              <div style={{width: '100%', height: '50%'}}>{/* Leave blank*/}</div>
              <div className='d-flex align-items-center justify-content-center' style={{width: '100%', height: '50%'}}>
                <img className='img-fluid' src={RightArrow}></img>
              </div>

            </div>

        </div>
      );
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
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
                <div className='d-flex justify-content-center align-items-center' style={{ height: '100%', maxHeight: '67vh', marginBottom: '10px', position: 'relative', overflow: 'hidden' }}>
                  {/* Map */}
                  <img src={WideMap} style={{ width: `${mapWidthValue}%`, objectFit: 'cover', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                  
                  {/* Grid */}
                  <div style={{ width: `${gridWidthValue}%`, height: '100%', zIndex: 1 }}>
                    {setMapSize()} 
                  </div>
                </div>

                <div className='d-flex flex-row'>
                  <div className='d-flex flex-row '>
                               
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
    </DndProvider>
  )
}

export default HostSession