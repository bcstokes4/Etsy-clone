import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import LoginFormModal from '../LoginFormModal'
import OpenModalButton from '../OpenModalButton'
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	function isValidEmail(email) {
		const [a, b] = email.split("@");
		if (email.indexOf("@") === -1 || b.indexOf(".") === -1) {
		  return false;
		}
		if (a.length === 0 || b.length === 0) {
		  return false;
		}
		if (a.startsWith(".") || a.endsWith(".")) {
		  return false;
		}
		return true;
	  }
	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({})

		let errorsObj = {};
		
		if (password.length < 6){
			errorsObj.password = 'Password must be at least 6 characters'
		}
		if (password !== confirmPassword) {
			errorsObj.password =
			  "Confirm Password field must be the same as the Password field";
		  }
		if (!name) {
			errorsObj.name = 'Name is required'
		}
		if (name.length < 6){
			errorsObj.name = 'Name must be at least 6 characters'
		}
		if (name.length > 50){
			errorsObj.name = 'Name must be 50 characters or less'
		}
		if (!username){
			errorsObj.username = 'Username is required'
		}
		if (username.length < 6){
			errorsObj.username = 'Username must be at least 6 characters'
		}
		if (username.length > 40){
			errorsObj.username = 'Username must be 40 characters or less'
		}
		if (!email){
			errorsObj.email = 'Email is required'
		}
		if (!isValidEmail(email)) {
			errorsObj.email = 'Email is invalid'
		}
		
		if (!Object.values(errorsObj).length) {
			console.log('DISPATCHING')
			console.log(username, 'USERNAME')
			const data = await dispatch(
			  signUp(
				name,
				username,
				email,
				password,
				)
			)

			if (data) {
			  let dataErrors = {};
			  data.forEach((error) => {
				const errorsSplit = error.split(" :");
				dataErrors[errorsSplit[0]] = errorsSplit[1];
			  });
			  errorsObj = { ...errorsObj, ...dataErrors };
			} else {
			  closeModal();
			}
		  }
	  
		  if (Object.values(errorsObj).length) {
			setErrors(errorsObj);
		  }
	};

	return (
		<div className="login_modal_container">
		  <h1>Sign Up</h1>
		  <form onSubmit={handleSubmit}>
			<label>
			  Email
			  <input
				type="text"
				className="login_input"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			  />
			</label>
			<p className="errors-sign-up">{errors.email ? errors.email : ''}</p>
			<label>
			  Username
			  <input
				type="text"
				className="login_input"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
			  />
			</label>
			<p className="errors-sign-up">{errors.username ? errors.username : ''}</p>
			<label>
			  Full Name
			  <input
				type="text"
				className="login_input"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			  />
			</label>
			<p className="errors-sign-up">{errors.name ? errors.name : ''}</p>
			<label>
			  Password
			  <input
				className="login_input"
				id="login_input3"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			  />
			</label>
			<label>
			  Confirm Password
			  <input
				className="login_input"
				id="login_input4"
				type="password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				required
			  />
			</label>
			<p className="errors-sign-up">{errors.password ? errors.password : ''}</p>
			<button type="submit" className="loginButton">
			  Sign Up
			</button>
		  </form>
		  <div className="sign_up_container">
			<div >Already a user?</div>
			<OpenModalButton
			  className="loginButton"
			  buttonText="Log In"
			  modalComponent={<LoginFormModal />}
			/>
		  </div>
		</div>
	  );
}

export default SignupFormModal;
