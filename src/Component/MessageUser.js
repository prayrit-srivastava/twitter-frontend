import React from 'react';
import { useUserContext } from '../UserContext.js';
import UserlogoforPost from './UserLogoforPost.js';

function MessageUser({img,userid}){
    const {user} = useUserContext();
    return(
        <>
        <div style={{marginLeft:'30px'}}>
        <UserlogoforPost/>
        <div style={{display:'inline-block',marginLeft:'20px'}}>
        {/* <p>{}</p> */}
        <p>@{userid}</p>
        </div>
        </div>
        </>
    )
}
export default MessageUser;