import React, { useState ,useContext} from 'react';
import { createContext } from 'react';

const usercontext = createContext();

export function useUserContext(){
    const value = useContext(usercontext);
    return value;
}

function UserContext({children}){
    const [userid,setUserid] = useState("");
    const [user,setUser] = useState({});
    const [isauth,setisAuth] = useState(false);

    function handleUser(newUserid){
        setUserid(newUserid);
    }
    function setNewUser(user){
        setUser(user)
    }
    function handleisAuth(){
        setisAuth(!isauth);
    }
    return(
        <usercontext.Provider value={{user,userid,isauth,handleUser,setNewUser,handleisAuth}}>
            {children}
        </usercontext.Provider>
    )
}

export default UserContext;