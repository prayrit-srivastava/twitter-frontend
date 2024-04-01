import React from 'react';
import { useUserContext } from '../UserContext.js';
import Userlogo from './Userlogo.js';
import './user.css';
function User(){
    const {user} = useUserContext();
    // console.log(user);
    return(
        <>
        <div style={{margin:'30px',display:'flex',flexDirection:'row'}}>
        <Userlogo/>
        <div style={{display:'flex',flexDirection:'column',marginLeft:'20px',justifyContent:'space-around'}}>
        <p>{user.name}</p>
        <p>@{user.username}</p>
        </div>
        </div>
        </>
    )
}
export default User;