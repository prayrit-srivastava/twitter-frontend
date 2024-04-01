import React, { useState } from "react";
import './Signup.css';
import { useUserContext } from "../../UserContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Signup(){
    const [name,setName] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [imageUrl,setImageUrl] = useState('');
    const [email,setEmail] = useState('');
    const [error,setError] = useState(false);
    const [serverError,setserverError] = useState('')
    const {handleUser} = useUserContext();
    const navigate = useNavigate();
    function handleRegister(e){
        e.preventDefault()
        const reqBody = {
            imageUrl: `${imageUrl}`,
            name: `${name}`,
            username: `${username}`,
            email: `${email}`,
            password: `${password}`            
        }
        axios.post('http://localhost:3000/api/user/register',reqBody, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(response => {
            if(response.status === 200){
                handleUser(response.data)
                navigate('/signin');
            }
          })
          .catch(error => {
            setError(true);
            console.error('Error:', error.response.data);
            setserverError(error.response.data);
          });
    }
    return(
        <>
        <div id="signup">
            <div className="ximage">
            <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
            </div>

            <div id="signup-page">
                <h1 style={{fontSize:'40px'}}>Happening now</h1>
                <h2 style={{fontSize:'30px'}}>Join today.</h2>
                <div id="form" >
                {error && <div className="error"><h4>{serverError}</h4><button onClick={()=>setError(false)}>X</button></div>}
                <form id="form-id" style={{
                    display:'flex',
                    flexDirection:'column',
                    }}
                    onSubmit={(e)=>handleRegister(e)}>
                <input type="text" placeholder="Enter your image URL" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} required></input>
                <input type="text" placeholder="Enter your Full Name" value={name} onChange={(e)=>setName(e.target.value)} required></input>
                <input type="text" placeholder="Enter your Username" value={username} onChange={(e)=>setUsername(e.target.value)} required></input>
                <input type="text" placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
                <input type="text" placeholder="Enter your Password" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
                <input type="submit" value="Register"></input>
                </form>
                <h3>Already  have an account?</h3>
                <button id="Signin-button" onClick={()=> navigate('/signin')}>Sign in</button>
            </div>
        </div>
        </div>
        </>
    )
}

export default Signup;