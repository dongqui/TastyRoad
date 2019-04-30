import React from "react";
import './login.css'

const Login = () => {
  return (
    <div className="login-container" >
      <div className="login-title-container">
        <div className="login-title">
          <span className="letter">T</span>
          <span className="letter">a</span>
          <span className="letter">s</span>
          <span className="letter">t</span>
          <span className="letter">y</span>
          <span className="letter"> </span>
          <span className="letter">R</span>
          <span className="letter">o</span>
          <span className="letter">a</span>
          <span className="letter">d</span>
        </div>
        <p className="login-subtitle">for codestates</p>
      </div>
      <div className='slack-btn-container' onClick={() => {window.location='https://slack.com/oauth/authorize?scope=identity.basic identity.avatar&client_id=383778302023.408791625351'}}>
        <img alt='slack_login' src="/img/slack_btn.png"/>
      </div>

      <div className="guest-btn-container">
        <img alt='guest_login' id="guest-login-img" src="/img/door.png"/>
        <span id="guest-login-text">Guest Login</span>
      </div>
    </div>
  )
};

export default Login;