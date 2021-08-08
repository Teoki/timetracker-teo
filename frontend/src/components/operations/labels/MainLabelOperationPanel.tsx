import React from "react";
import CreateLabelPanel from "./CreateLabelPanel";
import UpdateLabelPanel from "./UpdateLabelPanel";
import DeleteLabelPanel from "./DeleteLabelPanel";

export default function MainLabelOperationPanel() {
    return (
        <div>
            <CreateLabelPanel/>
            <UpdateLabelPanel/>
            <DeleteLabelPanel/>
        </div>
    )
}