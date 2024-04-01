import React, { useEffect, useState } from 'react';
import './Post.css'
import UserlogoforPost from './UserLogoforPost.js';
import axios from 'axios';
import { useUserContext } from '../UserContext';
import UserlogoforMsg from './UserlogoForMsg.js';

function PostForAllUser({userpost}){
    const id = userpost._id;
    const [like,setLike] = useState(0);
    const [comment,setComment] = useState([]);
    const [post,setPost] = useState(userpost);
    const {userid,user}  = useUserContext();
    const [postuser,setpostuser] = useState({})
    const [clicked,setClicked] = useState(false);
    const [comcontent,setComcomment] = useState("");
    const [bool,setBool] = useState(false);

    useEffect(()=>{
        const fetchcommentnlike = async ()=>{
            const userid = post["userId"];
            // console.log(post)
            // console.log(userid);
            // console.log(userpost);
            const res = await axios.get(`http://localhost:3000/api/user/${userid}`);
            const result = res.data[0];
            setpostuser(result);
            // console.log(result);
            // console.log(postuser);

            const likeres = await axios.get(`http://localhost:3000/api/like/${id}`);
            setLike(likeres.data);
            const commentres = await axios.get(`http://localhost:3000/api/comment/${id}`);
            setComment(commentres.data);
        }
        fetchcommentnlike();
    },[])

    async function handleLike(){
        const requestBody = {
            userId :userid,
            postId : id
        }

        const res = await axios.post('http://localhost:3000/api/like/like',requestBody,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.data!== -1){
            setLike(res.data)
            setClicked(true);
        }
    }
    async function handleDislike(){
        const requestBody = {
            userId :userid,
            postId : id
        }
        const res = await axios.post('http://localhost:3000/api/like/dislike',requestBody,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.data!== -1){
            setLike(res.data)
            setClicked(false);
        }
    }
    async function postcomment(e){
        e.preventDefault();
        const requestBody = {
            userId:`${userid}`,
            postId:`${id}`,
            content:`${comcontent}`
          };
        //   console.log(comcontent)

          await axios.post('http://localhost:3000/api/comment/add', requestBody, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
    }
return (
    <>
    <div className='container'>
        <div>
            <UserlogoforMsg image={postuser.imageUrl}/> 

        </div>
        <div className='postcontainer'>
            <div className="Postheader">
                <p>{postuser.name}</p>
                <p style={{paddingLeft:'10px'}}>@{postuser.username}</p>
                
            </div>
            <div className='caption'>
                {post.caption}
            </div>
            <div className='imagecontainer'>
                {post.ImageUrl?<img className="image" src={post.ImageUrl} alt='postimage'/>:<></>}
            </div>
            <div className="post-footer">
                <div className="like-footer">
                    <div>
                    {
                    clicked
                    ?
                    <button onClick={handleDislike}>    
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="iconC"><g><path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
                    </button>
                    :
                    <button onClick={handleLike}><svg viewBox="0 0 24 24" aria-hidden="true" className="icon"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg></button>
                    }
                    </div>
                    <div>
                        {like}
                    </div>
                </div>
                <div className="like-footer" >
                    <div >
                        {/* dvbrbr */}
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                    </div>
                    <div onClick={()=>setBool(!bool)}>
                        {comment.length}
                    </div>
                    {bool ?
                    <div className='commentBox'>
                        <form onSubmit={(e)=>postcomment(e)}>
                            <input type='text' value={comcontent} onChange={(e)=>setComcomment(e.target.value)}/>
                            <input type='submit'/>
                        </form>
                    </div>
                    :
                    <></>
                    }
                </div>
            </div>
        </div>
    </div>
    </>
)
}
export default PostForAllUser;