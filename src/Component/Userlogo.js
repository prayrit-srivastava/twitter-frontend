import React from 'react';
import { useUserContext } from '../UserContext';
import './imagelogo.css';
function Userlogo(){
    const {user} = useUserContext();
    // console.log(user);
    return(
        <>
        <img src={user.imageUrl} alt="user logo" className='userlogo'/>
        </>
    )
}
export default Userlogo;