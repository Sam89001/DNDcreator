import '../../css/Site.css';
import '../../css/Animations.css';
import '../../css/Components.css';

//Images
import DndSheetImage from '../../images/sheet1.jpg'




//Dependencies

function DndSheet({ title, openPopUp, characterName, characterClass, characterLevel, characterBackground, characterRace, characterAlignment, 
  characterXp, characterUser, characterStrength, characterDexterity, characterConstitution, characterIntelligence, characterWisdom, characterCharisma  }) {

	return (
    <div>
      <div className='container' style={{ position: 'relative', minWidth: '500px',}}>

        {/* Character Name */}
        <div className="absolute-div" style={{ position: 'absolute', top: '7.6%', left: '10%', zIndex: '4', width: '20%', height: '2.5%', fontSize: '1.1vw', display: 'flex', alignItems: 'center' }}>
          <div>{characterName}</div>
        </div>

        {/* Class */}
        <div className="absolute-div" style={{ position: 'absolute', top: '5.7%', left: '44%',  zIndex: '4', width: '12%', height: '2.5%', fontSize: '0.7vw', display: 'flex', alignItems: 'center' }}>
          <div>{characterClass}</div>
        </div>

        {/* Level */}
        <div className="absolute-div" style={{ position: 'absolute', top: '5.7%', left: '57%',  zIndex: '4', width: '3%', height: '2.5%', fontSize: '0.7vw', display: 'flex', alignItems: 'center' }}>
          <div>({characterLevel})</div>
        </div>

        {/* Background */}
        <div className="absolute-div" style={{ position: 'absolute', top: '5.7%', left: '62%',  zIndex: '4', width: '14%', height: '2.5%', fontSize: '0.7vw', display: 'flex', alignItems: 'center' }}>
          <div>{characterBackground}</div>
        </div>

        {/* Player Name */}
        <div className="absolute-div" style={{ position: 'absolute', top: '5.7%', left: '77%',  zIndex: '4', width: '14%', height: '2.5%',  fontSize: '0.7vw', display: 'flex', alignItems: 'center' }}>
          <div>{characterUser}</div>
        </div>

        {/* Race */}
        <div className="absolute-div" style={{ position: 'absolute', top: '9%', left: '44%',  zIndex: '4', width: '16%', height: '2.5%', fontSize: '0.7vw', display: 'flex', alignItems: 'center' }}>
          <div>{characterRace}</div>
        </div>

        {/* Alignment */}
        <div className="absolute-div" style={{ position: 'absolute', top: '9%', left: '62%',  zIndex: '4', width: '14%', height: '2.5%', fontSize: '0.7vw', display: 'flex', alignItems: 'center' }}>
          <div>{characterAlignment}</div>
        </div>

        {/* XP */}
        <div className="absolute-div" style={{ position: 'absolute', top: '9%', left: '77%',  zIndex: '4', width: '14%', height: '2.5%', fontSize: '0.7vw', display: 'flex', alignItems: 'center' }}>
          <div>{characterXp}</div>
        </div>

        {/* Skills */}

        <div className="absolute-div" style={{ position: 'absolute', top: '20%', left: '9%',  zIndex: '4', width: '4%', height: '2.5%', fontSize: '1.4vw', display: 'flex', alignItems: 'center' }}>
          <div>{characterStrength}</div>
        </div>

        <div className="absolute-div" style={{ position: 'absolute', top: '29%', left: '9%',  zIndex: '4', width: '4%', height: '2.5%', fontSize: '1.4vw', display: 'flex', alignItems: 'center' }}>
          <div>{characterDexterity}</div>
        </div>

        <div className="absolute-div" style={{ position: 'absolute', top: '38%', left: '9%',  zIndex: '4', width: '4%', height: '2.5%', fontSize: '1.4vw', display: 'flex', alignItems: 'center' }}>
          <div>{characterConstitution}</div>
        </div>

        <div className="absolute-div" style={{ position: 'absolute', top: '47%', left: '9%',  zIndex: '4', width: '4%', height: '2.5%', fontSize: '1.4vw', display: 'flex', alignItems: 'center' }}>
          <div>{characterIntelligence}</div>
        </div>

        <div className="absolute-div" style={{ position: 'absolute', top: '56%', left: '9%',  zIndex: '4', width: '4%', height: '2.5%', fontSize: '1.4vw', display: 'flex', alignItems: 'center' }}>
          <div>{characterWisdom}</div>
        </div>

        <div className="absolute-div" style={{ position: 'absolute', top: '65%', left: '9%',  zIndex: '4', width: '4%', height: '2.5%', fontSize: '1.4vw', display: 'flex', alignItems: 'center' }}>
          <div>{characterCharisma}</div>
        </div>

        {/* image */}
        <img className="img-fluid" src={DndSheetImage} alt="Character Image" style={{minWidth: '450px',}}/>
       
      </div>
    </div>
  );
}

export default DndSheet;