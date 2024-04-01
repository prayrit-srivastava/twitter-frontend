import React from "react";
import PostContent from "./PostContent";
import AllPost from "./AllPost";
function Main(){
    return(
        <>
        <div style={{
            width:'40%'
        }}>
            <PostContent/>
            <AllPost/>
        </div>
        </>
    )
}

export default Main;