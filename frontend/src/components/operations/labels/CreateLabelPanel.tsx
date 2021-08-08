import React, {useState} from "react";
import {Button, makeStyles, TextField} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
    inputContainer: {
        backgroundColor: "#fff",
        borderStyle: "solid",
        borderRadius: "10px",
        borderColor: "#f50057",
        width: "85%",
        marginLeft: "32px",
        marginTop: "10px",
        paddingBottom: "10px",
    },
    inputElement: {
        marginTop: "10px",
        marginLeft: "32px",
        width: "80%",
    },
    inputHeader: {
        marginBottom: "0px",
        marginTop: "10px",
        marginLeft: "32px",
        width: "80%",
    }
})

export default function CreateLabelPanel() {
    const [name, setName] = useState<string>();

    async function createLabel() {
        await axios.post("/api/label/", {label: {name: name}});
    }

    return (
        <form autoComplete="off">
            <div className={useStyles().inputContainer}>
                <p className={useStyles().inputHeader}>
                    To create a Label please enter:
                </p>
                <TextField
                    required
                    label="Name"
                    variant="outlined"
                    className={useStyles().inputElement}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <Button variant="contained" color="secondary" className={useStyles().inputElement} onClick={() => createLabel()}>Create Label</Button>
            </div>
        </form>
    )
}