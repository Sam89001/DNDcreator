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

function SpellsForm() {
	const [dropdownStates, setDropdownStates] = useState([]);

  const toggleDropdown = (index) => {
    const updatedStates = [...dropdownStates];
    updatedStates[index] = !updatedStates[index];
    setDropdownStates(updatedStates);
  };

return (
	<div className="row" style={{minWidth: '1300px', paddingLeft: '10px', paddingTop: '10px'}}>
		<div className='col-3'>
			<div className='row'>

				{/* General Spell Stats */}
				<div className='col-12' style={{paddingBottom: '20px'}}>
					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spellcaster Class"/>
					</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spellcasting Ability"/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spellsave DC"/>
					</div>
					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell ATK Bonus"/>
					</div>
				</div>

				{/* Cantrips */}
				<div className='col-12' style={{paddingBottom: '20px'}}>
					<form>
					<div className="spells-field"> Cantrips</div>

					<div className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Spell Name"/>
					</div>

					<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Cast Time"/>
					</div>
					<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
						<input className='field-style' style={{width: '100%'}} placeholder="Range/Area"/>
					</div>

					<div className="spells-field">
						<textarea className='field-style spell-description' style={{width: '100%'}} placeholder="Spell Description"/>
					</div>

					<div className={`drop-down-spells-field ${dropdownStates['0'] ? 'active' : ''}`}>
						<div className={`spells-expand-box `} >
							<div style={{width: '48%', marginRight: '10px'}}>Additional Fields
							</div>
							<img
              className={`spell-arrow ${dropdownStates['0'] ? 'active' : ''}`}
              src={DownArrowImage}
              onClick={() => toggleDropdown('0')} />
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Duration"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Attack/Save"/>
						</div>

						<div style={{display: 'inline-block', width: '48%', marginRight: '10px'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="School"/>
						</div>
						<div style={{display: 'inline-block', width: '48%'}} className="spells-field">
							<input className='field-style' style={{width: '100%'}} placeholder="Dmg/Effect"/>
						</div>
					</div>
					</form>
				</div>

			</div>
		</div>
		<div className='col-3'>
			<div className='row'>JOHN</div>
		</div>
		<div className='col-3'>
			<div className='row'>JOHN</div>
		</div>
		<div className='col-3'>
			<div className='row'>JOHN</div>
		</div>
	</div>
)
}

export default SpellsForm