import React from "react";
import {makeStyles} from "@material-ui/core";
import MainTaskOperationPanel from "./operations/tasks/MainTaskOperationPanel";
import MainLabelOperationPanel from "./operations/labels/MainLabelOperationPanel";

const useStyles = makeStyles({
    sideMenu: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: "0px",
        width: "320px",
        height: "100%",
        backgroundColor: "lightgrey",
    },
})

export default function SideMenu() {
    return (
        <div className={useStyles().sideMenu}>
            <MainTaskOperationPanel/>
            <MainLabelOperationPanel/>
        </div>
    )
}