import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Meme from "../components/Meme";
import Comments from "../components/Comments";
import styles from "./MemePage.module.css";

function MemePage() {
  const [post, setPost] = useState();
  const { postId } = useParams();
  const navigate = useNavigate();
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/post/${postId}`, {
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
    setPost((post) => {
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
    });
  }

  function handleDeletePost(id) {
    setPost((prevPosts) => prevPosts.filter((post) => post._id !== id));
    navigate("/");
  }

  function handleCommentListChange(func) {
    setCommentsList(func);
  }

  return (
    <div className={styles.container}>
      {post && (
        <Meme
          post={post}
          numOfComments={commentsList.length}
          onDeletePost={handleDeletePost}
          onLikeBtnClick={handleLikeBtnClick}
        />
      )}
      <Comments
        commentsList={commentsList}
        onCommentListChange={handleCommentListChange}
      />
    </div>
  );
}

export default MemePage;
