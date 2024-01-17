//CSS
import '../../css/Form.css';
import '../../css/Site.css';

//Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function ChangeUserDetailsForm({userData}) {
	
	
	//fetch


	const navigate = useNavigate(); 

		//data
		const [data, setData] = useState({
			firstName: '',
			email: '',
			password: '',
		})

		useEffect(() => {
			// Update the state with user data if userData is available
			if (userData) {
				setData({
					email: userData.email || '',
					firstName: userData.name || '',
					password: userData.password, // Assuming you don't want to display the password in the form
				});
			}
		}, [userData]);

    const changeUserDetails = async (e) => {
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
							toast.success('Successfully updated user details')
							navigate('/Home')
						}
					} catch (error) {
						console.log(error)
					}
    }
    
    //html

    return (

        <form onSubmit={changeUserDetails}>
    <div className="row d-flex justify-content-center align-items-center" style={{ maxWidth: "1400px" }}>
        <div className="col-6 mb-4 d-flex align-items-center justify-content-center">
            <input className="change-details-field" type="text" id="username" name="username" placeholder="Email" 
						 value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}/>
        </div>

        <div className="col-6 mb-4 d-flex align-items-center justify-content-center">
            <input className="change-details-field" type="text" id="conf-username" name="conf-username" placeholder="Confirm Email" 
						value={data.email}/>
        </div>

        <div className="col-6 mb-4 d-flex align-items-center justify-content-center">
            <input className="change-details-field" id="password" name="password" placeholder="Password" 
						/>
        </div>

        <div className="col-6 mb-4 d-flex align-items-center justify-content-center">
            <input className="change-details-field" id="conf-password" name="conf-password" placeholder="Confirm Password" 
						/>
        </div>

        <div className="col-6 d-flex align-items-center justify-content-center" style={{ paddingBottom: "100px" }}>
            <input className="change-details-field" type="text" id="name" name="name" placeholder="First Name" 
						value={data.firstName}/>
        </div>

        <div className="col-12 mb-4 d-flex align-items-center justify-content-center">
            <button className="login-button" type="submit">Update</button>
        </div>
    </div>
</form>


    )
}

export default ChangeUserDetailsForm;