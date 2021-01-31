import React, { useEffect, useState } from 'react';
import './App.css';
import { TaskAPI } from './api/task.api';
import { TaskDTO } from './dto/task.dto';
import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import Task from './components/Task';
import CreateTaskModal from './components/CreateTaskModal';

function App() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const addTasks = (task: TaskDTO) => {
    setTasks([...tasks, task]);
  }

  const deleteTask = (taskId: number) => {
    const updatedList = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedList) ;
  }

  useEffect(() => {
    async function fetchAll() {
      const data = await TaskAPI.getAll();
      setTasks(data);
    }

    fetchAll();
  }, []);

  return (
    <div className="App">
      <CreateTaskModal
        open={modalOpen} 
        handleClose={() => setModalOpen(false)}
        onTaskCreated={addTasks}
      />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button color="inherit" onClick={() => setModalOpen(true)}>Add</Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={ 1 } style={{ padding: 10 }}>
        {
          tasks.map((task) => {
            return (
              <Grid item xs={ 3 } key={ task.id }>
                <Task data={ task } onTaskDeleted={deleteTask}/>
              </Grid>
            );
          })
        }
      </Grid>
    </div>
  );
}

export default App;
