import React from "react";
import PostContent from "../../Component/PostContent";
import Posts from "../../Component/Posts";
import Aside from "../../Component/Aside";
import Message from "../../Component/Message";
function UserPage(){

    return(
        <>
        <div style={{display:'flex',flexDirection:'row'}}>
        <Aside/>
        <div style={{
            width:'40%'
        }}>
            <PostContent/>
            <Posts/>
            </div>
            <Message/>
            </div>
        </>
    )
}

export default UserPage;