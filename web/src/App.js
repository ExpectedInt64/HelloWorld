import React from "react";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {Welcome} from "./Welcome";
import {observer} from "mobx-react-lite";
import {Todos} from "./Todo";
import {Kamels} from "./API"
import ButtonAppBar from './Navbar';
import { v4 as uuidv4 } from 'uuid';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useHistory
} from "react-router-dom";

function App() {
    const history = useHistory();

    return (

        <div>
            <ButtonAppBar/>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <center>
                        <Switch>
                            <Route path={"/welcome/:id"} component={Welcome}></Route>
                            <Route exact path={"/"} render={() => <h1>Startside</h1>}/>
                            <Route render={() => <h1>404</h1>}/>
                        </Switch>
                    </center>
                </Grid>
                <Grid item xs={12}>
                    <center><TextField id={"nameField"} inputProps={{ "data-testid": "name-input" }} label={"Navn"}></TextField></center>
                </Grid>
                <Grid item xs={12}>
                    <center><Button variant="contained" data-testid={"knap"} onClick={() => {
                        let name = (document.getElementById("nameField").value)
                        history.push("/welcome/" + name);
                        Todos.addTodo({name: name});
                        Kamels.addKamel(name,5);
                    }}>Halløj!</Button></center>
                </Grid>
                <Grid item xs={6}>
                    <center>
                        {Todos.todos.map((todo) => {
                            return <div key={todo.id}>{todo.id}:{todo.name}</div>
                        })}
                    </center>
                </Grid>
                <Grid item xs={6}>
                    <center>
                        {Kamels.Kamels.map((Kamels)=> {
                            return <div key={uuidv4()}>{Kamels.name} : {Kamels.age}</div>
                        })}
                    </center>
                </Grid>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </div>
    );
}

export default observer(App);