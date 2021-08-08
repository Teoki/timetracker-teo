import * as React from "react";
import {useState} from "react";
import MaterialTable from 'material-table';

export default function TaskTable() {

    const [data, setData] = useState([])
    const columns = [
        {title: "ID", field: "id"},
        {title: "Name", field: "name"},
        {title: "Description", field: "description"},
        {title: "Created at", field: "createdAt"},
        {title: "Updated at", field: "updatedAt"}
    ]

    React.useEffect(() => {
        fetch("/api/task/")
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp);
                setData(resp.tasks);
            })
    }, []);

    return (
        <div>
            <MaterialTable title="All Tasks" data={data} columns={columns}/>
        </div>
    );
}
