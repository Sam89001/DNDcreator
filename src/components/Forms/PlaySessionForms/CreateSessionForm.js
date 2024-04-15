import '../../../css/Form.css';
import '../../../css/Site.css';

import { UserContext } from '../../../context/userContext';

//States
import { useState, useContext } from 'react';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function CreateSessionForm() {
  const navigate = useNavigate();
	const { user } = useContext(UserContext);

	const [data, setData] = useState({
		sessionName: '',
		id: user.id,
	})

  return (
   <div>
      <form >
        <label> Session Name</label>
        <input placeholder="Session Name" value={data.sessionName} onChange={(e) => setData({...data, sessionName: e.target.value})}></input>
        <br></br>
        <br></br>
        <label> Session Image</label>
        <br></br>
        <br></br>
        <button type='submit' >Save</button>
        <p>User ID: {user.id}</p> {/* Assuming 'id' is a property in the user object */}
      </form>
   </div>
  )
}

export default CreateSessionForm