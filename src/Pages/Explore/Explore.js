import axios from "axios";
import React, { useEffect, useState } from "react";
import UserBox from "../../Component/UserBox";
import Aside from "../../Component/Aside";
import Message from "../../Component/Message";
import { useUserContext } from "../../UserContext";

function Explore(){
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(true);
    const {user} = useUserContext();
    // console.log(user);
    const userId = user._id;
    // console.log(userId);

    useEffect(()=>{
        async function getUsers(){
            try{
                const res = await axios.get('http://localhost:3000/api/user/');
                const users = res.data;
                // console.log(users);
                
                setUsers(users);
                }catch(err){
                    console.log(err);
                    setUsers([]);
                }finally{
                    setLoading(false);
                }

        }
        getUsers();
    },[])

if(loading)
    return <h2>Loading...</h2>;
    

return(
        
        <div style={{
      display:'flex',
      flexDirection:'row',
    }}>
        <Aside/>
        <div style={{
      display:'flex',
      flexDirection:'column',
      width:'40%'}}>
        <h2>Users</h2>
        {users.map((user,ind)=>{
            if(user._id !== userId)
            return <UserBox key={ind} user={user}/>
        })}
        </div>
      <Message />
      </div>
      
    )
}

export default Explore;