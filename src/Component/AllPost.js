import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../UserContext";
import PostForAllUser from "./PostForAllUser";

function AllPost(){
    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(true);
    const {user} = useUserContext();

    useEffect(()=>{
        async function getPosts(){
            try{
                const res = await axios.get('http://localhost:3000/api/post/getall')
                setPosts(res.data);
    
            }catch(err){
                console.log(err);
            }finally{
                setLoading(false);
            }
        }
        getPosts();
    },[user])


    if(loading){
        return <h3>Loading...</h3>
    }
    if(posts.length == 0){
        return <p style={{display:"flex",justifyContent:"center", marginTop:"20px"}}>Follow someone to see their posts</p>
    }
    function findiffollow(follows,userid){

        return follows.find((person)=> (person == userid || userid == user._id)
        );
    }
    return (
        <>

        {
            posts.map((post)=> {

                const boolval = findiffollow(user.follows,post["userId"])
                
                if(boolval){
                    console.log(post)
                    return <PostForAllUser userpost={post}/>
                }
            })
        }
        </>
    )
}
export default AllPost;
