import React from "react";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function App() {
  return (
      <Router>
        <div>
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <NameForm/>
              </Grid>
              <Grid item xs={6}>
              </Grid>
            </Grid>

          </div>


          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/topics">
              <Topics />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

function getName(name){
  console.log("Test")
  return <h1>{name}</h1>
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <center>
            <h1 value={""}>Enter your name</h1>
            <TextField label={"Name"} value={this.state.value} onChange={this.handleChange} onKeyUp={(e)=>{
              if(e.key==="Enter"){
                this.handleSubmit(e.key);
              }
            }}></TextField>
          </center>
        </form>
    );
  }
}


function Topics() {
  let match = useRouteMatch();

  return (
      <div>
        <h2>Topics</h2>

        <ul>
          <li>
            <Link to={`${match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>
              Props v. State
            </Link>
          </li>
          <li>

          </li>
        </ul>

        {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
        <Switch>
          <Route path={`${match.path}/:topicId`}>
            <Topic />
          </Route>
          <Route path={match.path}>
            <h3>Please select a topic.</h3>
          </Route>
        </Switch>
      </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}