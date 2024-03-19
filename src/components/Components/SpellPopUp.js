import '../../css/Site.css';
import '../../css/Components.css';
import '../../css/Animations.css';

function DeletePopUp({closePopUp}) {

return(
  <div className='pop-up-overlay'>
    <div className="pop-up spell-pop-up d-flex flex-column align-items-center ">

      <div style={{ width: '100%' }}>
        <button className="spell-pop-up-button flex-start" onClick={closePopUp}>Close</button>
      </div>


      <div className='row align-items-center justify-content-center' style={{ width: '100%' }}>

        <div className='col-12 text-center' style={{ paddingBottom: '20px', font: '400 2vw Grenze Gotisch, sans-serif' }}>Spell Details</div>
        <div className='col-12 row justify-content-center' style={{paddingBottom: '20px'}}>

          <div className='col-7 row d-flex justify-content-between' style={{paddingBottom: '10px'}}>
            <div className='col-12 d-flex justify-content-between'>
              <div className='text-center spell-pop-up-title-field' style={{ width: '18%' }}>Spell Level</div>
              <div className='text-center spell-pop-up-title-field' style={{ width: '80%' }}>Spell Name</div>
            </div>

            <div className='col-12 d-flex justify-content-between'>
              <div className='text-center spell-pop-up-field' style={{ width: '18%' }}>Test</div>
              <div className='text-center spell-pop-up-field' style={{ width: '80%' }}>Test</div>
            </div>
          </div>

          <div className='col-5 row d-flex justify-content-between' style={{paddingBottom: '10px'}}>

            <div className='col-12 d-flex justify-content-between' >
              <div className='text-center spell-pop-up-title-field' style={{ width: '48%' }}>Spell Level</div>
              <div className='text-center spell-pop-up-title-field' style={{ width: '48%' }}>Spell Name</div>
            </div>

            <div className='col-12 d-flex justify-content-between' >
              <div className='text-center spell-pop-up-field' style={{ width: '48%' }}>Test</div>
              <div className='text-center spell-pop-up-field' style={{ width: '48%' }}>Test</div>
            </div>

          </div>

          <div className='col-12 row d-flex'>

            <div className='col-12 text-center'>
              <div className='spell-pop-up-title-field'>Spell Description</div>
            </div>

          </div>

        </div>
      </div>

      <div className='col-12'>
        <div className='row'></div>
      </div>
    </div>
  </div>
)

}

export default DeletePopUp