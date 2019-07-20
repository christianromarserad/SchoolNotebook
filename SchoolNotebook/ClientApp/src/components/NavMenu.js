import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router-dom';
import { logoutActionCreator } from '../store/User'

const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    }
}));

function NavMenu(props) {
    const [searchKey, setSearchKey] = useState('');
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography style={{ flexGrow: 1 }} variant="h6" color="inherit">
                    News
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search..."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'Search' }}
                        value={searchKey}
                        onChange={(event) => setSearchKey(event.target.value)}
                        onKeyPress={(event) => event.key == 'Enter' ? props.history.push("/notebookSearch/" + searchKey) : null}
                    />
                </div>
                <Button color="inherit" onClick={props.logout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}

function mapStateToProps(state) {
    return {
        name: state.user.givenName + ' ' + state.user.familyName
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logout: logoutActionCreator }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavMenu));
