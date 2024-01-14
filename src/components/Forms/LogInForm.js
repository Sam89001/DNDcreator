//CSS
import '../../css/Form.css';
import '../../css/Site.css';

//States
import { useState } from 'react';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function LogInForm() {
	const navigate = useNavigate(); 
//Functions

const [data, setData] = useState({
	email: '',
	password: '',
})

const loginUser = async (e) => {
	e.preventDefault()
	const {email, password} = data
		try {
			const {data} = await axios.post('/Login', {
				email,
				password
			})
			if (data.error) {
				toast.error(data.error)
			} else {
				setData({});
				toast.success('Login successful!')
				navigate('/Home')
			}
		} catch (error) {
			console.log(error)
		}
}

//HTML
  return (
	<form onSubmit={loginUser}>
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