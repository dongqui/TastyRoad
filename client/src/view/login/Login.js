import React from "react";
import './login.css'

class Login extends React.Component {




  render() {

    return (
      <div className="loginCon" >
        <div className="loginTitleCon">
          <div className="loginTitle">
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
          <p className="loginSubtitle">for codestates</p>
        </div>
        <div className='slackButtonCon' style={{cursor: 'pointer'}} onClick={function(){window.location='https://slack.com/oauth/authorize?scope=identity.basic identity.avatar&client_id=383778302023.407271306386'}}>
          <div style={{width: '15%', height: '88%', backgroundColor: 'white'}}>
            <img style={{width: '100%', height: '100%'}} src="https://regmedia.co.uk/2016/01/12/slack.jpg?x=1200&y=794"/>
          </div>
          <div className='slackButton'>
            <h4 >Sign in with Slack</h4>
          </div>
        </div>
      </div>
    )
  }
}
export default Login;