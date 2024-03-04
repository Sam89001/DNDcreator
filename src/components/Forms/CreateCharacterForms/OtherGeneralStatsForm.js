import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast';

//User
import { UserContext } from '../../../context/userContext';

//Images
import DownArrowImage from '../../../images/Down Arrow.png'

function OtherGeneralStatsForm({propId,}) {

  const characterId = propId.Id

  const [characterOtherStats, setCharacterOtherStats] = useState({
		characterAge: '',
		characterHeight: '',
		characterWeight: '',
		characterEyes: '',
		characterSkin: '',
		characterHair: ''
	});

  return (
    <div className='row'>
      <div className='col-12' style={{paddingBottom: '10px'}}>
        <form>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Age"
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterAge: e.target.value })}/>
					</div>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Height"
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterHeight: e.target.value })}/>
					</div>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Weight"
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterWeight: e.target.value })}/>
					</div>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Eyes"
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterEyes: e.target.value })}/>
					</div>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Skin"
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterSkin: e.target.value })}/>
					</div>

          <div style={{display: 'inline-block', width: '31%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Hair"
						onChange={(e) => setCharacterOtherStats({ ...characterOtherStats, characterHair: e.target.value })}/>
					</div>

          <div className="d-flex align-items-center spells-field">
						<button className='create-character-button' type="submit" > Update</button>
					</div>

        </form>
      </div>

      <div className='col-4'>
        <div className='row'>

          {/* Ally/Organisation */}
          <div className='col-12' style={{paddingBottom: '2px'}}>
            <div className="text-center form-titles">Add New Ally/Organisation</div>
          </div>

          <div className='col-12' style={{paddingBottom: '10px'}}>
					  <input className='field-style' style={{width: '100%'}} placeholder="Name"/>
					</div>

          <div className='col-12' style={{paddingBottom: '10px'}}>
					  <textarea className='field-style description-field' style={{width: '100%'}} 
            placeholder="Description"/>
					</div>

          <div className='col-8' style={{paddingBottom: '10px'}}>
            <select className='edit-character-field' id='characterPersonalityEdit'>
              <option/>		
            </select>
          </div>

          <div className='col-4' style={{paddingBottom: '10px'}}>
            <button className='create-character-button' type="submit" > Update</button>
          </div>

          {/* Symbols */}
          <div className='col-12' style={{paddingBottom: '2px'}}>
            <div className="text-center form-titles">Add New Symbol</div>
          </div>

          <div className='col-12' style={{paddingBottom: '10px'}}>
					  <input className='field-style' style={{width: '100%'}} placeholder="Name"/>
					</div>

          <div className='col-12' style={{paddingBottom: '10px'}}>
					  <textarea className='field-style description-field' style={{width: '100%'}} 
            placeholder="Description"/>
					</div>

          <div className='col-8' style={{paddingBottom: '10px'}}>
            <select className='edit-character-field' id='characterPersonalityEdit'>
              <option/>		
            </select>
          </div>

          <div className='col-4' style={{paddingBottom: '10px'}}>
            <button className='create-character-button' type="submit" > Update</button>
          </div>

        </div>
      </div>

      <div className='col-8'>
        <div className='row'>

          {/* Treasure */}
          <div className='col-12' style={{paddingBottom: '2px'}}>
            <div className="text-center form-titles">Add New Treasure</div>
          </div>

          <div className='col-8' style={{paddingBottom: '10px'}}>
					  <input className='field-style' style={{width: '100%'}} placeholder="Name"/>
					</div>

          <div className='col-4' style={{paddingBottom: '10px'}}>
					  <input className='field-style' style={{width: '100%'}} placeholder="Name"/>
					</div>

          <div className='col-12' style={{paddingBottom: '10px'}}>
					  <textarea className='field-style description-field' style={{width: '100%'}} 
            placeholder="Description"/>
					</div>

          <div className='col-12' style={{paddingBottom: '10px'}}>
            <button className='create-character-button' type="submit" > Update</button>
          </div>

        </div>
      </div>

      <div className='col-12'>
        <div className='row'>

          <div className='col-12' style={{paddingBottom: '2px'}}>
            <div className="text-center form-titles">Backstory</div>
          </div>

          <div className='col-12' style={{paddingBottom: '10px'}}>
					  <textarea className='field-style description-field' style={{width: '100%'}} 
            placeholder="Description"/>
					</div>

          <div className='col-12' style={{paddingBottom: '10px'}}>
            <button className='create-character-button' type="submit" > Update</button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default OtherGeneralStatsForm