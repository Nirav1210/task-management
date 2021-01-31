import { Button, makeStyles, MenuItem, Modal, Select, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { TaskAPI } from '../api/task.api';
import { TaskDTO, TaskStatus } from '../dto/task.dto';

interface Props {
    open: boolean;
    handleClose: () => void;
    onTaskEdited: (task: TaskDTO) => void;
    data: TaskDTO | undefined;
}

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}
  

const EditTaskModal = ({ open, handleClose, onTaskEdited, data }: Props) => {
    const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
        formField: {
          width: "100%",
          marginBottom: 10,
        }
    }));

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState<undefined | string>(undefined);
    const [status, setStatus] = React.useState<number>(TaskStatus.Created);

    useEffect(() => {
        if(data) {
            setTitle(data.title);
            setDescription(data.description);
            setStatus(data.status);
        }
    }, [data]);

    const editTask = async () => {
        if(!data) return;

        try {
            const resp = await TaskAPI.updateOne(data.id, {
                title, description, status
            });
            onTaskEdited(resp);
        } catch(error) {
            console.log('update task failed', error);
        }
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Edit Task</h2>
          <TextField 
            label="Title" 
            variant="outlined"
            className={classes.formField} 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <TextField 
            label="Description" 
            variant="outlined"
            className={classes.formField}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <Select 
            variant="outlined"
            value={status} 
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className={classes.formField}
          >
            <MenuItem value={TaskStatus.Created}>Created</MenuItem>
            <MenuItem value={TaskStatus.InProgress}>In Progress</MenuItem>
            <MenuItem value={TaskStatus.Done}>Done</MenuItem>
          </Select>
          <Button
            size="small" 
            variant="contained" 
            color="primary" 
            onClick={editTask}
          >Edit</Button>
        </div>
      );

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >{body}</Modal>
        </div>
    )
}

export default EditTaskModal;