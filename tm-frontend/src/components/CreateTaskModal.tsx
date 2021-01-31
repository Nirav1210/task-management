import { Button, makeStyles, Modal, TextField } from '@material-ui/core';
import React from 'react';
import { TaskAPI } from '../api/task.api';
import { TaskDTO } from '../dto/task.dto';

interface Props {
    open: boolean;
    handleClose: () => void;
    onTaskCreated: (task: TaskDTO) => void;
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
  

const CreateTaskModal = ({ open, handleClose, onTaskCreated }: Props) => {
    const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
        textField: {
          width: "100%",
          marginBottom: 10,
        }
    }));

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState<undefined | string>(undefined);

    const createTask = async () => {
        try {
            const resp = await TaskAPI.createOne({
                title, description
            });
            onTaskCreated(resp);
        } catch(error) {
            console.log('create task failed', error);
        }

        
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Add Task</h2>
          <TextField 
            id="text-title" 
            label="Title" 
            variant="outlined"
            className={classes.textField} 
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField 
            id="text-description" 
            label="Description" 
            variant="outlined"
            className={classes.textField}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            size="small" 
            variant="contained" 
            color="primary" 
            onClick={createTask}
          >Add</Button>
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

export default CreateTaskModal;