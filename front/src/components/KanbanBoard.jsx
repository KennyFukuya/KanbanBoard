import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SearchBar from './SearchBar';
import TaskColumn from './TaskColumn';
import KanbanModal from './KanbanModal';
import AuthServices from '../helpers/AuthServices';
import { defaultData } from '../constants/dataConstants';
import '../styles/KanbanBoard.css';

const useStyles = makeStyles(() => ({
    headerMenu: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '32px 12px 32px 12px'
    },
    contentContainer: {
        display: 'flex'
    }
}));

const defaultColumns = {
    'ToDo': {
        title: 'To Do',
        cards: []
    },
    'Doing': {
        title: 'Doing',
        cards: []
    },
    'Done': {
        title: 'Done',
        cards: []
    }
};

function organizeColumns({ data, columns, setColumns }) {
    let _columns = JSON.parse(JSON.stringify(columns));

    data.forEach(card => {
        _columns[card.lista].cards.push(card);
    });

    setColumns(_columns);
}

function KanbanBoard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardData, setCardData] = useState(defaultData);
    const [filterValue, setFilterValue] = useState('');
    const [columns, setColumns] = useState(defaultColumns);
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
    const [snackBarAlert, setSnackBarAlert] = useState();
    const classes = useStyles();
    let filteredColumns = JSON.parse(JSON.stringify(columns));

    if (filterValue) {
        Object.keys(filteredColumns).forEach(key => {
            filteredColumns[key].cards = 
                filteredColumns[key].cards.filter((e) => e.titulo.toLowerCase().includes(filterValue.toLowerCase()));
        });
    }

    useEffect(() => {
        AuthServices.auth()
            .then(() => {
                AuthServices.getCards()
                    .then(data => {
                        if (!data)
                            return;
                        
                        organizeColumns({ data, columns: defaultColumns, setColumns });
                    })
            });
    }, []);

    useEffect(() => () => AuthServices.removeToken(), []);

    function handleCloseSnackBar() {
        setIsSnackBarOpen(false);
        setSnackBarAlert();
    }

    function enqueueSnackBar(message, type) {
        setIsSnackBarOpen(true);
        setSnackBarAlert(
            <MuiAlert 
                elevation={6} 
                variant="filled" 
                onClose={() => handleCloseSnackBar()}
                severity={type}
            >
                {message}
            </MuiAlert>
        );
    }

    function onDragEnd(result) {
        const from = result && result.source;
        const to = result && result.destination;
        let _columns, fromCards, toCards, card;

        if (!to || !from)
            return;

        _columns = JSON.parse(JSON.stringify(columns));
        fromCards = _columns[from.droppableId].cards;
        toCards = _columns[to.droppableId].cards;
        card = fromCards.splice(fromCards.findIndex(e => e.id === result.draggableId), 1)[0];

        card.lista = to.droppableId;

        toCards.splice(to.index, 0, card);

        if (to.droppableId === from.droppableId) {
            setColumns(_columns);
        } else {
            handleSaveCard({ data: card, _columns });
        }
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setCardData(defaultData);
    }

    function handleDeleteCard(id) {
        AuthServices.deleteCard(id)
            .then(data => {
                if (!data)
                    return;

                if (data && data.errorMessage) 
                    return enqueueSnackBar(data.errorMessage, 'error');

                organizeColumns({ data, columns: defaultColumns, setColumns });
                enqueueSnackBar('Task deleted!', 'success');
            });
    }

    function handleOpenModal(id) {
        let foundCard = defaultData;

        if (id) {
            Object.keys(columns).forEach(key => {
                let cards = columns[key].cards.filter(e => {
                    return e.id === id
                })
                
                if (cards && cards.length) 
                    foundCard = cards[0]
            })
        }

        setIsModalOpen(true);
        setCardData(foundCard);
    }

    function handleSaveCard({ data, _columns = columns }) {
        if (data && data.id) {
            AuthServices.editCard(data)
                .then(response => {
                    if (!response)
                        return;
                    
                    if (response && response.errorMessage) 
                        return enqueueSnackBar(response.errorMessage, 'error');

                    const newColumns = JSON.parse(JSON.stringify(_columns));
                    const cards = newColumns[data.lista].cards;
                    
                    cards[cards.findIndex(e => e.id === data.id)] = response;

                    setColumns(newColumns); 
                    enqueueSnackBar('Task edited!', 'success');
                })
        } else {
            AuthServices.saveCard(data)
                .then(response => {
                    if (!response)
                        return;

                    if (response && response.errorMessage) 
                        return enqueueSnackBar(response.errorMessage, 'error');

                    organizeColumns({ data: [response], columns, setColumns });
                    enqueueSnackBar('Task created!', 'success');
                });
        }

        handleCloseModal();
    }

    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' align='center'>
                        Kanban Board
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.headerMenu}>
                <Button 
                    color='primary' 
                    onClick={() => handleOpenModal()}
                    variant='contained' 
                >
                    Add new Task
                </Button>

                <SearchBar 
                    onClick={filter => setFilterValue(filter)}
                />
            </div>
            
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Grid container spacing={0}>
                    {Object.keys(filteredColumns).map((key, index) => (
                        <Grid item xs={4} key={index}>
                            <TaskColumn 
                                cards={filteredColumns[key].cards}
                                onDeleteCard={id => handleDeleteCard(id)}
                                onEditCard={id => handleOpenModal(id)}
                                title={filteredColumns[key].title}
                                keyId={key}
                            />
                        </Grid>
                    ))}
                </Grid>
            </DragDropContext>

            <KanbanModal 
                cardData={cardData}
                onCloseModal={() => handleCloseModal()}
                onSaveCard={(data) => handleSaveCard({ data })}
                isModalOpen={isModalOpen}
                enqueueSnackBar={enqueueSnackBar}
            />

            <Snackbar open={isSnackBarOpen} autoHideDuration={3000} onClose={() => handleCloseSnackBar()}>
                {snackBarAlert}
            </Snackbar>
        </div>
    );
}

export default KanbanBoard;
