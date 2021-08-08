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

export default function UpdateLabelPanel() {
    const [name, setName] = useState<string>();
    const [id, setId] = useState<string>();

    async function updateLabel() {
        await axios.put("/api/label/" + id, {updateLabel: {name: name}});
    }

    return (
        <form autoComplete="off">
            <div className={useStyles().inputContainer}>
                <p className={useStyles().inputHeader}>
                    To update a Label please enter:
                </p>
                <TextField
                    required
                    label="ID"
                    variant="outlined"
                    className={useStyles().inputElement}
                    value={id}
                    onChange={(event) => setId(event.target.value)}
                />
                <TextField
                    label="new Name"
                    variant="outlined"
                    className={useStyles().inputElement}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <Button variant="contained" color="secondary" className={useStyles().inputElement} onClick={() => updateLabel()}>Update Label</Button>
            </div>
        </form>
    )
}