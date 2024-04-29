//CSS
import '../../../css/Components.css'

//Images

//Icons
import GearIcon from '../../../images/Gear Icon Lightest.png'
import UploadArrow from '../../../images/Upload Arrow No BK.png'
import UpArrow from '../../../images/Up Arrow.png'
import RightArrow from '../../../images/Right Arrow.png'
import LeftArrow from '../../../images/Left Arrow.png'

//Backgrounds
import TavernMap from '../../../images/tavern-map.png'
import CaveMap from '../../../images/cave-map.png'
import BeachMap from '../../../images/beach-map.jpg'
import DockMap from '../../../images/dock-map.png'
import CampMap from '../../../images/camp-map.jpg'
import ForestMap from '../../../images/forest-map.png'
import EmptyFieldMap from '../../../images/empty-field-map.png'
import GraveyardMap from '../../../images/graveyard-map.png'
import CastleMap from '../../../images/castle-map.jpg'
import HellMap from '../../../images/hell-map.jpg'
import HellDungeonMap from '../../../images/hell-dungeon-map.png'
import VolcanoMap from '../../../images/volcano-map.png'

//Temp Images
import DiceImage from '../../../images/d20.png'
import SecondDiceImage from '../../../images/d4.png'

//Components
import Navbar from '../../Layouts/Navbar';
import { UserContext } from '../../../context/userContext';
import DiceRoller from '../../Components/DiceRoller';
import CounterPopUp from '../../Components/HostSession/CounterPopUp'

