import React, { useEffect, useState } from "react";
import UserlogoforMsg from "./UserlogoForMsg";
import './UserBox.css';
import axios from "axios";
import { useUserContext } from "../UserContext";


function UserBox({user}){
    const value = useUserContext();
    const userID = value.user._id;
    const userid = user._id;
    const[follow,setFollow] = useState(false);
    const [loading,setLoading]  =useState(true);
    async function handleFollow(userid){
        try{
            const requestBody = {
                "user": userID,
                "person":userid
            }
            await axios.post('http://localhost:3000/api/user/follow', requestBody, {
                headers: {
                  'Content-Type': 'application/json',
                },
              })    
        }catch(err){
            console.log(err);
        }
        // console.log(userid);
    }
    async function handleUnFollow(userid){
        try{
            const requestBody = {
                "user": userID,
                "person":userid
            }
            await axios.post('http://localhost:3000/api/user/follow', requestBody, {
                headers: {
                  'Content-Type': 'application/json',
                },
              })    
        }catch(err){
            console.log(err);
        }
        // console.log(userid);
    }
    useEffect(()=>{
        const ifuser = value.user.follows.find((u)=>{
            return u == userid;
        })
        if(ifuser == undefined){
            setFollow(true);
        }
        setLoading(false)
    })
    if(loading){
        return <h4>just a sec... </h4>
    }
    
    // console.log(userid);
return (
    <>
    <div className="userContainer">
        <div><UserlogoforMsg image= {user.imageUrl}/></div>
        <div className="user-info">
            <div className="username-info">
                <span style={{fontSize:'18px',marginTop:'20px'}}> <b>{user.name}</b></span>
                <span style={{fontSize:'18px',}}><i>@{user.username}</i></span>
        </div>
        {follow?
        <div className="user-btn"><button className="btn-userbox" onClick={async () => {await handleFollow(userid)}}>Follow</button></div>
    :<div className="user-btn"><button className="btn-userbox unfollow " onClick={async () => {await handleUnFollow(userid)}}>Following</button></div>}
        </div>
    </div>
    </>
)
    
}

export default UserBox;