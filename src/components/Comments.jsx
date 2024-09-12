import { useContext, useEffect, useState } from "react";
import CommentList from "./CommentsList";
import NewComment from "./NewComment";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Comments.module.css";

import { AuthContext } from "../context/auth.context";

function Comments({ commentsList, onCommentListChange }) {
  const { postId } = useParams();
  const [comment, setComment] = useState("");

  const { isLoggedIn } = useContext(AuthContext);

  function handleCommentChange(value) {
    setComment(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (comment === "") {
      alert("Comment cannot be empty");
      return;
    }

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/post/${postId}/comment`,
        { comment },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((res) => {
        onCommentListChange([res.data.data, ...commentsList]);
        console.log(res);
        setComment("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/post/${postId}/comments`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        onCommentListChange(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleDeleteComment(commentId) {
    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/api/post/${postId}/${commentId}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((res) => {
        onCommentListChange((c) => c.filter((sc) => sc._id !== commentId));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleLikeComment(commentId) {
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/post/${postId}/${commentId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((res) => {
        onCommentListChange((prevComments) => {
          return prevComments.map((comment) => {
            return comment._id === res.data.data._id ? res.data.data : comment;
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <NewComment
          comment={comment}
          onSubmit={handleSubmit}
          onCommentChange={handleCommentChange}
        />
      ) : (
        <p className={styles.pLogin}>
          <Link to="/login" className={styles.link}>
            Login
          </Link>{" "}
          to write a comment
        </p>
      )}
      <CommentList
        commentsList={commentsList}
        onDeleteComment={handleDeleteComment}
        onLikeComment={handleLikeComment}
      />
    </div>
  );
}

export default Comments;
