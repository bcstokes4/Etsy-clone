import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import SignupFormModal from '../SignupFormModal'
import OpenModalButton from '../OpenModalButton'
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };
  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password")).then(closeModal());
  };
  return (
    <div className="login_modal_container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            id="login_input2"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            id="login_input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <div className="errors">
          {errors.map((error, idx) => (
            <p key={idx}>{error.split(" :")[1]}</p>
          ))}
        </div>
        <button type="submit" className="loginButton" id="login-button">
          Log In
        </button>
      </form>
      <div className="sign_up_demo">
        <button onClick={demoLogin} className="loginButton">
          Demo User
        </button>
        <div className="sign_up_container">
          <div>Haven't signed up yet?</div>
          <OpenModalButton
            id="go-to-signup"
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginFormModal;
