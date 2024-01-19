import '../../../css/Form.css';
import '../../../css/Site.css';

import { UserContext } from '../../../context/userContext';

//States
import { useState, useContext } from 'react';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function CreateCharacterForm() {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	const [data, setData] = useState({
		characterName: '',
		id: user.id,
	})

	const registerCharacter = async (e) => {
		e.preventDefault();
		const {characterName, id} = data

		try {
      const response = await axios.post('http://localhost:4000/CreateCharacter/CreateNewCharacter', {
        characterName, id
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({});
        toast.success('Character created successfully!');
        const mongoId = response.data.mongoId // Assuming your server sends back _id
        navigate(`/LoadCharacter/${mongoId}`);
      }
    } catch (error) {
      console.error('Error creating character:', error);
    }
  };

//HTML
  return (
	<form onSubmit={registerCharacter}>
		<label> Character Name</label>
		<input placeholder="Character Name" value={data.characterName} onChange={(e) => setData({...data, characterName: e.target.value})}></input>
		<br></br>
		<br></br>
		<label> Character Headshot</label>
		<br></br>
		<br></br>
		<button type='submit' >Save</button>
		<p>User ID: {user.id}</p> {/* Assuming 'id' is a property in the user object */}
		
	</form>
  );
}

export default CreateCharacterForm