//Dependencies
import { useDrop, useDrag, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast'
import ClipLoader from "react-spinners/ClipLoader";

function HostSession() {

  //Initiative
  const [turnNumber, setTurnNumber] = useState(0);
  const [pointer, setPointer] = useState(0);
  const [initiativeState, setInitiativeState] = useState([]);
  useEffect(() => {
    let initiativeArray = [
      {
        name: 'John',
        initiative: 20
      },
      {
        name: 'Mark',
        initiative: 12
      },
      {
        name: 'Steve',
        initiative: 1
      },
      {
        name: 'Janis',
        initiative: 16
      },
      {
        name: 'Amy',
        initiative: 8
      }
    ];

    function bubbleSort(array) {
      const arrayLength = array.length;
      for (let leftSort = 0; leftSort < arrayLength - 1; leftSort++) {
          for (let rightSort = 0; rightSort < arrayLength - leftSort - 1; rightSort++) {
              if (array[rightSort].initiative < array[rightSort + 1].initiative) {
                  // Swap array[rightSort] and array[rightSort + 1]
                  const temp = array[rightSort];
                  array[rightSort] = array[rightSort + 1];
                  array[rightSort + 1] = temp;
              }
          }
      }
      return array;
    }

    let sortedArray = bubbleSort(initiativeArray);
    setInitiativeState(sortedArray); // Update the state with the sorted array
  }, []); 

  function leftInitiative() {
    setPointer(prevPointer => {
      if (prevPointer === 0) {
        setTurnNumber(prevTurnNumber => --prevTurnNumber);
        return initiativeState.length - 1;
      } else {
        return prevPointer - 1;
      }
    });
  }
  
  function rightInitiative() {
    setPointer(prevPointer => {
      if (prevPointer === initiativeState.length - 1) {
        setTurnNumber(prevTurnNumber => ++prevTurnNumber);
        return 0;
      } else {
        return prevPointer + 1;
      }
    });
  }
  
  
  function rightInitiative() {
    setPointer(prevPointer => {
      if (prevPointer === initiativeState.length - 1) {
        setTurnNumber(prevTurnNumber => ++prevTurnNumber);
        return 0;
      } else {
        return prevPointer + 1;
      }
    });
  }
  

  //Grid & Image Sliders
  const [gridWidthValue, setGridWidthValue] = useState(100);
  const [gridOpacityValue, setGridOpacityValue] = useState(0.2)
  const [gridColour, setGridColour] = useState({
    redValue: '',
    greenValue: '',
    blueValue: ''
  })
  const [mapWidthValue, setMapWidthValue] = useState(75);
  const [mapRotationValue, setMapRotationValue] = useState(0);
  const [defaultMapImage, setDefaultMapImage] = useState(TavernMap)
  const gridSliderChange = (event) => {
    setGridWidthValue(parseInt(event.target.value));
  };
  const gridOpacitySliderChange = (event) => { 
    setGridOpacityValue( parseFloat(event.target.value));
  };
  const mapSliderChange = (event) => {
    setMapWidthValue(parseInt(event.target.value));
  };
  const mapRotationSliderChange = (event) => {
    setMapRotationValue(parseInt(event.target.value));
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
  const mapRotateInputChange = (event) => {
    let newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) {
      newValue = newValue < 0 ? 0 : newValue > 360 ? 360 : newValue;
      setMapRotationValue(newValue);
    }
  };
  

  const MapChange = (event) => {
    const selectedMap = event.target.value;
    
    switch (selectedMap) {
        case 'TavernMap':
            setDefaultMapImage(TavernMap);
            break;
        case 'CaveMap':
            setDefaultMapImage(CaveMap);
            break;
        case 'BeachMap':
            setDefaultMapImage(BeachMap);
            break;
        case 'DockMap':
            setDefaultMapImage(DockMap);
            break;
        case 'CampMap':
            setDefaultMapImage(CampMap);
            break;
        case 'ForestMap':
            setDefaultMapImage(ForestMap);
            break;
        case 'EmptyFieldMap':
            setDefaultMapImage(EmptyFieldMap);
            break;
        case 'GraveyardMap':
            setDefaultMapImage(GraveyardMap);
            break;
        case 'CastleMap':
            setDefaultMapImage(CastleMap);
            break;
        case 'HellMap':
            setDefaultMapImage(HellMap);
            break;
        case 'HellDungeonMap':
            setDefaultMapImage(HellDungeonMap);
            break;
        case 'VolcanoMap':
            setDefaultMapImage(VolcanoMap);
            break;
        default:
            setDefaultMapImage(TavernMap); 
            break;
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
      dimensionOne: '20',
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
  const defaultCharacters = [
    {
      id: 'defaultMage',
      uniqueId: null,
      image: DiceImage,
      name: 'Mage',
      userName: '',
      currentHp: '',
      maxHp: '',
      content: 'Mage Content',
      auraSize: 75
    },
    {
      id: 'defaultBarb',
      uniqueId: null,
      image: SecondDiceImage,
      name: 'Barbarian',
      userName: '',
      currentHp: '',
      maxHp: '',
      content: 'Barbarian Content',
      auraSize: 75
    },
    
    
  ]
  const defaultEnemyCharacters = [
    {
      id: 'defaultGoblin',
      uniqueId: null,
      image: DiceImage,
      name: 'Goblin',
      userName: '',
      currentHp: '',
      maxHp: '',
      content: 'Goblin Content'
    },
    {
      id: 'defaultWolf',
      uniqueId: null,
      image: SecondDiceImage,
      name: 'Wolf',
      userName: '',
      currentHp: '',
      maxHp: '',
      content: 'Wolf Content'
    },
    
    
  ]
  const [placeCharacterPopup, setPlaceCharacterPopup] = useState(null);
  const [editCharacterPopup, setEditCharacterPopup] = useState(null);
  const [placedCharacterTemporaryData, setPlacedCharacterTemporaryData] = useState({
    characterName: '',
    characterMaxHp: ''
  })

  //Used to update counter values
  const [placeCharacteryEditableValues, setPlaceCharacteryEditableValues] = useState({
    auraSize: '',
    uniqueId: ''
  })

  function generateUniqueId(itemId) {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000); 
    return `${itemId}-${timestamp}-${random}`;
  }

  // Function to handle drop

  //Popout to Grid Draggable item
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
      <div className='grid-counters' ref={drag} style={{ opacity: isDragging ? 0.5 : 1, backgroundColor: 'var(--inputGrey)', zIndex: '100'}}>
        <img className='img-fluid' src={character.image} style={{ width: '100%' }} alt={character.name} />
      </div>
    );
  }

  // Error here where information submitted is a state behind
  const handleDrop = (item, squareIndex) => {
    const existingItemIndex = droppedItems.findIndex((droppedItem) => droppedItem.uniqueId === item.uniqueId);
    const isSquareOccupied = droppedItems.some((droppedItem) => droppedItem.index === squareIndex);

    // Check if the square is occupied
    if (isSquareOccupied) {
      toast.error('Error: This square is already occupied!');
      return;
    }
    // Check if the piece is already on the grid
    const pieceOnGrid = existingItemIndex !== -1;
    // If the piece is already on the grid, return without showing the popup
    if (pieceOnGrid) {
      if (existingItemIndex !== -1) {
        const updatedItems = [...droppedItems];
        updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], index: squareIndex };
        setDroppedItems(updatedItems);
      } else {
        setDroppedItems((prevItems) => [
          ...prevItems,
          {
            ...item,
            uniqueId: generateUniqueId(item.id),
            index: squareIndex,
            userName: placedCharacterTemporaryData.characterName,
            characterMaxHp: placedCharacterTemporaryData.characterMaxHp,
            currentHp: placedCharacterTemporaryData.characterMaxHp,
            auraSize: 75
          },
        ]);
      }
      return; // Exit the function early if the piece is already on the grid
    }

    // If the piece is not on the grid, show the popup
    const submissionCheck = new Promise((resolve, reject) => {
      const handleClose = () => {
        reject(new Error('Popup closed'));
      };

      const handleSubmit = () => {
        resolve();
      };
      document.querySelector('.close-place-character-popup').addEventListener('click', handleClose);
      document.querySelector('.submit-place-character-popup').addEventListener('click', handleSubmit);

      return () => {
        document.querySelector('.close-place-character-popup').removeEventListener('click', handleClose);
        document.querySelector('.submit-place-character-popup').removeEventListener('click', handleSubmit);
      };
    });
    setPlaceCharacterPopup(true);
    submissionCheck
      .then(() => {
        setDroppedItems((prevItems) => {
          const updatedItems = [
            ...prevItems,
            {
              ...item,
              uniqueId: generateUniqueId(item.id),
              index: squareIndex,
              userName: placedCharacterTemporaryData.characterName,
              characterMaxHp: placedCharacterTemporaryData.characterMaxHp,
              currentHp: placedCharacterTemporaryData.characterMaxHp,
              auraSize: 75
            },
          ];
          setPlaceCharacterPopup(null);
          return updatedItems;
        });
      })
      .catch((error) => {
        setPlaceCharacterPopup(null);
        console.error(error); 
      });
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
            zIndex: '50'
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
          zIndex: '100'
        }}
      >
        {/* Render dropped items within the square */}
        {itemsInSquare.map((item) => (
          <DraggableGridItem key={item.id} item={item} />
        ))}
      </div>
    );
  }

  //Grid Draggable Item
  function DraggableGridItem({ item }) {
    const [{ isDragging }, drag] = useDrag({
      type: 'DRAGGABLE_ITEM_TYPE',
      item: {
        id: item.id,
        type: 'character',
        name: item.name,
        image: item.image,
        uniqueId: item.uniqueId,
        userName: item.userName,
        maxHp: item.maxHp,
        currentHp: item.currentHp,
        auraSize: item.auraSize 
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
  
    // Loads edit pop up
    const [clickCount, setClickCount] = useState(0);
    const handleMouseDown = () => {
      setClickCount((prevCount) => prevCount + 1);
      if (clickCount === 1) {
        setEditCharacterPopup(1);
        setPlaceCharacteryEditableValues({
          auraSize: item.auraSize,
          uniqueId: item.uniqueId
        })
      }
    };
    const handleMouseUp = () => {
      setTimeout(() => {
        setClickCount(0);
      }, 300); 
    };
  
    return (
      <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} style={{height: '100%', position: 'relative'}}>
        <div className='d-flex justify-content-center align-items-center draggable-counter-container' ref={drag} style={{ opacity: isDragging ? 0.5 : 1, zIndex: '50' }}>
          <div className='d-flex justify-content-center align-items-center'>
            <img className='img-fluid' src={item.image} style={{ width: '60%', zIndex: '50' }} alt={item.name} />
          </div>
        </div>
  
        {!isDragging && (
          <div style={{ fontSize: '1.3vw', position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', zIndex: '5' }}>Test</div>
          )}
        <div className='counter-aura' style={{ border: '1px solid red', width: item.auraSize, height: item.auraSize }}></div>
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

          <div style={{width: '91.5%', zIndex: '100', padding: '10px'}} onClick={(e) => e.stopPropagation()}>
            <div className='row' style={{height: '100%', width: '100%', overflowX: 'auto'}}>

              {/* Default Classes*/}
              <div className='col-12'>
                <div className='text-center' style={{ display: 'block', width: '100%' }}>Default Characters</div>
                <div className='grid-counters-grid'>
                  {defaultCharacters.map((character, index) => (
                    <DraggableCharacter key={character.id} character={character} style={{ zIndex: '25'}}/>
                  ))}
                </div>
              </div>
              
              {/* Enemy Classes*/}
              <div className='col-12'>
                <div className='text-center' style={{ display: 'block', width: '100%'}}>Enemy Classes</div>

                <div className='grid-counters-grid'>
                  {defaultEnemyCharacters.map((character) => (
                    <div key={character.id} className='grid-counters' style={{backgroundColor: 'darkred'}}>
                      <img className='img-fluid' src={character.image} style={{ width:'100%'}}/>
                    </div>
                  ))}
                </div>

              </div>

              {/* Effect Classes*/}
              <div className='col-12'>
                <div className='text-center' style={{ display: 'block', width: '100%'}}>Field Effects</div>

                <div className='grid-counters-grid'>

                  {defaultCharacters.map((character) => (
                    <div key={character.id} className='grid-counters' style={{backgroundColor: 'darkred'}}>
                      <img className='img-fluid' src={character.image} style={{ width:'100%'}}/>
                    </div>
                  ))}

                </div>

              </div>
              
              {/* User Uploaded Classes*/}
              <div className='col-12'>
                <div className='text-center' style={{ display: 'block', width: '100%'}}>User Uploaded Player</div>

                <div className='grid-counters-grid'>

                  <div className='grid-counters d-flex justify-content-center align-items-center flex-column'>
                    <img className='img-fluid' src={UploadArrow} style={{ width:'70%'}}/>
                    <div className='text-center' style={{fontSize: '1.5vh'}}>Upload</div>
                  </div>
                  
                  {/* Will need to be a state */}
                  {defaultCharacters.map((character) => (
                    <div key={character.id} className='grid-counters' style={{backgroundColor: 'var(--inputGrey)' }}>
                      <img className='img-fluid' src={character.image} style={{ width:'100%'}}/>
                    </div>
                  ))}

                </div>

              </div>

              {/* User Uploaded Enemy*/}
              <div className='col-12'>
                <div className='text-center' style={{ display: 'block', width: '100%'}}>User Uploaded Enemy</div>

                <div className='grid-counters-grid'>

                  <div className='grid-counters d-flex justify-content-center align-items-center flex-column'>
                    <img className='img-fluid' src={UploadArrow} style={{ width:'70%'}}/>
                    <div className='text-center' style={{fontSize: '1.5vh'}}>Upload</div>
                  </div>
                  
                  {/* Will need to be a state */}
                  {defaultCharacters.map((character) => (
                    <div key={character.id} className='grid-counters' style={{backgroundColor: 'darkred'}}>
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

              <div style={{padding: '0px 30px 10px 10px', overflowY: 'auto'}}>
                
                <div className='grid-popout-titles'>
                  <div style={{borderBottom: '1px solid rgba(255,255,255,0.5)'}}>Grid Settings</div>
                </div>

                {/* Grid Height and Width*/}
                <div className='d-flex flex-row ' style={{paddingBottom: '5px', width: '100%'}}>
                  <div style={{paddingRight: '2vw'}}>
                    <label>Width: &nbsp;</label>
                    <input 
                      className='grid-popout-input-box text-center'
                      value={userMapSize.dimensionOne} 
                      onChange={(e) => setUserMapSize((prevData) => ({
                        ...prevData,
                        dimensionOne: e.target.value
                      }))}
                    />
                  </div>

                  <div>
                    <label>Height: &nbsp;</label>
                      <input 
                        className='grid-popout-input-box text-center'
                        value={userMapSize.dimensionTwo} 
                        onChange={(e) => setUserMapSize((prevData) => ({
                          ...prevData,
                          dimensionTwo: e.target.value
                        }))}
                      />
                  </div>      
                  
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
                <div className='d-flex flex-row' style={{paddingBottom: '20px'}}>
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

                <div className='grid-popout-titles'>
                  <div style={{borderBottom: '1px solid rgba(255,255,255,0.5)'}}>Image Settings</div>
                </div>

                {/* Image Size*/}
                <div className='d-flex flex-row' style={{paddingBottom: '5px'}}>
                  <label>Choose Image Width:</label>
                  <input type="range" value={mapWidthValue} onChange={mapSliderChange} style={{width: '8vw', height: '3vh'}}/>
                  <input type="number" value={mapWidthValue} onChange={mapInputChange} style={{width: '5vw', height: '3vh'}}/>
                </div>

                {/* Image Rotation*/}
                <div className='d-flex flex-row' style={{paddingBottom: '5px'}}>
                  <label>Rotate Image:</label>
                  <input type="range" min="0" max="360" value={mapRotationValue} onChange={mapRotationSliderChange} style={{width: '8vw', height: '3vh'}}/>
                  <input type="number" value={mapRotationValue} onChange={mapRotateInputChange} style={{width: '5vw', height: '3vh'}}/>
                </div>

                {/* Default Image Selection*/}
                <div className='d-flex flex-row' style={{paddingBottom: '5px'}}>
                  <label>Choose Default Image:</label>
                  <select onChange={MapChange} style={{fontSize: '0.7vw'}}>
                    <option value='TavernMap'>Tavern</option>
                    <option value='CaveMap'>Cave</option>
                    <option value='BeachMap'>Beach</option>
                    <option value='DockMap'>Dock</option>
                    <option value='CampMap'>Camp</option>
                    <option value='ForestMap'>Forest</option>
                    <option value='EmptyFieldMap'>Empty Field</option>
                    <option value='GraveyardMap'>Graveyard</option>
                    <option value='CastleMap'>Castle</option>
                    <option value='HellMap'>Hell</option>
                    <option value='HellDungeonMap'>Hell Dungeon</option>
                    <option value='VolcanoMap'>Volcano</option>
                  </select>
                </div>

                {/* Save Image to library*/}
                <div className='d-flex flex-row' style={{paddingBottom: '5px'}}>
                  <label>Upload Image to save:</label>
                  <form style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <input className='image-upload-input' type='file' name='avatar'  />
                    <div className='d-flex justify-content-between'>
                      <button className='image-upload-button' type="submit" style={{width: '70%', marginTop: '10px'}}>Upload</button>
                      <button 
                      className='image-upload-button' style={{width: '25%', marginTop: '10px'}}
                      type="button" >Clear</button>
                    </div>
                  </form>
                </div>
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

        <div className="d-flex align-items-center" style={{paddingTop: '85px', maxWidth: '100vw', minWidth: '1500px', height: '97vh', }}>

          <div className='row mx-auto justify-content-center' style={{height: '100%', width: '96%'}}  >
            {/* Map */}
            <div className='col-9 row' style={{paddingRight: '2vw'}}>

              <div className='col-12 d-flex justify-content-center align-items-center flex-column' style={{paddingBottom: '20px'}}>

                {/* Initiative */}
                <div className='d-flex flex-row justify-content-center' style={{ width: '100%', paddingBottom: '10px' }}>

                  <div className='initiative-box d-flex justify-content-end align-items-center' style={{fontSize: '1.5vw'}}>
                    Turn Num: {turnNumber}
                  </div>

                  <div className='initiative-box d-flex justify-content-end align-items-center'>
                    <img className='img-fluid arrow-image' src={LeftArrow} onClick={leftInitiative}/>
                  </div>

                  <div className='initiative-box d-flex justify-content-center align-items-center'>
                    {initiativeState.length > 0 && (
                      <span>
                        {initiativeState[(pointer - 2 + initiativeState.length) % initiativeState.length].name} ({initiativeState[(pointer - 2 + initiativeState.length) % initiativeState.length].initiative})
                      </span>
                    )}
                  </div>

                  <div className='initiative-box d-flex justify-content-center align-items-center'>
                    {initiativeState.length > 0 && (
                      <span>
                        {initiativeState[(pointer - 1 + initiativeState.length) % initiativeState.length].name} ({initiativeState[(pointer - 1 + initiativeState.length) % initiativeState.length].initiative})
                      </span>
                    )}
                  </div>

                  <div className='turn-player-box d-flex justify-content-center align-items-center'>
                    {initiativeState.length > 0 && (
                      <span>
                        {initiativeState[pointer].name} ({initiativeState[pointer].initiative})
                      </span>
                    )}
                  </div>
                  
                  <div className='initiative-box d-flex justify-content-center align-items-center'>
                    {initiativeState.length > 0 && (
                      <span>
                        {initiativeState[(pointer + 1) % initiativeState.length].name} ({initiativeState[(pointer + 1) % initiativeState.length].initiative})
                      </span>
                    )}
                  </div>

                  <div className='initiative-box d-flex justify-content-center align-items-center'>
                    {initiativeState.length > 0 && (
                      <span>
                        {initiativeState[(pointer + 2) % initiativeState.length].name} ({initiativeState[(pointer + 2) % initiativeState.length].initiative})
                      </span>
                    )}
                  </div>

                  <div className='initiative-box d-flex justify-content-start align-items-center'>
                    <img className='img-fluid arrow-image' src={RightArrow} onClick={rightInitiative}/>
                  </div>

                  <div className='initiative-box d-flex justify-content-start align-items-center'>
                  </div>

                </div>

                {/* Settings & Indicator */}
                <div className='d-flex flex-row justify-content-space-between' style={{width: '100%'}}>

                  <div className='d-flex flex-row justify-content-center align-items-center'>
                    <div className='text-center' style={{fontSize: '2vh', color: 'var(--textLightGrey)'}}>Initiative Settings</div>
                    <img className='img-fluid initiative-settings-icon' src={GearIcon}></img>
                  </div>

                  <div className="d-flex justify-content-center align-items-center flex-column" style={{ width: '100%'}}> 
                    <img className='img-fluid' src={UpArrow} style={{height: '1vh', width: '2vh'}}></img>
                    <div className='initiative-box text-center' style={{fontSize: '2.3vh', color: 'var(--textLightGrey)'}}>Turn Player</div>
                  </div>

                  <div style={{width: '12%'}}>Action Tracker Here</div>

                </div>
                
              </div>

              <div className='col-12' style={{height: '100%'}}>
        
                {/* List placed in here*/}                
                <div className='d-flex justify-content-center align-items-center' 
                style={{ height: '100%', maxHeight: '67vh', marginBottom: '10px', position: 'relative', overflow: 'hidden' }}>

                  {/* Map */}
                  <img src={defaultMapImage} 
                  style={{
                    width: `${mapWidthValue}%`,
                    transform: `translate(-50%, -50%) rotate(${mapRotationValue}deg)`,
                    transformOrigin: 'center',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    // Adjust positioning to center the image after rotation
                    // transform: 'translate(-50%, -50%)' // Remove this line if using transformOrigin
                  }} />
                  
                  {/* Grid */}
                  <div style={{ width: `${gridWidthValue}%`, height: '100%', zIndex: 100 }}>
                    {setMapSize()} 
                  </div>
                </div>

                <div className='d-flex flex-row'>
                  <div className='d-flex flex-row '>
                               
                  </div>
                </div>

              </div>
              
            </div>
            
            {/* Dice Roller */}
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

        {/*Place Popup */}
        <div className={`d-flex align-items-center flex-column place-character-popup ${placeCharacterPopup !== null ? 'active' : ''}`}>
          <div className='d-flex flex-end' style={{width: '100%'}}>
            <button className='close-place-character-popup' >X</button>
          </div>

          <div>Character Information</div>

          <div>
            <label>Character Name</label>
            <input
            onChange={(e) =>
              setPlacedCharacterTemporaryData((prevData) => ({
                ...prevData,
                characterName: e.target.value,
              }))
            }/>
          </div>

          <div>
            <label>Character Max Health</label>
            <input
            onChange={(e) =>
              setPlacedCharacterTemporaryData((prevData) => ({
                ...prevData,
                characterMaxHp: e.target.value,
              }))
            }/>
          </div>

          <button className='submit-place-character-popup'>Submit</button>

        </div>

        <CounterPopUp editCharacterPopup={editCharacterPopup} setEditCharacterPopup={setEditCharacterPopup} 
        placeCharacteryEditableValues={placeCharacteryEditableValues} droppedItems={droppedItems} 
        setDroppedItems={setDroppedItems} />

    </div>
    </DndProvider>
  )
}

export default HostSession