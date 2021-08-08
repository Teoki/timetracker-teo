import React, {useState} from "react";
import {Button, makeStyles, TextField} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
    inputContainer: {
        backgroundColor: "#fff",
        borderStyle: "solid",
        borderRadius: "10px",
        borderColor: "#3f51b5",
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

export default function DeleteTaskPanel() {
    const [id, setId] = useState<string>();

    async function deleteTask() {
        const response = await axios.delete("/api/task/" + id);
        console.log(response);
        if (response.status === 400) {
            console.log()
        }
        window.location.reload();
    }

    return (
        <form autoComplete="off">
            <div className={useStyles().inputContainer}>
                <p className={useStyles().inputHeader}>
                    To delete a Task please enter:
                </p>
                <TextField
                    required
                    label="ID"
                    variant="outlined"
                    className={useStyles().inputElement}
                    value={id}
                    onChange={(event) => setId(event.target.value)}
                />
                <Button variant="contained" color="primary" className={useStyles().inputElement} onClick={() => deleteTask()}>Delete Task</Button>
            </div>
        </form>
    )
}