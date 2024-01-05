//CSS
import '../../css/Form.css';

function LogInForm() {
  return (

			<form method="post">
				<div className="row">

					<div className="col-12 mb-4 d-flex align-items-center justify-content-center">
    				<input className="login-field" type="text" id="username" name="username" placeholder="Login"/>
					</div>

					<div className="col-12 mb-4 d-flex align-items-center justify-content-center">
    				<input className="login-field" type="password" id="password" name="password" placeholder="Password"/>
					</div>

					<div className="col-12 mb-4 d-flex align-items-center justify-content-center">
   					 <button className="login-button" type="submit">Login</button>
					</div>

				</div>
			</form>

  );
}

export default LogInForm