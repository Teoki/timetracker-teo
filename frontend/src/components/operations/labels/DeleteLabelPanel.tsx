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

export default function DeleteLabelPanel() {
    const [id, setId] = useState<string>();

    async function deleteLabel() {
        const response = await axios.delete("/api/label/" + id);
        console.log(response);
        if (response.status === 400) {
            console.log()
        }
    }

    return (
        <form autoComplete="off">
            <div className={useStyles().inputContainer}>
                <p className={useStyles().inputHeader}>
                    To delete a Label please enter:
                </p>
                <TextField
                    required
                    label="ID"
                    variant="outlined"
                    className={useStyles().inputElement}
                    value={id}
                    onChange={(event) => setId(event.target.value)}
                />
                <Button variant="contained" color="secondary" className={useStyles().inputElement} onClick={() => deleteLabel()}>Delete Label</Button>
            </div>
        </form>
    )
}