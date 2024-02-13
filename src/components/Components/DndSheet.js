import '../../css/Site.css';
import '../../css/Animations.css';
import '../../css/Components.css';

//Images
import DndSheetImage from '../../images/sheet1.jpg'

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

//Dependencies

function DndSheet({fetchData, 
  
  characterName, characterClass, characterLevel, characterBackground, characterRace, 
  characterAlignment, characterXp, characterUser, characterAC, characterInt, characterSpeed,
  characterHP,
  
  characterStrength, characterDexterity, characterConstitution, characterIntelligence, 
  characterWisdom, characterCharisma,
  
  characterInspiration, characterProficiencyBonus, characterPerception, characterHitDice, 
  
  characterPersonalityTraits, characterIdeals, characterBonds, characterFlaws, characterLanguages,

  characterTraits,

  characterSavingThrows, characterSkills
  }) {

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

  const deleteBond =  async (e, id) => {
		e.preventDefault();
		try {
			const response = await axios.delete(`http://localhost:4000/CreateCharacter/DeleteBond/${id}`);
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

  const deleteFlaw =  async (e, id) => {
		e.preventDefault();
		try {
			const response = await axios.delete(`http://localhost:4000/CreateCharacter/DeleteFlaw/${id}`);
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

  const deleteLanguage =  async (e, id) => {
		e.preventDefault();
		try {
			const response = await axios.delete(`http://localhost:4000/CreateCharacter/DeleteLanguage/${id}`);
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

  const deleteTrait =  async (e, id) => {
		e.preventDefault();
		try {
			const response = await axios.delete(`http://localhost:4000/CreateCharacter/DeleteTrait/${id}`);
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

  const skills = [
    "Acrobatics",
    "Animal Handling",
    "Arcana",
    "Athletics",
    "Deception",
    "History",
    "Insight",
    "Intimidation",
    "Investigation",
    "Medicine",
    "Nature",
    "Perception",
    "Performance",
    "Persuasion",
    "Religion",
    "Sleight of Hand",
    "Stealth",
    "Survival"
  ];
  const savingThrows = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma",
  ];

  let topPositionSkills = 40.8; 
  let topPositionSavingThrows = 26.3;

  const skillDivs = skills.map((skill) => {
      const backgroundColor = characterSkills.includes(skill.toLowerCase()) ? 'white' : 'red';
      const style = {
        backgroundColor,
        borderRadius: '10px',
        top: `${topPositionSkills}%`, // Set top position dynamically
        left: '18%',
        width: '1%',
        height: '0.8%',
        fontSize: '1vw'
      };
      topPositionSkills += 1.7;
      return (
        <div key={skill} className="absolute-div dnd-sheet" style={style}> 
        </div>
      );
  });

  const savingThrowsDiv = savingThrows.map((savingThrow) => {
    const backgroundColor = characterSavingThrows.includes(savingThrow.toLowerCase()) ? 'white' : 'red';
    const style = {
      backgroundColor,
      borderRadius: '10px',
      top: `${topPositionSavingThrows}%`, // Set top position dynamically
      left: '18%',
      width: '1%',
      height: '0.8%',
      fontSize: '1vw'
    };
    topPositionSavingThrows += 1.7;
    return (
      <div key={savingThrow} className="absolute-div dnd-sheet" style={style}> 
      </div>
    );
  });


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

        {/* Speed */}
        <div className="absolute-div dnd-sheet" style={{ top: '24%', left: '48%',  width: '6%', height: '2.5%', fontSize: '0.7vw' }}>
          <div>{characterHP}</div>
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

        {/* Saving Throws */}
        {savingThrowsDiv}


        {/* Prof Skills */}
        {skillDivs}

        {/* Stats */}


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

        {/* Bonds */}
        <div className="absolute-div row dnd-sheet" style={{  overflow: 'auto', top: '33%', left: '70%', width: '24%', height: '5%', fontSize: '0.7vw' }}>
          {characterBonds.map(bond => (
            <div value={bond._id} key={bond._id} className='col-12 multiple-property-container' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {bond.characterBond}
              <button className='delete-property-button' onClick={(e) => deleteBond(e, bond._id)} >X</button>
            </div>
          ))}
        </div>

        {/* Flaws */}
        <div className="absolute-div row dnd-sheet" style={{ overflow: 'auto', top: '40%', left: '70%', width: '24%', height: '5%', fontSize: '0.7vw' }}>
          {characterFlaws.map(flaw => (
            <div value={flaw._id} key={flaw._id} className='col-12 multiple-property-container' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {flaw.characterFlaw}
              <button className='delete-property-button' onClick={(e) => deleteFlaw(e, flaw._id)} >X</button>
            </div>
          ))}
        </div>

        {/* Other Proficiency/Languages */}
        <div className="absolute-div row dnd-sheet" style={{ overflow: 'auto', top: '79%', left: '8%', width: '27%', height: '16.5%', fontSize: '0.7vw' }}>
          {characterLanguages.map(language => (
            <div value={language._id} key={language._id} className='col-12 multiple-property-container' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {language.characterLanguage}
              <button className='delete-property-button' onClick={(e) => deleteLanguage(e, language._id)} >X</button>
            </div>
          ))}
        </div>

        {/* Features/Traits */}

        <div className="absolute-div row dnd-sheet" style={{ paddingRight: '20px', overflow: 'auto', top: '48.5%', left: '68%', width: '30%', height: '46%', fontSize: '0.7vw' }}>
          {characterTraits.map(trait => (
            <div value={trait._id} key={trait._id} className='col-12 trait-container' >
              <div className='row '>
                <div className='col-5 trait-title' >Trait Title</div> 
                <div className='col-5 d-flex align-items-center trait-title' >Other Trait Info:</div>
                <div className='col-2 d-flex align-items-center justify-content-center trait-title' >
                  <button className='delete-property-button' onClick={(e) => deleteTrait(e, trait._id)}>X</button>
                </div>

                <div className='col-5 trait-field-container' >
                  <div className='trait-field'>
                    {trait.characterTraitTitle}
                  </div>
                </div>

                <div className='col-7 d-flex align-items-center trait-field-container' >
                  <div className='trait-field'>
                    {trait.characterTraitAdditionalInfo}
                  </div>
                </div>
                
                <div className='col-12 trait-title' >Trait Description:</div> 

                <div className='col-12 trait-field' style={{ padding: '0px 15px 0px 5px' }}>
                  {trait.characterTraitDescription}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* image */}
        <img className="img-fluid character-sheet" src={DndSheetImage} alt="Character Image" style={{minWidth: '450px'}}/>
      </div>
    </div>
  );
}

export default DndSheet;