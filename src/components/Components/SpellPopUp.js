import '../../css/Site.css';
import '../../css/Components.css';
import '../../css/Animations.css';

function DeletePopUp({deleteCharacter, closeDeletePopUp}) {

return(
  <div className='pop-up-overlay'>
      <div className="pop-up spell-pop-up d-flex flex-column align-items-center ">

        <div style={{ width: '100%' }}>
          <button className="spell-pop-up-button flex-start" onClick={closeDeletePopUp}>Close</button>
        </div>

        <div className='row align-items-center' style={{width: '95%'}}>
          <div className='col-12 text-center' style={{paddingBottom: '20px', font: '400 2vw Grenze Gotisch, sans-serif'}}>Spell Details</div>

          <div className='col-12'>
            <div className='row'>

              <div className='col-7 d-flex justify-content-between'>
                <div style={{ display: 'inline-block', width: '18%', backgroundColor: 'var(--textGrey)' }}>Test</div>
                <div style={{ display: 'inline-block', width: '80%', backgroundColor: 'var(--textGrey)' }}>Test</div>
              </div>

              <div className='col-5 d-flex justify-content-between '>
                <div style={{ display: 'inline-block', width: '48%', backgroundColor: 'var(--textGrey)' }}>Test</div>
                <div style={{ display: 'inline-block', width: '48%', backgroundColor: 'var(--textGrey)' }}>Test</div>
              </div>
            </div>
          </div>

          <div className='col-12'>
            <div className='row'>

            </div>
          </div>
        </div>

      </div>
  </div>

)

}

export default DeletePopUp