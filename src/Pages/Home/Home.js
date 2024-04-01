import React, { useEffect } from "react";
import Aside from "../../Component/Aside";
import Main from "../../Component/Main";
import Message from "../../Component/Message";
import { useUserContext } from '../../UserContext';
import axios from "axios";



function Home(){
  
  // console.log(userid,user);
  // useEffect(()=>{
  //   axios.get(`http://localhost:3000/api/user/${userid}`)
  //   .then(response=>{
  //       const user = response.data;
  //       // console.log(user);
  //       setNewUser(user);
  //   })
  //   .catch(error=>{
  //       console.log(error);
  //   })
  // },[]);

    return(
    <>
    <div style={{
      display:'flex',
      flexDirection:'row',
      overflowY:'scroll'
    }}>
      <Aside/>
      <Main/> 
      <Message />
    </div>
    </>
    )
}

export default Home;