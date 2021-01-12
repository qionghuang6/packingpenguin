import { useState } from 'react';
import { TextField, Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    iconButton: {
      padding: 8,
    },
}));

const Sharelink = ({checklistId}) =>{
    const classes = useStyles();
    const shareUrl = SERVER_URL + checklistId;
    const [textValue, changeText] = useState(shareUrl);

    const copyButton = (
        <Button 
            component="form" className={classes.iconButton}
            variant="contained" 
            color="primary"
            onClick={() => {
                navigator.clipboard.writeText(shareUrl)
                changeText('Copied!')       
            }}
            ><FileCopyOutlinedIcon/>
        </Button>
    )

    return (
        <Paper component="form" elevation={0} className={classes.root}>
            <TextField
                component="form" 
                label="Share Link for Editing"
                style = {{width: "50ch"}}
                value={textValue}
                variant="outlined"
                margin="dense"
            />
            {copyButton}
        </Paper>
    );
}

export default Sharelink