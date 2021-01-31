import React from 'react';
import { TaskDTO, TaskStatus } from '../dto/task.dto';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Chip, Container } from '@material-ui/core';
import { TaskAPI } from '../api/task.api';

interface Props {
    data: TaskDTO;
    onTaskDelete: (taskId: number) => void;
    onTaskUpdate: (task: TaskDTO) => void;
}

const Task = ({ data, onTaskDelete, onTaskUpdate }: Props) => {
    
    const deleteTask = async () => {
        await TaskAPI.deleteOne(data.id);
        onTaskDelete(data.id);
    };

    const getStatusText = (status: TaskStatus) => {
        switch(status) {
            case TaskStatus.Created:
                return 'Created';
            case TaskStatus.InProgress:
                return 'In Progress';
            case TaskStatus.Done:
                return 'Done';
            default:
                return '';
        }
    };

    const getStatusColor = (status: TaskStatus) => {
        switch(status) {
            case TaskStatus.InProgress:
                return '#ff7961';
            case TaskStatus.Done:
                return '#76ff03';
            default:
                return '';
        }
    };

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">
                    {data.title}
                </Typography>
                <Chip 
                    label={getStatusText(data.status)} 
                    style={{ backgroundColor: getStatusColor(data.status) }} 
                />
                <Typography variant="body2" component="p">
                    {data.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Container>
                    <Button 
                        size="small" 
                        variant="contained" 
                        color="primary" 
                        style={{ margin: 5 }}
                        onClick={() => onTaskUpdate(data)}
                    >Edit
                    </Button>
                    <Button 
                        size="small" 
                        variant="contained" 
                        color="secondary"
                        style={{ margin: 5 }}
                        onClick={deleteTask}
                    >Delete
                    </Button>
                </Container>
            </CardActions>
        </Card>
    )
}

export default Task;