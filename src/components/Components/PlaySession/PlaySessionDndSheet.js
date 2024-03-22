import '../../../css/Site.css';
import '../../../css/Animations.css';
import '../../../css/Components.css';

//Images
import DndSheetImage from '../../../images/sheet1.jpg'

function DndSheet({characterName, characterClass, characterLevel, characterBackground, characterRace, 
  characterAlignment, characterXp, characterUser, characterAC, characterInt, characterSpeed,
  characterHP,
  
  characterStrength, characterDexterity, characterConstitution, characterIntelligence, 
  characterWisdom, characterCharisma, characterProficiencys,
  
  characterInspiration, characterProficiencyBonus, characterPerception, characterHitDice, 
  
  characterPersonalityTraits, characterIdeals, characterBonds, characterFlaws, characterLanguages,

  characterTraits, characterAttacks, characterEquipment,

  characterSavingThrows, characterSkills, characterCurrency
  }) {

  let topPositionSkills = 40.9; 
  let topPositionSkillsTwo = 40.4; 
  let topPositionSavingThrows = 26.3
  let topPositionSavingThrowNumbers = 26.3;
  let topPositionSkillNumber = 23.1;

  const profCheck = [
    "strength", "dexterity", "constitution",
      "intelligence", "wisdom", "charisma"
  ];
  const skills = [
    { skill: "acrobatics", ability: "dexterity" },
    { skill: "animalHandling", ability: "wisdom" },
    { skill: "arcana", ability: "intelligence" },
    { skill: "athletics", ability: "strength" },
    { skill: "deception", ability: "charisma" },
    { skill: "history", ability: "intelligence" },
    { skill: "insight", ability: "wisdom" },
    { skill: "intimidation", ability: "charisma" },
    { skill: "investigation", ability: "intelligence" },
    { skill: "medicine", ability: "wisdom" },
    { skill: "nature", ability: "intelligence" },
    { skill: "perception", ability: "wisdom" },
    { skill: "performance", ability: "charisma" },
    { skill: "persuasion", ability: "charisma" },
    { skill: "religion", ability: "intelligence" },
    { skill: "sleightOfHand", ability: "dexterity" },
    { skill: "stealth", ability: "dexterity" },
    { skill: "survival", ability: "wisdom" }
  ];
  const savingThrows = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
  ];
  const skillNumber = [
    characterStrength,
    characterDexterity,
    characterConstitution,
    characterIntelligence,
    characterWisdom,
    characterCharisma
  ];

  const skillDivs = skills.map((entry, index) => {
    const { skill, ability } = entry;
    let value;
    let output;
    let finalOutput;

    // Set Values
    switch (ability) {
        case "strength":
            value = characterStrength;
            break;
        case "dexterity":
            value = characterDexterity;
            break;
        case "constitution":
            value = characterConstitution;
            break;
        case "intelligence":
            value = characterIntelligence;
            break;
        case "wisdom":
            value = characterWisdom;
            break;
        case "charisma":
            value = characterCharisma;
            break;
        default:
            value = 0;
            break;
    }

    // Determine output based on value
    if (value < 2) {
        output = -5;
    } else if (value < 4) {
        output = -4;
    } else if (value < 6) {
        output = -3;
    } else if (value < 8) {
        output = -2;
    } else if (value < 10) {
        output = -1;
    } else if (value < 12) {
        output = 0;
    } else if (value < 14) {
        output = 1;
    } else if (value < 16) {
        output = 2;
    } else if (value < 18) {
        output = 3;
    } else if (value < 20) {
        output = 4;
    } else if (value < 22) {
        output = 5;
    } else if (value < 24) {
        output = 6;
    } else if (value < 26) {
        output = 7;
    } else if (value < 28) {
        output = 8;
    } else if (value < 30) {
        output = 9;
    } else if (value >= 30) {
        output = 10;
    }

    const backgroundColor = characterSkills.includes(skill) ? 'white' : 'transparent';
    const skillStyle = {
        backgroundColor,
        borderRadius: '10px',
        top: `${topPositionSkills}%`, // Set top position dynamically
        left: '17.7%',
        width: '1%',
        height: '0.8%',
        fontSize: '1vw'
    };

    const numberStyles = {
        top: `${topPositionSkillsTwo}%`, // Set top position dynamically
        left: '19.5%',
        width: '2%',
        height: '0.8%',
        fontSize: '0.7vw'
    };

    // Determine final output based on the background color
    if (backgroundColor === 'white') {
        finalOutput = output + characterProficiencyBonus;
    } else {
        finalOutput = output;
    }

    // Adjust the top position for the next skill
    topPositionSkills += 1.7;
    topPositionSkillsTwo += 1.7;

    return (
      <div >
        <div className="absolute-div dnd-sheet" style={skillStyle}></div>
        <div className="absolute-div dnd-sheet" style={numberStyles}>
          {finalOutput}
        </div>
      </div>
    );
  });

  const savingThrowsDiv = savingThrows.map((savingThrow) => {
    const backgroundColor = characterSavingThrows.includes(savingThrow.toLowerCase()) ? 'white' : 'transparent';
    const style = {
      backgroundColor,
      borderRadius: '10px',
      top: `${topPositionSavingThrows}%`, // Set top position dynamically
      left: '17.7%',
      width: '1%',
      height: '0.8%',
      fontSize: '1vw'
    };
    topPositionSavingThrows += 1.7;
    return (
      <div className="absolute-div dnd-sheet" style={style}> 
      </div>
    );
  });

  const savingThrowsNumbersDiv = skillNumber.map((num) => {
    let output;
    let finalOutput;
    let pointer = 0;

    if (num < 2) {
      output = -5;
    } else if (num < 4) {
      output = -4;
    } else if (num < 6) {
      output = -3;
    } else if (num < 8) {
      output = -2;
    } else if (num < 10) {
      output = -1;
    } else if (num < 12) {
      output = 0;
    } else if (num < 14) {
      output = 1;
    } else if (num < 16) {
      output = 2;
    } else if (num < 18) {
      output = 3;
    } else if (num < 20) {
      output = 4;
    } else if (num < 22) {
      output = 5;
    } else if (num < 24) {
      output = 6;
    } else if (num < 26) {
      output = 7;
    } else if (num < 28) {
      output = 8;
    } else if (num < 30) {
      output = 9;
    } else if (num >= 30) {
      output = 10;
    }

    if (characterSavingThrows.includes(profCheck[pointer])) {
      finalOutput = output + characterProficiencyBonus
    } else {
      finalOutput = output
    }

    const style = {
      top: `${topPositionSavingThrowNumbers}%`, // Set top position dynamically
      left: '19.5%',
      width: '2%',
      height: '0.8%',
      fontSize: '0.6vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: '8px'
    };
    topPositionSavingThrowNumbers += 1.7;
    pointer += 1;

    return (
      <div className="absolute-div dnd-sheet" style={style}> 
     {finalOutput}</div>
    );
  });

  const numbers = skillNumber.map((num) => {
    const profCheck = ["Strength", "Dexterity", "Constitution",
      "Intelligence", "Wisdom", "Charisma"];
    let output;
    let pointer = 0;

    if (num < 2) {
      output = -5;
    } else if (num < 4) {
      output = -4;
    } else if (num < 6) {
      output = -3;
    } else if (num < 8) {
      output = -2;
    } else if (num < 10) {
      output = -1;
    } else if (num < 12) {
      output = 0;
    } else if (num < 14) {
      output = 1;
    } else if (num < 16) {
      output = 2;
    } else if (num < 18) {
      output = 3;
    } else if (num < 20) {
      output = 4;
    } else if (num < 22) {
      output = 5;
    } else if (num < 24) {
      output = 6;
    } else if (num < 26) {
      output = 7;
    } else if (num < 28) {
      output = 8;
    } else if (num < 30) {
      output = 9;
    } else if (num >= 30) {
      output = 10;
    }

    if (characterProficiencys.includes(profCheck[pointer])) {
      console.log("adding proficiency to " + output);
    }

    const style = {
      top: `${topPositionSkillNumber}%`, // Set top position dynamically
      left: '9%',
      width: '4%',
      height: '2%',
      fontSize: '0.7vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };
    topPositionSkillNumber += 9.1;

    return (
      <div className="absolute-div dnd-sheet" style={style}>
        {output}
      </div>
    );
  });

	return (
      <div className='container' style={{ position: 'relative', minWidth: '500px',}}>

        {/* Character Name */}
        <div className="absolute-div dnd-sheet" style={{ overflowY: 'auto', paddingBottom: '15px', whiteSpace: 'nowrap', top: '7%', left: '10%', width: '25%', height: '5%', fontSize: '1.1vw' }}>
          <div>{characterName}</div>
        </div>

        {/* Class */}
        <div className="absolute-div dnd-sheet" style={{  overflowY: 'auto', paddingBottom: '10px', whiteSpace: 'nowrap', top: '5.7%', left: '44%',  width: '12%', height: '4%', fontSize: '0.7vw' }}>
          <div>{characterClass}</div>
        </div>

        {/* Level */}
        <div className="absolute-div dnd-sheet" style={{  top: '5.7%', left: '57%',  width: '3%', whiteSpace: 'nowrap', height: '2.5%', fontSize: '0.7vw' }}>
          <div>({characterLevel})</div>
        </div>

        {/* Background */}
        <div className="absolute-div dnd-sheet" style={{ overflowY: 'auto', paddingBottom: '10px', whiteSpace: 'nowrap', top: '5.7%', left: '62%',  width: '14%', height: '4%', fontSize: '0.7vw' }}>
          <div>{characterBackground}</div>
        </div>

        {/* Player Name */}
        <div className="absolute-div dnd-sheet" style={{  overflowY: 'auto', paddingBottom: '10px', whiteSpace: 'nowrap', top: '5.7%', left: '77.5%', width: '14%', height: '4%',  fontSize: '0.7vw' }}>
          <div>{characterUser}</div>
        </div>

        {/* Race */}
        <div className="absolute-div dnd-sheet" style={{   overflowY: 'auto', paddingBottom: '10px', whiteSpace: 'nowrap', top: '9%', left: '44%',  width: '16%', height: '4%', fontSize: '0.7vw' }}>
          <div>{characterRace}</div>
        </div>

        {/* Alignment */}
        <div className="absolute-div dnd-sheet" style={{   overflowY: 'auto', paddingBottom: '10px', whiteSpace: 'nowrap', top: '9%', left: '62%', width: '14%', height: '4%', fontSize: '0.7vw' }}>
          <div>{characterAlignment}</div>
        </div>

        {/* XP */}
        <div className="absolute-div dnd-sheet" style={{ top: '9%', left: '78%', width: '14%', height: '2.5%', fontSize: '0.7vw' }}>
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

        {/* HP */}
        <div className="absolute-div dnd-sheet" style={{ top: '24%', left: '48%',  width: '6%', height: '2.5%', fontSize: '0.7vw' }}>
          <div>{characterHP}</div>
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

        {numbers}

        {/* Saving Throws */}
        {savingThrowsDiv}
        {savingThrowsNumbersDiv}

        {/* Prof Skills */}
        {skillDivs}

        {/* Currency */}
        <div className="absolute-div dnd-sheet-noflex row" style={{ overflowY: 'auto', top: '75%', left: '39.5%', width: '4.5%', height: '17%', fontSize: '0.9vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div className='row' style={{padding: '0px'}}>
            {characterCurrency.map(currency => (
              <div className='col-12 text-center' style={{padding: '0px 0px 4px 0px', minHeight: '22.5px', overflowY: 'auto'}}>{currency.characterCurrencyAmount}</div>
            ))}
          </div>
        </div>


        {/* Attacks */}
        <div className="absolute-div dnd-sheet-noflex" style={{ overflowY: 'auto', overflowX: 'hidden', top: '49.5%', left: '37.5%', width: '28%', height: '7.5%', fontSize: '0.7vw', maxHeight: '100px' }}>
          {characterAttacks.map(attack => (
            <div key={attack._id} style={{marginBottom: '5px'}}>
              <div className="row" style={{paddingLeft: '12px'}}>
                <div className='col-4 attack-first-field hover-red'>
                  <div style={{ width: '85%', overflowX: 'auto', whiteSpace: 'nowrap'}}>{attack.characterAttackName}</div>
                </div>
                <div className='col-2 attack-second-field hover-red'>
                  <div style={{ width: '85%', overflowX: 'auto', whiteSpace: 'nowrap'}}>{attack.characterAttackBonus}</div>
                </div>
                <div className='col-4 col-sm-3 attack-third-field hover-red'>
                  <div style={{width: '80%', overflowX: 'auto', whiteSpace: 'nowrap'}}>{attack.characterDamageType}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Equipment */}
        <div className="absolute-div dnd-sheet-noflex row" style={{ paddingRight: '8px', overflowY: 'auto', top: '74.5%', left: '46%', width: '21%', height: '21%', fontSize: '0.7vw' }}>
          {characterEquipment.map(equipment => (
            <div key={equipment._id} className='col-12 equipment-container hover-red'>
              <div className='row '>
                  <div className='col-6 equipment-title' >Equipment Title</div> 
                  <div className='col-4 d-flex align-items-center equipment-title' >Quantity:</div>
                  <div className='col-2 d-flex align-items-center justify-content-center equipment-title' >
                  </div>

                  <div className='col-6 equipment-field-container' >
                    <div className='equipment-field'>
                      {equipment.characterEquipmentName}
                    </div>
                  </div>

                  <div className='col-6 d-flex align-items-center equipment-field-container' >
                    <div className='equipment-field'>
                    {equipment.characterEquipmentQuantity} 
                    </div>
                  </div>
                  
                  <div className='col-12 equipment-title' >Equipment Description:</div> 
                  <div className='col-12 equipment-field' style={{ padding: '0px 15px 0px 5px' }}>
                    {equipment.characterEquipmentDescription}
                  </div>

                </div>
            </div>
          ))}
        </div>

        {/* Features/Traits */}
        <div className="absolute-div row dnd-sheet-noflex" style={{ paddingRight: '20px', overflow: 'auto', top: '48.5%', left: '68%', width: '30%', height: '46%', fontSize: '0.7vw' }}>
          {characterTraits.map(trait => (
            <div value={trait._id} key={trait._id} className='col-12 trait-container hover-red' >
              <div className='row '>
                <div className='col-5 trait-title' >Trait Title</div> 
                <div className='col-5 d-flex align-items-center trait-title' >Other Trait Info:</div>
                <div className='col-2 d-flex align-items-center justify-content-center trait-title' >
                  
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

        {/* Personality Trait */}
        <div className="absolute-div row dnd-sheet" style={{ overflowX: 'auto', paddingRight: '10px', top: '17.5%', left: '69%', width: '26.5%', height: '6%', fontSize: '0.7vw' }}>
          {characterPersonalityTraits.map(trait => (
            <div className='col-12 hover-red d-flex align-items-center justify-content-between' key={trait._id}>
              <div value={trait._id} style={{ overflowY: 'auto', marginRight: '10px', paddingBottom: '10px' }}>
                {trait.characterPersonalityTrait}
              </div>
            </div>
          ))}
        </div>

        {/* Ideals */}
        <div className="absolute-div row dnd-sheet" style={{ overflowX: 'auto', paddingRight: '10px', top: '26%', left: '69%', width: '26.5%', height: '4.5%', fontSize: '0.7vw' }}>
          {characterIdeals.map(ideal => (
            <div className='col-12 hover-red d-flex align-items-center justify-content-between' key={ideal._id}> 
              <div value={ideal._id} key={ideal._id} style={{ overflowY: 'auto', marginRight: '10px', paddingBottom: '10px' }}>
                {ideal.characterIdeal}
              </div>
            </div>
          ))}
        </div>

        {/* Bonds */}
        <div className="absolute-div row dnd-sheet" style={{ overflowX: 'auto', paddingRight: '10px', top: '33%', left: '69%', width: '26.5%', height: '4.5%', fontSize: '0.7vw' }}>
          {characterBonds.map(bond => (
            <div className='col-12 hover-red d-flex align-items-center justify-content-between' key={bond._id}> 
              <div value={bond._id} key={bond._id} style={{ overflowY: 'auto', marginRight: '10px', paddingBottom: '10px' }}>
                {bond.characterBond}
              </div>
            </div>
          ))}
        </div>

        {/* Flaws */}
        <div className="absolute-div row dnd-sheet" style={{ overflowX: 'auto', paddingRight: '10px', top: '40%', left: '69%', width: '26.5%', height: '4.5%', fontSize: '0.7vw' }}>
          {characterFlaws.map(flaw => (
            <div className='col-12 hover-red d-flex align-items-center justify-content-between' key={flaw._id}>
              <div value={flaw._id} key={flaw._id} style={{ overflowY: 'auto', marginRight: '10px', paddingBottom: '10px' }}>
                {flaw.characterFlaw}
              </div>
            </div>
          ))}
        </div>

        {/* Other Proficiency/Languages */}
        <div className="absolute-div dnd-sheet-noflex" style={{ overflowX: 'auto', paddingRight: '10px', paddingLeft: '10px', top: '79%', left: '7.3%', width: '27%', height: '16.5%', fontSize: '0.7vw' }}>
          <div className='row'>
            {characterLanguages.map(language => (
              <div className='col-12 hover-red d-flex align-items-center justify-content-between' key={language._id}>
                <div value={language._id} key={language._id} style={{ overflowY: 'auto', marginRight: '10px', paddingBottom: '10px' }}>
                  {language.characterLanguage}
                </div>
              </div>
            ))} 
          </div>     
        </div>
        
        {/* image */}
        <img className="img-fluid character-sheet" src={DndSheetImage} alt="Character Image" style={{minWidth: '450px'}}/>
      </div>
  );
}

export default DndSheet;