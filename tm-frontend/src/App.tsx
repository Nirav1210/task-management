import React, { useEffect, useState } from 'react';
import './App.css';
import { TaskAPI } from './api/task.api';
import { TaskDTO } from './dto/task.dto';
import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import Task from './components/Task';
import CreateTaskModal from './components/CreateTaskModal';
import EditTaskModal from './components/EditTaskModal';

function App() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<undefined | TaskDTO>(undefined);

  const addTasks = (task: TaskDTO) => {
    setTasks([...tasks, task]);
  }

  const deleteTask = (taskId: number) => {
    const updatedList = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedList) ;
  }

  const editTask = (task: TaskDTO) => {
    const updatedList = tasks.map((item) => {
      if(task.id === item.id) {
        return task;
      }
      return item;
    });
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
        open={createModalOpen} 
        handleClose={() => setCreateModalOpen(false)}
        onTaskCreated={addTasks}
      />
      <EditTaskModal
        open={editModalOpen} 
        handleClose={() => setEditModalOpen(false)}
        onTaskEdited={editTask}
        data={taskToEdit}
      />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button color="inherit" onClick={() => setCreateModalOpen(true)}>Add</Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={ 1 } style={{ padding: 10 }}>
        {
          tasks.map((task) => {
            return (
              <Grid item xs={ 3 } key={ task.id }>
                <Task 
                  data={ task } 
                  onTaskDelete={deleteTask} 
                  onTaskUpdate={(item: TaskDTO) => {
                    setTaskToEdit(item);
                    setEditModalOpen(true);
                  }}
                />
              </Grid>
            );
          })
        }
      </Grid>
    </div>
  );
}

export default App;
