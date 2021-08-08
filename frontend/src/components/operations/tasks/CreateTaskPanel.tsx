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

export default function CreateTaskPanel() {
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();

    async function createTask() {
        const response = await axios.post("/api/task/", {task: {name: name, description: description}});
        console.log(response);
        window.location.reload();
    }

    return (
        <form autoComplete="off">
            <div className={useStyles().inputContainer}>
                <p className={useStyles().inputHeader}>
                    To create a Task please enter:
                </p>
                <TextField
                    required
                    label="Name"
                    variant="outlined"
                    className={useStyles().inputElement}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField required
                           label="Description"
                           variant="outlined"
                           className={useStyles().inputElement}
                           value={description}
                           onChange={(event) => setDescription(event.target.value)}
                />
                <Button variant="contained" color="primary" className={useStyles().inputElement} onClick={() => createTask()}>Create Task</Button>
            </div>
        </form>
    )
}