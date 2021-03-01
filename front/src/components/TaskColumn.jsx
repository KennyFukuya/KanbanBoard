import React from 'react';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TaskCard from './TaskCard';

const useStyles = makeStyles(() => ({
    paper: {
        backgroundColor: '#F5F5F5',
        padding: 12,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12,
        minHeight: 200
    },
    title: {
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 600
    }
}));

function TaskColumn(props) {
    const { title, cards, onDeleteCard, onEditCard, keyId } = props;
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Typography 
                className={classes.title}
            > 
                {title} 
            </Typography>
            <Droppable droppableId={keyId} key={keyId}>
                {(provided, snapshot) => (
                    <div 
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                        style={{
                            backgroundColor: snapshot.isDraggingOver ? '#5682A3' : '#F5F5F5'
                        }}
                    >
                        {cards.map((element, index) => (
                            <Draggable 
                                key={element.id} 
                                draggableId={element.id} 
                                index={index}
                            >
                                {(provided) =>  (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef} 
                                    >
                                        <TaskCard
                                            data={element} 
                                            onDeleteCard={id => onDeleteCard(id)}
                                            onEditCard={id => onEditCard(id)}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Paper>
    );
}

TaskColumn.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
    onDeleteCard: PropTypes.func.isRequired,
    onEditCard: PropTypes.func.isRequired,
    keyId: PropTypes.string.isRequired
};

export default TaskColumn;
