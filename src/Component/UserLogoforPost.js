import React from 'react';
import { useUserContext } from '../UserContext';
import './imagelogo.css';
function UserlogoforPost(){
    const {user} = useUserContext();
    return(
        <>
        <img src={user.imageUrl} alt="user logo" className='userlogoforPost'/>
        </>
    )
}
export default UserlogoforPost;