import React, { useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import './messgae.css';
import { useUserContext } from "../UserContext.js";
import axios from "axios";

function Message(){
    const {userid,user} = useUserContext();
    const [messages,setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        try{
            const getMessages = async(userid)=>{
                const res = await axios.get(`http://localhost:3000/api/message/${userid}`);
                // console.log(res.data.message);
                setMessages(res.data.message);
            }
            getMessages(userid);
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false);
        }

    },[userid])

    if(loading){
        return <><h1>loading...</h1></>
    }
    return(
        <>
        <div className="msgdiv">
        <h2>Messages</h2>
        {
            messages.length>0? 
        <div>
            {messages.map((msg,ind)=><MessageBox key= {ind} msgid = {msg} />)}
        </div>:
        <p>Follow people to message them</p>
        }

</div>
        </>
    )
}

export default Message;