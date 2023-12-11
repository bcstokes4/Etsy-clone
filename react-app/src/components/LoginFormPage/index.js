import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import SignupFormModal from '../SignupFormModal'
import OpenModalButton from '../OpenModalButton'
import { useModal } from "../../context/Modal";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
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
            className="login_input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            className="login_input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="loginButton">
          Log In
        </button>
        <div className="errors">
          {errors.map((error, idx) => (
            <p key={idx}>{error.split(" :")[1]}</p>
          ))}
        </div>
      </form>
      <div className="sign_up_demo">
        <button onClick={demoLogin} className="loginButton">
          Demo User
        </button>
        <div className="sign_up_container">
          <div>Haven't signed up yet?</div>
          <OpenModalButton
            className="loginButton"
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
