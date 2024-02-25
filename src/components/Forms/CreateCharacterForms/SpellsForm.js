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

function SpellsForm() {

return (
	<div className="row" style={{minWidth: '1300px'}}>
		<div className='col-3'>
			<div style={{width: '100%', backgroundColor: 'red'}}>JOHN</div>
		</div>
		<div className='col-3'>
			<div style={{width: '100%', backgroundColor: 'red'}}>JOHN</div>
		</div>
		<div className='col-3'>
			<div style={{width: '100%', backgroundColor: 'red'}}>JOHN</div>
		</div>
		<div className='col-3'>
			<div style={{width: '100%', backgroundColor: 'red'}}>JOHN</div>
		</div>
	</div>
)
}

export default SpellsForm