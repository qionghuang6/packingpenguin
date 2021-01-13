import { useState } from 'react';
import { TextField, Button, Paper, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const useStyles = makeStyles(() => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    iconButton: {
      padding: 8,
    },
}));

const Sharelink = ({checklistId}) =>{
    const classes = useStyles();
    const shareUrl = `${SERVER_URL}${checklistId}`.replace('https://', '').replace('http://', '');
    const [textValue, changeText] = useState(shareUrl);
    const matches = useMediaQuery('(min-width:374px)');
    const textBoxWidth = matches ? "34ch": "24ch";
    const copyButton = (
        <Button 
            className={classes.iconButton}
            variant="contained" 
            color="primary"
            onClick={() => {
                navigator.clipboard.writeText(shareUrl)
                changeText('Copied!')       
            }}
            ><FileCopyOutlinedIcon/>
        </Button>
    )
    console.log(textBoxWidth);
    return (
        <Paper elevation={0} className={classes.root}>
            <TextField
                label="Share Link for Editing"
                style = {{width: textBoxWidth }}
                value={textValue}
                variant="outlined"
                margin="dense"
            />
            {copyButton}
        </Paper>
    );
}

export default Sharelink