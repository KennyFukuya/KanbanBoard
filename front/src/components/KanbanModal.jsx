import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { defaultData } from '../constants/dataConstants';
import '../styles/KanbanBoard.css';

const useStyles = makeStyles((theme) => ({
    confirmButton: {
        float: 'right'
    },
    modalContainer: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    paper: {
        position: 'absolute',
        width: theme.spacing(80),
        height: theme.spacing(50),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
        top: '15%',
        margin:'auto'
    },
    textField: {
        display: 'flex',
        marginBottom: 16,
        marginTop: 12
    },
    title: {
        textAlign: 'center'
    }
}));

function KanbanModal(props) {
    const { cardData, isModalOpen, onCloseModal, onSaveCard, enqueueSnackBar } = props;
    const [data, setData] = useState(cardData);
    const classes = useStyles();

    useEffect(() => {
        setData(cardData);
    }, [cardData])

    function onSave() {
        if (!data.titulo)
            return enqueueSnackBar('Title is required', 'error');
        
        if (!data.conteudo)
            return enqueueSnackBar('Description is required', 'error');

        onSaveCard(data);
        setData(defaultData);
    }

    function onClose() {
        onCloseModal();
        setData(defaultData);
    }

    return (
        <Modal
            open={isModalOpen}
            onClose={() => onClose()}
            className={classes.modalContainer}
        >
            <div className={classes.paper}>
                <Typography 
                    className={classes.title} 
                    variant='h4'
                >
                    {cardData && cardData.id ? 'Edit task' : 'Add a task'}
                </Typography>
                <TextField 
                    className={classes.textField}
                    label='Title' 
                    variant='outlined' 
                    value={data.titulo}
                    onChange={e => setData(
                        { 
                            ...data,
                            titulo: e.target.value 
                        })}
                    required
                />
                <TextField
                    className={classes.textField}
                    label='Description'
                    rows={9}
                    variant='outlined'
                    value={data.conteudo}
                    onChange={e => setData(
                        { 
                            ...data,
                            conteudo: e.target.value 
                        })}
                    multiline
                    required
                />
                <Button 
                    className={classes.confirmButton}
                    variant='contained' 
                    color='primary'
                    onClick={() => onSave()}
                >
                    Save
                </Button>
            </div>
        </Modal>
    );
}

KanbanModal.propTypes = {
    cardData: PropTypes.object,
    onCloseModal: PropTypes.func.isRequired,
    onSaveCard: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    enqueueSnackBar: PropTypes.func.isRequired
};

export default KanbanModal;
