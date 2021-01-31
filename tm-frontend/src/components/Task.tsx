import React from 'react';
import { TaskDTO } from '../dto/task.dto';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface Props {
    data: TaskDTO;
}

const Task = ({ data }: Props) => {
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
                <Button size="small" variant="contained">Edit</Button>
                <Button size="small" variant="contained">Delete</Button>
            </CardActions>
        </Card>
    )
}

export default Task;