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
			id: '',
		})

		useEffect(() => {
			if (userData) {
				setData({
					email: userData.email || '',
					firstName: userData.name || '',
					password: userData.password || '',
					id: userData.id 
				});
			}
		}, [userData]);
	
		const changeUserDetails = async (e) => {
			e.preventDefault();
			const { email, firstName, password, id } = data;
	
			try {
				const { data } = await axios.put('http://localhost:4000/Home/AccountEdit', {
					firstName,
					email,
					password,
					id,
				});
	
				if (data.error) {
					toast.error(data.error);
				} else {
					setData({});
					toast.success('Successfully updated user details');
					navigate('/Home');
				}
			} catch (error) {
				console.log(error);
			}
		};
    
    //html

    return (

      <form onSubmit={changeUserDetails}>
    		<div className="row d-flex justify-content-center align-items-center" style={{ maxWidth: "1400px" }}>
					{/* <h1>{data.id}</h1> */}

					<div className="col-6 mb-4 d-flex align-items-center justify-content-center">
							<label> Email </label>
							<input className="change-details-field" type="text" placeholder={data.email}/>
					</div>

					<div className="col-6 mb-4 d-flex align-items-center justify-content-center">
							<label> Confirm Email </label>
							<input className="change-details-field" type="text" placeholder={data.email} 
							onChange={(e) => setData({ ...data, email: e.target.value })}/>
					</div>

					<div className="col-6 mb-4 d-flex align-items-center justify-content-center">
							<label> Password </label>
							<input className="change-details-field" type="text"  placeholder={data.password}/>
					</div>

					<div className="col-6 mb-4 d-flex align-items-center justify-content-center">
							<label> Confirm Password </label>
							<input className="change-details-field" type="text" placeholder={data.password}
							onChange={(e) => setData({ ...data, password: e.target.value })}/>
					</div>

					<div className="col-6 d-flex align-items-center justify-content-center" style={{ paddingBottom: "100px" }}>
							<label> Name </label>
							<input className="change-details-field" type="text" placeholder={data.firstName}
							onChange={(e) => setData({ ...data, firstName: e.target.value })}/>
					</div>

					<div className="col-12 mb-4 d-flex align-items-center justify-content-center">
							<button className="login-button" type="submit">Update</button>
					</div>
    		</div>
			</form>

    )
}

export default ChangeUserDetailsForm;