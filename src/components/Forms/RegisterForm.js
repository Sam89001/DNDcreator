//CSS
import '../../css/Form.css';
import '../../css/Site.css';

function RegisterForm() {
  return (

			<form method="post">
				<div className="row">

					<div className="col-12 mb-3 d-flex align-items-center justify-content-center">
    				<input className="login-field" placeholder="First Name" />
					</div>

					<div className="col-12 mb-3 d-flex align-items-center justify-content-center">
						<input className="login-field" placeholder="Email" />
					</div>

					<div className="col-12 mb-3 d-flex align-items-center justify-content-center">
						<input className="login-field" placeholder="Confirm Email" />
					</div>

          			<div className="col-12 mb-3 d-flex align-items-center justify-content-center">
						<input className="login-field" placeholder="Password" />
					</div>

          			<div className="col-12 mb-3 d-flex align-items-center justify-content-center">
						<input className="login-field" placeholder="Confirm Password" />
					</div>

					<div className="col-12 mb-4 d-flex align-items-center justify-content-center">
						<button class="login-button" type="submit">Register</button>
					</div>

				</div>
			</form>

  );
}

export default RegisterForm