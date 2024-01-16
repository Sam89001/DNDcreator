//CSS
import '../../css/Form.css';
import '../../css/Site.css';

//States
import { useState } from 'react';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function ChangeUserDetailsForm() {
    return (

        <form method="post">
    <div className="row d-flex justify-content-center align-items-center" style={{ maxWidth: "1400px" }}>
        <div className="col-6 mb-4 d-flex align-items-center justify-content-center">
            <input className="change-details-field" type="text" id="username" name="username" placeholder="Email" />
        </div>

        <div className="col-6 mb-4 d-flex align-items-center justify-content-center">
            <input className="change-details-field" type="text" id="conf-username" name="conf-username" placeholder="Confirm Email" />
        </div>

        <div className="col-6 mb-4 d-flex align-items-center justify-content-center">
            <input className="change-details-field" type="password" id="password" name="password" placeholder="Password" />
        </div>

        <div className="col-6 mb-4 d-flex align-items-center justify-content-center">
            <input className="change-details-field" type="password" id="conf-password" name="conf-password" placeholder="Confirm Password" />
        </div>

        <div className="col-6 d-flex align-items-center justify-content-center" style={{ paddingBottom: "100px" }}>
            <input className="change-details-field" type="text" id="name" name="name" placeholder="First Name" />
        </div>

        <div className="col-12 mb-4 d-flex align-items-center justify-content-center">
            <button className="login-button" type="submit">Update</button>
        </div>
    </div>
</form>


    )
}

export default ChangeUserDetailsForm;