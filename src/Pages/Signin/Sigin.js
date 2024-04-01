import React, { useState } from "react";
import axios from "axios";
import './Signin.css'
import { useUserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
// import useLocalStorage from "../../useLocalStorage";


function Signin() {
  // const [user,setUser] = useLocalStorage("user",{})
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const { handleUser, setNewUser, handleisAuth } = useUserContext();

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const requestBody = {
      email: `${email}`,
      password: `${password}`,
    };

    await axios.post('http://localhost:3000/api/user/login', requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status === 200) {
          // console.log(response.data);
          handleUser(response.data._id);
          // console.log(response.data);
          // console.log(response.data._id)
          // console.log(response.data[_id]);
          setNewUser(response.data);
          // setUser(response.data);
          localStorage.setItem("user" ,response.data);
          // localStorage.setItem("password" ,password);
          localStorage.setItem("isAuth", true);
          handleisAuth();
          navigate('/');
        }
      })
      .catch(error => {
        setError(true);
        console.error('Error:', error);
      });
  }
  return (
    <>

      <div id="signup">
        <div className="ximage">
          <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
        </div>

        <div id="signup-page">
          <h1 style={{ fontSize: '40px' }}>Sign In</h1>

          {error && <div className="error"><h4>Invalid Username or Password</h4><button onClick={() => setError(false)}>X</button></div>}

          <div id="form" >
            <form id="form-id" onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <input type="text" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
              <input type="text" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
              <input type="submit" value="Log in"></input>
            </form>
            &nbsp;&nbsp;&nbsp;&nbsp;<p>New User?</p> <button style={{ backgroundColor: 'transparent', color: "blue", border: "none", fontSize: "larger" }} onClick={() => navigate('/signup')}>Register</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin;