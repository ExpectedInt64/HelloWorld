import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// react.school/material-ui

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    customColor: {
        // or hex code, this is normal CSS background-color
        backgroundColor: "grey"
    },
    customHeight: {
        minHeight: 200
    },
    offset: theme.mixins.toolbar
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar
                color={"default"}
                className={"mainAppbar"}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        KamelPortal
                    </Typography>
                    <IconButton color="inherit" onClick={() => console.log("1")}>
                        1
                    </IconButton>
                    <IconButton color="inherit" onClick={() => console.log("2")}>
                        2
                    </IconButton>
                    <IconButton color="inherit" onClick={() => console.log("3")}>
                        3
                    </IconButton>
                    <IconButton color="inherit" onClick={() => console.log("4")}>
                        4
                    </IconButton>
                    <IconButton color="inherit" onClick={() => console.log("5")}>
                        5
                    </IconButton>
                    <IconButton
                        color="inherit"
                        onClick={() => console.log("6")}
                    >
                        6
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </React.Fragment>
    );
}
