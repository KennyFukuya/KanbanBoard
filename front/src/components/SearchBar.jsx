import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 12,
    }
}));

function SearchBar(props) {
    const [filterValue, setFilterValue] = useState('');
    const classes = useStyles();
    const { onClick } = props;

    return (
        <Paper className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder='Search'
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onClick(filterValue) }
            />
            <IconButton 
                type='submit' 
                className={classes.iconButton}
                onClick={() => onClick(filterValue)}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

SearchBar.propTypes = {
    onClick: PropTypes.func.isRequired
};


export default SearchBar;