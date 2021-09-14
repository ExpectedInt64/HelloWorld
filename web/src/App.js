import React from "react";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {Welcome} from "./Welcome";
import {observer} from "mobx-react-lite";
import {Todos} from "./Todo";
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
        <div className={"App"} style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <header className={"App-header"}>


                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <center>
                        <Switch>
                            <Route path={"/welcome/:id"} component={Welcome}></Route>
                            <Route exact path={"/"} render={()=><h1>Startside</h1>}/>
                            <Route render={()=><h1>404</h1>}/>
                        </Switch>
                        </center>
                    </Grid>
                    <Grid item xs={12}>
                        <center><TextField id={"nameField"} label={"Navn"}></TextField></center>
                    </Grid>
                    <Grid item xs={12}>
                        <center><Button variant="contained" onClick={() => {
                            let name = (document.getElementById("nameField").value)
                            history.push("/welcome/"+name);
                            Todos.addTodo({name: name})
                        }}>Halløj!</Button></center>
                    </Grid>
                    <Grid item xs={12}>
                        <center>
                        {Todos.todos.map((todo) => {
                            return <div key={todo.id}>{todo.id}:{todo.name}</div>
                        })}
                        </center>
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </header>
        </div>
    );
}

export default observer(App);