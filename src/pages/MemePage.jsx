import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Meme from "../components/Meme";

const API_URL = "http://localhost:5005";

function MemePage() {
  const [post, setPost] = useState();
  const { postId } = useParams();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/post/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setPost(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleLikeBtnClick(id, liked) {
    setPost((prevPosts) =>
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
    setPost((prevPosts) => prevPosts.filter((post) => post._id !== id));
  }

  return (
    <div style={{ width: "45%" }}>
      {post && (
        <Meme
          post={post}
          onDeletePost={handleDeletePost}
          onLikeBtnClick={handleLikeBtnClick}
        />
      )}
    </div>
  );
}

export default MemePage;
