import React, { useEffect, useState } from "react";
import { useUserContext } from "../UserContext";
import Post from "./Post.js";
import axios from "axios";

export default function Posts() {
  const { userid, user } = useUserContext();
  const [userPost, setUserPost] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:3000/api/post/${userid}`;
        const res = await axios.get(url);
        // console.log(res.data);
        if (res.data.length > 0) {
          setUserPost(res.data);
        } else {
          setError("No Posts found");
          setUserPost([]);
        }
      } catch (error) {
        console.error("Error fetching user posts:", error.response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call the fetchData function directly

  }, [userid]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* <h1>Hello : {userPost[0]}</h1> */}
      {userPost.length <= 0 ? (<h2>No post Found</h2>) :
        (
          userPost.map((post, ind) => {
            try {
              const url = `http://localhost:3000/api/post/indpost/${post}`;
              return <Post key={ind} postUrl={url} id={post}/>;
            } catch (err) {
              console.log(err);
              return null; // Return null or another appropriate fallback
            }
          })
        )}
    </>
  );
}
