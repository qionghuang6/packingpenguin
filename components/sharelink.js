import { useState } from 'react';
import { TextField, Button } from '@material-ui/core'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const Sharelink = ({checklistId}) =>{
    const shareUrl = SERVER_URL + checklistId;
    const [textValue, changeText] = useState(shareUrl);
    const copyButton = (
        <Button 
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
        <TextField
            label="Share Link for Editing"
            style = {{width: "50ch"}}
            value={textValue}
            variant="outlined"
            margin="dense"
            InputProps={{endAdornment: copyButton}}
        />
    );
}

export default Sharelink