import '../../css/Site.css';
import '../../css/Animations.css';
import '../../css/Components.css';

//Images
import DndSheetImage from '../../images/sheet1.jpg'

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

//Dependencies

function DndSheet({fetchData, 
  
  characterName, characterClass, characterLevel, characterBackground, characterRace, 
  characterAlignment, characterXp, characterUser, characterAC, characterInt, characterSpeed,
  
  characterStrength, characterDexterity, characterConstitution, characterIntelligence, 
  characterWisdom, characterCharisma,
  
  characterInspiration, characterProficiencyBonus, characterPerception, characterHitDice, 
  
  characterPersonalityTraits, characterIdeals }) {

  //Delete Request
	const deletePersonalityTrait =  async (e, id) => {
		e.preventDefault();
		try {
			const response = await axios.delete(`http://localhost:4000/CreateCharacter/DeletePersonalityTrait/${id}`);
			if(response.error) {
				toast.error(response.data.error);
			} else {
				//Calls the get request
				fetchData();
				toast.success('Successfully deleted');
			}
		} catch (error) {
			console.log(error)
		}
	}

  const deleteIdeal =  async (e, id) => {
		e.preventDefault();
		try {
			const response = await axios.delete(`http://localhost:4000/CreateCharacter/DeleteIdeal/${id}`);
			if(response.error) {
				toast.error(response.data.error);
			} else {
				//Calls the get request
				fetchData();
				toast.success('Successfully deleted');
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
    <div>
      <div className='container' style={{ position: 'relative', minWidth: '500px',}}>

        {/* Character Name */}
        <div className="absolute-div dnd-sheet" style={{  top: '7.6%', left: '10%', width: '20%', height: '2.5%', fontSize: '1.1vw' }}>
          <div>{characterName}</div>
        </div>

        {/* Class */}
        <div className="absolute-div dnd-sheet" style={{  top: '5.7%', left: '44%',  width: '12%', height: '2.5%', fontSize: '0.7vw' }}>
          <div>{characterClass}</div>
        </div>

        {/* Level */}
        <div className="absolute-div dnd-sheet" style={{  top: '5.7%', left: '57%',  width: '3%', height: '2.5%', fontSize: '0.7vw' }}>
          <div>({characterLevel})</div>
        </div>

        {/* Background */}
        <div className="absolute-div dnd-sheet" style={{  top: '5.7%', left: '62%',  width: '14%', height: '2.5%', fontSize: '0.7vw' }}>
          <div>{characterBackground}</div>
        </div>

        {/* Player Name */}
        <div className="absolute-div dnd-sheet" style={{  top: '5.7%', left: '77%', width: '14%', height: '2.5%',  fontSize: '0.7vw' }}>
          <div>{characterUser}</div>
        </div>

        {/* Race */}
        <div className="absolute-div dnd-sheet" style={{  top: '9%', left: '44%',  width: '16%', height: '2.5%', fontSize: '0.7vw' }}>
          <div>{characterRace}</div>
        </div>

        {/* Alignment */}
        <div className="absolute-div dnd-sheet" style={{  top: '9%', left: '62%', width: '14%', height: '2.5%', fontSize: '0.7vw' }}>
          <div>{characterAlignment}</div>
        </div>

        {/* XP */}
        <div className="absolute-div dnd-sheet" style={{ top: '9%', left: '77%', width: '14%', height: '2.5%', fontSize: '0.7vw' }}>
          <div>{characterXp}</div>
        </div>

        {/* AC */}
        <div className="absolute-div dnd-sheet" style={{ top: '18%', left: '39%',  width: '5%', height: '2.5%', fontSize: '1vw' }}>
          <div>{characterAC} </div>
        </div>

        {/* Initiative */}
        <div className="absolute-div dnd-sheet" style={{ top: '18%', left: '47%',  width: '5%', height: '2.5%', fontSize: '1vw' }}>
          <div>{characterInt}</div>
        </div>

        {/* Speed */}
        <div className="absolute-div dnd-sheet" style={{ top: '18%', left: '56%',  width: '6%', height: '2.5%', fontSize: '1vw' }}>
          <div>{characterSpeed}</div>
        </div>



        {/* Skills */}

        {/* Strength */}
        <div className="absolute-div dnd-sheet" style={{  top: '20%', left: '9%', width: '4%', height: '2.5%', fontSize: '1.4vw' }}>
          <div>{characterStrength}</div>
        </div>

        {/* Dexterity */}
        <div className="absolute-div dnd-sheet" style={{  top: '29%', left: '9%', width: '4%', height: '2.5%', fontSize: '1.4vw' }}>
          <div>{characterDexterity}</div>
        </div>

        {/* Constitution */}
        <div className="absolute-div dnd-sheet" style={{  top: '38%', left: '9%', width: '4%', height: '2.5%', fontSize: '1.4vw' }}>
          <div>{characterConstitution}</div>
        </div>

        {/* Intelligence */}
        <div className="absolute-div dnd-sheet" style={{  top: '47%', left: '9%', width: '4%', height: '2.5%', fontSize: '1.4vw' }}>
          <div>{characterIntelligence}</div>
        </div>

        {/* Wisdom */}
        <div className="absolute-div dnd-sheet" style={{  top: '56%', left: '9%', width: '4%', height: '2.5%', fontSize: '1.4vw' }}>
          <div>{characterWisdom}</div>
        </div>

        {/* Charisma */}
        <div className="absolute-div dnd-sheet" style={{  top: '65%', left: '9%', width: '4%', height: '2.5%', fontSize: '1.4vw' }}>
          <div>{characterCharisma}</div>
        </div>

        {/* Inspiration */}
        <div className="absolute-div dnd-sheet" style={{  top: '16.5%', left: '17.5%', width: '3%', height: '2.5%', fontSize: '0.7vw' }}>
          <div>{characterInspiration}</div>
        </div>

        {/* Proficiency Bonus */}
        <div className="absolute-div dnd-sheet" style={{  top: '21%', left: '17.5%', width: '3%', height: '2.5%', fontSize: '0.7vw' }}>
          <div>{characterProficiencyBonus}</div>
        </div>

        {/* Perception */}
        <div className="absolute-div dnd-sheet" style={{ top: '74.5%', left: '7%', width: '3%', height: '2%', fontSize: '0.7vw' }}>
          <div>{characterPerception}</div>
        </div>

        {/* Hit Dice */}
        <div className="absolute-div dnd-sheet" style={{ top: '42%', left: '39%', width: '9%', height: '2.5%', fontSize: '0.9vw' }}>
          <div>{characterHitDice}</div>
        </div>

        {/* Personality Trait */}
        <div className="absolute-div row dnd-sheet" style={{ overflow: 'auto', top: '17.5%', left: '70%',width: '24%', height: '6%', fontSize: '0.7vw' }}>
          {characterPersonalityTraits.map(trait => (
            <div value={trait._id} key={trait._id} className='col-12 multiple-property-container' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {trait.characterPersonalityTrait}
              <button className='delete-property-button' onClick={(e) => deletePersonalityTrait(e, trait._id)}>X</button>
            </div>
          ))}
        </div>

        {/* Ideals */}
        <div className="absolute-div row dnd-sheet" style={{  overflow: 'auto', top: '26%', left: '70%', width: '24%', height: '5%', fontSize: '0.7vw' }}>
          {characterIdeals.map(ideal => (
            <div value={ideal._id} key={ideal._id} className='col-12 multiple-property-container' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {ideal.characterIdeal}
              <button className='delete-property-button' onClick={(e) => deleteIdeal(e, ideal._id)} >X</button>
            </div>
          ))}
        </div>

        {/* image */}
        <img className="img-fluid" src={DndSheetImage} alt="Character Image" style={{minWidth: '450px',}}/>
       
      </div>
    </div>
  );
}

export default DndSheet;