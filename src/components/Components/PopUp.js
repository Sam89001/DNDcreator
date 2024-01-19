import '../../css/Site.css';
import '../../css/Animations.css';

function PopUp({closePopUp}) {

  return (
    <div className='pop-up-overlay'>
      <div className="pop-up">
        {/* PopUp content */}

            <button onClick={closePopUp}>Close me</button>
            {/* Your other PopUp content goes here */}
            {/* ... */}
      </div>
    </div>

  );
}


export default PopUp;
