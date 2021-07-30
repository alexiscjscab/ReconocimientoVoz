import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import uuid from 'react-uuid';
import { NeonDiv } from './StyledComponents';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#ccc',
    display: "flex",
    flexDirection: 'column',
    marginTop: '10px'
  },
  
  
}));

const DisplayNotes = ({data}) => {

    const classes = useStyles();

    return (
        <div className={classes.root} >
        <Grid container spacing={3}>
            {
                data.map((savedNote => (
                    <Grid item xs={12} sm={4} key={savedNote.group}>
                        
                            <Paper className={classes.paper} elevation={5} variant='outlined' square>{                            savedNote.name.map((string) => (
                                
                                    <NeonDiv as='div' key={uuid()} status={savedNote.group}>{string}</NeonDiv>
                                
                            ))}
                            </Paper>
                        
                    </Grid>
                )))
                            
            }
        </Grid>    
        </div>
    )
}

export default DisplayNotes
