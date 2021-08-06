import * as React from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import {useState} from "react";

function App() {

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
        .then(resp=>resp.json())
        .then(resp=>{
            console.log(resp)
            setData(resp)})
  }, []);

  /*function openCreateTaskInputField() {
    return <div>Hi</div>;
  }*/

  return (
    <div>
      <MaterialTable
          title="All Tasks"
          data={data}
          columns={columns}
      />
      <Button /*onClick={openCreateTaskInputField}*/ variant="contained" color="primary">
        Create Task
      </Button>

    </div>
  );
}

export default App;
