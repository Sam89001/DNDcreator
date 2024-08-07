import '../../../css/Site.css';
import '../../../css/Animations.css';
import '../../../css/Components.css';

//Images
import DndSheetImage from '../../../images/sheet3.png'
import QuestionMarkImage from '../../../images/Question Mark Graphic.png'

//Dependencies
import React, { useState } from 'react';

function DndSheetThree({updateCharacterOrganisation,

	characterName, characterAge, characterEyes, characterHair, 
	characterHeight, characterSkin, characterWeight,
	characterTextAppearence, characterBackstory,
	profileImage, bodyImage, 
	characterOrganisationSymbol, characterTreasure}) {

    const [characterSymbol, setCharacterSymbol] = useState({
      characterSymbolName: '',
      characterSymbolDescription: ''
    });
    const [selectedId, setSelectedId] = useState({
      selectedId: ''
    });
  
    const handleSelectChange = (e) => {
      const selectedId = e.target.value; 
      setSelectedId({ selectedId: selectedId });
  
      //finds and updates the fields
      const loadedValue = updateCharacterOrganisation.find(value => value._id === selectedId);
      setCharacterSymbol({
        ...characterSymbol,
        characterSymbolName: loadedValue ? loadedValue.characterOrganisationName : '',
        characterSymbolDescription: loadedValue ? loadedValue.characterOrganisationDescription : ''
      });
    }; 

  return (
    <div className='container' style={{ position: 'relative', minWidth: '500px',}}>

      {/* Name */}
      <div className="absolute-div dnd-sheet" style={{ overflowY: 'auto', paddingBottom: '15px', whiteSpace: 'nowrap', top: '7.7%', left: '10%', width: '30%', height: '5%', fontSize: '1.1vw' }}>
        <div>{characterName}</div>
      </div>

      {/* Age*/}
      <div className="absolute-div dnd-sheet" style={{   overflowY: 'auto', paddingBottom: '10px', whiteSpace: 'nowrap', top: '5.6%', left: '44%', width: '12%', height: '4%', fontSize: '0.8vw' }}>
        <div>{characterAge}</div>
      </div>

      {/* Height*/}
      <div className="absolute-div dnd-sheet" style={{  overflowY: 'auto', paddingBottom: '10px', whiteSpace: 'nowrap', top: '5.6%', left: '60.5%', width: '11%', height: '4%', fontSize: '0.8vw' }}>
        <div>{characterHeight}</div>
      </div>

      {/* Weight*/}
      <div className="absolute-div dnd-sheet" style={{  overflowY: 'auto', paddingBottom: '10px', whiteSpace: 'nowrap', top: '5.6%', left: '75%', width: '11%', height: '4%', fontSize: '0.8vw' }}>
        <div>{characterWeight}</div>
      </div>

      {/* Eyes*/}
      <div className="absolute-div dnd-sheet" style={{  overflowY: 'auto', paddingBottom: '10px', whiteSpace: 'nowrap', top: '9%', left: '44%', width: '12%', height: '4%', fontSize: '0.8vw' }}>
        <div>{characterEyes}</div>
      </div>

      {/* Skin*/}
      <div className="absolute-div dnd-sheet" style={{  overflowY: 'auto', paddingBottom: '10px', whiteSpace: 'nowrap', top: '9%', left: '60.5%', width: '11%', height: '4%', fontSize: '0.8vw' }}>
        <div>{characterSkin}</div>
      </div>

      {/* Hair */}
      <div className="absolute-div dnd-sheet" style={{   overflowY: 'auto', paddingBottom: '10px', whiteSpace: 'nowrap', top: '9%', left: '75%', width: '11%', height: '4%', fontSize: '0.8vw' }}>
        <div>{characterHair}</div>
      </div>

      {/* Character Appearence */}
      <div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', top: '16.5%', left: '8%', width: '24.5%', height: '28%', fontSize: '0.8vw' }}>
        <div>{characterTextAppearence}</div>
      </div>

      {/* Character Backstory */}
      <div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', top: '49%', left: '8%', width: '24.5%', height: '47%', fontSize: '0.8vw' }}>
        <div>{characterBackstory}</div>
      </div>

      {/* Character Organisation */}
      <div className="absolute-div dnd-sheet-noflex row" style={{ overflowY: 'auto', top: '16.5%', left: '39%', width: '27%', height: '28%', fontSize: '0.6vw' }}>
        {characterOrganisationSymbol
        .filter(organisation => organisation.type === 'Organisation')
        .map(organisation => (
          <div key={organisation._id} className='col-12 ' style={{padding: '5px 15px 0px 5px'}}>

            <div className='hover-red'> 
              <div className='equipment-title d-flex justify-content-between'>Organisation Name</div>

              <div style={{padding: '0px 0px 10px 10px', overflowX: 'auto'}}>{organisation.characterOrganisationName}</div>

              <div className='equipment-title'>Organisation Description</div>
              <div style={{padding: '0px 0px 10px 10px', borderBottom: 'solid 1px var(--lightBackgroundGrey)', wordWrap: 'break-word'}}>
                {organisation.characterOrganisationDescription}</div>
            </div>

          </div>
        ))}

      </div>

      {/* Character Symbol*/}
      <div className="absolute-div dnd-sheet-noflex" style={{ top: '19.3%', left: '68%', 
      width: '24%', height: '16.5%', fontSize: '0.6vw', padding: '0px 20px 0px 0px', overflowY: 'auto' }}>
      
        <select className='edit-character-field' style={{marginBottom: '5px'}} onChange={handleSelectChange}>
          <option/>
          {characterOrganisationSymbol
            .filter(organisation => organisation.type === 'Symbol')
            .map(organisation => ( 
              <option key={organisation._id} value={organisation._id}>{organisation.characterOrganisationName}</option>
          ))}
        </select>
          
        <div className='equipment-title d-flex justify-content-between'>Symbol Description</div>
      
        <div style={{padding: '0px 0px 10px 10px', wordWrap: 'break-word', maxHeight: '90px'}}>{characterSymbol.characterSymbolDescription || ''}</div>
      </div>

      {/* Character Treasure*/}
      <div className="absolute-div dnd-sheet-noflex" 
      style={{ overflow: 'auto', backgroundColor: 'transparent', top: '77%', left: '37%', width: '52%', height: '19%', fontSize: '0.6vw' }}>
        <div className='row'>

          {characterTreasure.map(treasure => (
            <div className='col-12 hover-red' style={{borderBottom: '1px solid var(--lightBackgroundGrey)', marginBottom: '15px'}}> 
              
              <div className='equipment-title' style={{display: 'inline-block', width: '55%', marginRight: '10px', overflowY: 'auto'}}>Treasure Name </div>
              <div className='equipment-title' style={{display: 'inline-block', width: '30%', overflowY: 'auto'}}>Treasure Quantity </div>            

              <div style={{padding: '0px 0px 5px 10px'}}> 
                <div style={{display: 'inline-block', width: '57%', marginRight: '10px', whiteSpace: 'nowrap', overflowY: 'auto', paddingBottom: '15px'}}>{treasure.characterTreasureName}</div>
                <div style={{display: 'inline-block', width: '30%', whiteSpace: 'nowrap', overflowY: 'auto', paddingBottom: '15px'}}>{treasure.characterTreasureQuantity}</div>
              </div>

              <div className='equipment-title d-flex '>Treasure Description </div>

              <div style={{padding: '0px 0px 10px 10px', wordWrap: 'break-word', width: '90%'}}>{treasure.characterTreasureDescription}</div>
            </div>
          ))}

        </div>
      </div>
      
      {/* Character Images*/}
      <div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', backgroundColor: 'transparent', top: '48%', left: '36%', 
      width: '52%', height: '25%', fontSize: '0.6vw', padding: '0px' }}>

        <div className="row">
            <div className='col-7 d-flex flex-column align-items-center'>
                <div className='equipment-title d-block'>Profile Image </div>
                <div className='relative-div d-flex justify-content-center' style={{ maxHeight: '130px', maxWidth: '130px'}}>
                    <img className="img-fluid" src={profileImage === "" ? QuestionMarkImage : profileImage || QuestionMarkImage} />
                </div>
            </div>

            <div className='col-5 d-flex flex-column align-items-center'>
                <div className='equipment-title d-block' >Body Image </div>
                <div className='relative-div d-flex justify-content-center' style={{ maxHeight: '130px', maxWidth: '90px'}} >
                    <img className="img-fluid" src={bodyImage === "" ? QuestionMarkImage : bodyImage || QuestionMarkImage} style={{maxWidth: '100%'}}/>
                </div>
            </div>
        </div>

      </div>

       {/* image */}
       <img className="img-fluid character-sheet" src={DndSheetImage} alt="Character Image" style={{minWidth: '450px'}}/>
    </div>
  )
}

export default DndSheetThree