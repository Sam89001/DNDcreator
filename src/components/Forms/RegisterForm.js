//CSS
import '../../css/Form.css';
import '../../css/Site.css';

//States
import { useState } from 'react';

//Dependencies
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
 
function RegisterForm() {

	const navigate = useNavigate();

//Function

	const [data, setData] = useState({
		firstName: '',
		email: '',
		password: '',
	})

	//Data to be saved to database
	const registerUser = async (e) => {
		e.preventDefault();
		const {email, firstName, password} = data
		try {
			//Posts the data
			const {data} = await axios.post('http://localhost:4000/', {
				firstName, email, password
			})

			//toast notification
			if (data.error) {
				toast.error(data.error)
			} else {
				setData({})
				toast.success('Account created successfully!')
				navigate('/Login')
			}
		} catch (error) {
			console.log(error)
		}
	}

//HTML

  return (

	<form onSubmit={registerUser}>
		<div className="row">

			<div className="col-12 mb-3 d-flex align-items-center justify-content-center">
    			<input className="login-field" placeholder="First Name" value={data.firstName} onChange={(e) => setData({...data, firstName: e.target.value})}/>
			</div>

			<div className="col-12 mb-3 d-flex align-items-center justify-content-center">
				<input className="login-field" placeholder="Email" type='email' />
			</div>

			<div className="col-12 mb-3 d-flex align-items-center justify-content-center">
				<input className="login-field" placeholder="Confirm Email" type='email'  value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
			</div>

          	<div className="col-12 mb-3 d-flex align-items-center justify-content-center">
				<input className="login-field" placeholder="Password" type='password' />
			</div>

          	<div className="col-12 mb-3 d-flex align-items-center justify-content-center">
				<input className="login-field" placeholder="Confirm Password" type='password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
			</div>

			<div className="col-12 mb-4 d-flex align-items-center justify-content-center">
				<button className="login-button" type="submit">Register</button>
			</div>

		</div>
	</form>

  );
}

export default RegisterForm