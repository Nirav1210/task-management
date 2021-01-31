import React from 'react';
import { TaskDTO } from '../dto/task.dto';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { TaskAPI } from '../api/task.api';

interface Props {
    data: TaskDTO;
    onTaskDeleted: (taskId: number) => void;
}

const Task = ({ data, onTaskDeleted }: Props) => {
    
    const deleteTask = async () => {
        await TaskAPI.deleteOne(data.id);
        onTaskDeleted(data.id);
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                {data.title}
                </Typography>
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