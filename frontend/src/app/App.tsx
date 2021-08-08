import React from "react";
import SideMenu from "../components/SideMenu";
import {CssBaseline, makeStyles} from "@material-ui/core";
import Header from "../components/Header";
import TaskTable from "../components/TaskTable";

const useStyles = makeStyles({
    appMain: {
        paddingLeft: "320px",
        width: "100%",
        backgroundColor: "lightgrey"
    }
})

function App() {
    return (
        <>
            <SideMenu/>
            <div className={useStyles().appMain}>
                <Header/>
                <TaskTable/>
            </div>
            <CssBaseline/>
        </>
    );
}

export default App;
