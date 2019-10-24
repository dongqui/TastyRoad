import Login from './login/login';
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect} from "react-router-dom";
import Route from "react-router-dom/Route";
import Main from "./main/main";
import axios from "axios/index";

const App = () => {
  const [ user, setUser ] = useState(null);
  useEffect(() => {
    const checkLogin = async () => {
      const result = await axios.get('http://localhost:3001/auth/slack');

    };

      .then(result => {
        this.setState({user: result.data})
      })
      .catch(err => console.log('request user err', err))
  }, []);
};
class App extends React.Component {

  state = {};

  componentDidMount() {

  }

  render() {
    return (
      <Router>
        <switch>
          <Route path='/' exact render={() => (
            this.state.user ? (<Main user={this.state.user}/> ) : (<Redirect to='/login' />)
          )} />
          <Route path='/login' exact render={() => (
            this.state.user ? (<Redirect to='/' />) : (<Login />)
          )} />
        </switch>
      </Router>
    )
  }
}

export default App