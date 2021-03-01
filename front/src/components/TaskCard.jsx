import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import '../styles/TaskCard.css';

const useStyles = makeStyles(() => ({
    root: {
        marginBottom: 16,
        overflowWrap: 'break-word'
    },
    cardTitle: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: 30
    },
    cardContent: {
        fontSize: 12
    },
    cardHeader: { 
        display: 'flex', 
        justifyContent: 'space-between'
    },
    editButton: {
        float: 'right'
    },
    groupButton: {
        display: 'inline-flex'
    }
}));

function TaskCard(props) {
    const { data, onDeleteCard, onEditCard } = props;
    const classes = useStyles(); 

    return (
        <Card className={classes.root}>
            <CardContent>
                <div className={classes.cardHeader}>
                    <Typography 
                        className={classes.cardTitle}
                    >
                        {data.titulo}
                    </Typography>
                    <div className={classes.groupButton}>
                        <IconButton 
                            onClick={() => onDeleteCard(data.id)}
                        >
                            <DeleteIcon fontSize='small'/>
                        </IconButton>                        
                        <IconButton 
                            onClick={() => onEditCard(data.id)}
                        >
                            <EditIcon fontSize='small'/>
                        </IconButton>
                    </div>
                </div>
                <Divider/>
                <ReactMarkdownWithHtml 
                    allowDangerousHtml 
                    className={classes.cardContent}
                    plugins={[gfm]}
                >
                    {data.conteudo}
                </ReactMarkdownWithHtml>
            </CardContent>
        </Card>
    );
}

TaskCard.propTypes = {
    data: PropTypes.object.isRequired,
    onDeleteCard: PropTypes.func.isRequired,
    onEditCard: PropTypes.func.isRequired
};

export default TaskCard;
