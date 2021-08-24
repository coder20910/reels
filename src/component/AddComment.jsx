import React, {useState} from 'react';

import { database } from '../firebase';

import TextField from '@material-ui/core/TextField';
import Button  from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/styles";

function AddComment({userData, postData}) {
    const useStyles = makeStyles({
        cbtn:{
            marginRight:'1%',
            marginTop: '3%'
        },
        
    });
    console.log(postData.comments, postData.pid);
    const classes = useStyles();
    const [commentText, setText] = useState();
    
    const handleText = (e)=> {
        setText(e.target.value);
    }

    function handleOnEnter(){
        let obj = {
            text: commentText,
            username: userData.username
        }
        let prevComments = postData.comments;
        try{
            database.posts.doc(postData.pid).update({
                "comments": [...prevComments, obj]
            });
            setText('');
        }
        catch{
            console.log("Error");
        }
    }
    return (
        <div className="addCommentBox">
            <TextField fullWidth={true} value={commentText} label="Add a comment" onChange={(e)=>handleText(e)} />
            <Button onClick={handleOnEnter} disabled={commentText === '' ? true : false} className={classes.cbtn} color="primary">Post</Button>
        </div>
    )
}

export default AddComment;
