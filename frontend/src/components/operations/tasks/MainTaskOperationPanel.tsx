import React from "react";
import CreateTaskPanel from "./CreateTaskPanel";
import UpdateTaskPanel from "./UpdateTaskPanel";
import DeleteTaskPanel from "./DeleteTaskPanel";

export default function MainTaskOperationPanel() {
    return (
        <div>
            <CreateTaskPanel/>
            <UpdateTaskPanel/>
            <DeleteTaskPanel/>
        </div>
    )
}