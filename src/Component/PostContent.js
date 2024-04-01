import React, { useState } from 'react';
import Userlogo from './Userlogo';
import './PostContent.scss'
import { useUserContext } from '../UserContext';
import axios from 'axios';

export default function PostContent(){
    const [caption,setCaption] = useState("");
    const [image,setImage] = useState("");
    const {user} = useUserContext();


    function showInput(e){
        e.preventDefault();
        const ele = document.getElementsByClassName('urlholder')[0];
        ele.style.display = 'inline';
    }
    async function handleSubmit(e){
        e.preventDefault();
        if(!caption && !image)
            return;

        const requestBody = {
            userId:`${user._id}`,
            imageUrl: `${image}`,
            caption: `${caption}`
        }
        // console.log(requestBody);
        try{
            const res = await axios.post(`http://localhost:3000/api/post/add`, requestBody, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            //   console.log(res.data);
              setCaption("");
              setImage("");
    
        }catch(err){
            console.log(err);
        }

    }
    return(
        <>
        <div className="Topdiv" >
        <div>
            <Userlogo/>
        </div>
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className='postcontent-2'>
                <div className="form__group field">
                <input type="input" className="form__field" placeholder="What is happening?!" name="name" id='name' value={caption} onChange={(e)=>{
                    setCaption(e.target.value);
                }}/>
                <label htmlFor="name" className="form__label" >What is happening?!</label>
                </div>
                <button className='add-image' onClick={(e)=>showInput(e)}>Add image</button>
                
            </div>
            <input type='text' placeholder='Enter the Image Url' className='urlholder' value={image} onChange={(e)=>{setImage(e.target.value)}}/>
            <button type="submit" className='post-btn'>Post</button> 
            </form>
        </div>
        </div>
        </>
    )
}
