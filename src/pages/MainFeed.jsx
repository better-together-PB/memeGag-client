import { useEffect, useState } from "react";
import MemeList from "../components/MemeList";
import axios from "axios";

const API_URL = "http://localhost:5005";

function MainFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleLikeBtnClick(id, liked) {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === id) {
          if (liked) {
            return {
              ...post,
              likes: post.likes - 1,
              isLikedByUser: !post.isLikedByUser,
            };
          } else {
            return {
              ...post,
              likes: post.likes + 1,
              isLikedByUser: !post.isLikedByUser,
            };
          }
        } else {
          return post;
        }
      })
    );
  }

  function handleDeletePost(id) {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
  }

  return (
    <>
      <MemeList
        posts={posts}
        onDeletePost={handleDeletePost}
        onLikeBtnClick={handleLikeBtnClick}
      />
    </>
  );
}

export default MainFeed;
