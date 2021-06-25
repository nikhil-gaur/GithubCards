import React from 'react';
import './Card.css';
import db from "./firebase";
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function Card( {Key, userId, profilePic, name, location, followers, bio, profileURL } ) {

    const handleCardDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        db
        .collection("users")
        .doc(userId)
        .delete()

        toast.success('User Deleted Successfully', {position: toast.POSITION.BOTTOM_LEFT, autoClose:2000})
    };

    const profilePageOpen = (e) => {
        e.preventDefault();
        window.open(profileURL)

    };

    return (
        <Tooltip title={(bio ? bio: "I am working on my bio")} arrow disableFocusListener>
            <div className="card" onClick={profilePageOpen}>
                <img className="userImage" src={profilePic} alt="" />
                <CloseIcon className="closeIcon" onClick={handleCardDelete} fontSize="small"/>
                <h1>{name}</h1>
                <p>Location: {(location) ? location: "World"}</p>
                <p>Followers: {followers}</p>
            </div>
        </Tooltip>
        
    )
}

export default Card
