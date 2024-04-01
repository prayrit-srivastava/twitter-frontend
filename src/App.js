import './App.css';
import React, { useContext } from 'react';
import Home from './Pages/Home/Home';
import  { useUserContext } from './UserContext';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Signin from './Pages/Signin/Sigin';
import Signup from './Pages/Signup/Signup';
// import { useNavigate } from "react-router-dom";
import Explore from './Pages/Explore/Explore';
import UserPage from './Pages/User Page/UserPage';
import ErrorPage from './Component/ErrorPage';
// import { useEffect } from 'react';
// import axios from 'axios';

function App() {
  // const isauth = localStorage.getItem("isAuth");
  // const {isa,handleUser,setNewUser,handleisAuth} = useUserContext();
  const {isauth} = useUserContext();

  // console.log(isa);

   const router = createBrowserRouter([
    {path:'/',element:isauth?<Home/>:<Signin/>, errorElement:<ErrorPage/>},
    {path:'/signin',element:<Signin/>,errorElement:<ErrorPage/>},
    {path:'/signup',element:<Signup/>,errorElement:<ErrorPage/>},
    {path:'/explore',element:<Explore/>,errorElement:<ErrorPage/>},
    {path:'/user',element:<UserPage/>,errorElement:<ErrorPage/>}
  ])

  return ( 
  <div className="App" >
    <h4 style={{  textAlign:'center'}}>Twitter</h4>
    <RouterProvider router={router}/>
    </div>
  );

}

export default App;
