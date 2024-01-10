//CSS
import '../../css/Form.css';
import '../../css/Site.css';

//States
import { useState } from 'react';
import axios from 'axios';

function LogInForm() {

//Functions

const [data, setData] = useState({
	email: '',
	password: '',
})

const loginUser = (e) => {
	e.preventDefault()
	axios.get('/')
}

//HTML
  return (
	<form >
		<div className="row">

			<div className="col-12 mb-4 d-flex align-items-center justify-content-center">
    			<input className="login-field" type="text" placeholder="Login" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
			</div>

			<div className="col-12 mb-4 d-flex align-items-center justify-content-center">
    			<input className="login-field" type="password" placeholder="Password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
			</div>

			<div className="col-12 mb-4 d-flex align-items-center justify-content-center">
   				<button className="login-button" type="submit">Login</button>
			</div>

		</div>
				
	</form>
			

  );
}

export default LogInForm