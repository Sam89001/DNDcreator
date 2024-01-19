import '../../css/Site.css';
import '../../css/Animations.css';

function PopUp({togglePopUp}) {

  return (
    <div className="pop-up">
      {/* PopUp content */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button onClick={togglePopUp}>Close me</button>
          {/* Your other PopUp content goes here */}
          {/* ... */}
        </div>
    </div>
  );
}


export default PopUp;
