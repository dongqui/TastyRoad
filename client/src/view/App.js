import Login from './login/Login';
import React from 'react'
import { BrowserRouter as Router, Redirect} from "react-router-dom";
import Route from "react-router-dom/Route";
import Main from "./Main/Main";
import axios from "axios/index";

class App extends React.Component {

  state = {};

  // componentDidMount() {
  //   axios.get('http://localhost:3001/auth/slack')
  //     .then(result => {
  //       this.setState({user: result.data})
  //     })
  //     .catch(err => console.log('request user err', err))
  // }

  render() {
    return (
      <Router>
        <switch>
            <Main/>
          {/*<Route path='/' exact render={() => (*/}
            {/*this.state.user ? (<Main user={this.state.user}/> ) : (<Redirect to='/login' />)*/}
          {/*)} />*/}
          {/*<Route path='/login' exact render={() => (*/}
            {/*this.state.user ? (<Redirect to='/' />) : (<Login />)*/}
          {/*)} />*/}
        </switch>
      </Router>
    )
  }
}

export default App