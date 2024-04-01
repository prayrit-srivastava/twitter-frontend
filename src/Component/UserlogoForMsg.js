import React from 'react';
import './imagelogo.css';
function UserlogoforMsg({image}){
    // console.log(image)
    return(
        <>
        <img src={image} alt="user logo" className='userlogoforPost'/>
        </>
    )
}
export default UserlogoforMsg;