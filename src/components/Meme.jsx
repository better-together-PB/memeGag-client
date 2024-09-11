import styles from "./Meme.module.css";

import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const tags = {
  humor:
    "https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1683178299.2874_je3YRE_100x100.jpg",
  animals:
    "https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1683177917.8813_mUvytE_100x100.jpg",
  gaming:
    "https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1683179692.3556_A5eWY2_100x100.jpg",
  comic:
    "https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1683179392.1419_yMavUr_100x100.jpg",
  sports:
    "https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1683177922.4407_yhu7AJ_100x100.jpg",
  wtf: "https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1683958069.2788_PA7eVy_100x100.jpg",
};

const DeleteIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);

const Heart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={styles.iconInteract}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
    />
  </svg>
);

const Comment = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={styles.iconInteract}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
    />
  </svg>
);

const EditIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
);

function calcDays(dateString) {
  // Parse the input date
  const pastDate = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in time (milliseconds)
  const timeDifference = currentDate - pastDate;

  // Convert time difference from milliseconds to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

function Meme({ post, onDeletePost, onLikeBtnClick }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState(post.title);
  const [newTitle, setNewTitle] = useState(post.title);
  const [isEditing, setIsEditing] = useState(false);
  const [creator, setCreator] = useState(null);
  const textareaRef = useRef();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/details/${post.userId}`)
      .then((res) => {
        setCreator(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (isEditing) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isEditing]);

  const postCreatedByUser = user?._id === post.userId;

  const daysAgo = calcDays(post.createdAt) || "new";

  function handleDeletePost(id) {
    const storedToken = localStorage.getItem("authToken");

    const deletePost = confirm("Are you sure you want to delete this post?");

    if (deletePost) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/api/post/${id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          onDeletePost(id);
          alert("Post successfully deleted!");
        })
        .catch((error) => {
          alert("Something went wrong! Post was not deleted.");
        });
    }
  }

  function handleLikePost(id) {
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/post/${id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        onLikeBtnClick(id, post.isLikedByUser);
      })
      .catch((error) => {
        alert("An error occured");
      });
  }

  function handleEditIconClick() {
    const storedToken = localStorage.getItem("authToken");

    if (isEditing) {
      axios
        .patch(
          `${import.meta.env.VITE_API_URL}/api/post/${post._id}`,
          { title: newTitle },
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        )
        .then(() => {
          setTitle(newTitle);
        })
        .catch((error) => {
          console.log(error);
          alert("Changing the title failed");
        });
    }

    setIsEditing((e) => !e);
  }

  function handleOpenPost(postId) {
    window.open(`/post/${postId}`, "_black", "noopener,noreferrer");
  }

  const editTextArea = (
    <form
      onSubmit={() => {
        console.log("FORM SUBMITTED");
      }}
    >
      <textarea
        maxLength={185}
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        ref={textareaRef}
        className={styles.editTextArea}
      />
    </form>
  );

  return (
    <div className={styles.meme}>
      <div className={styles.memeInfo}>
        <img src={tags[post.tags]} alt="tag" />
        <span>{post.tags}</span>
        <span className={styles.days}>
          {daysAgo}
          {daysAgo === "new" || "d"}
        </span>
        {postCreatedByUser ? (
          <div className={styles.ownerIconContainer}>
            <button
              className={`${styles.ownerIcon} ${styles.edit} ${
                isEditing ? styles.editing : ""
              }`}
              onClick={handleEditIconClick}
            >
              {EditIcon}
            </button>
            <button
              className={styles.ownerIcon}
              onClick={() => handleDeletePost(post._id)}
            >
              {DeleteIcon}
            </button>
          </div>
        ) : (
          <Link to={`/user/${creator?._id}`} className={styles.creator}>
            {creator?.name}
          </Link>
        )}
      </div>
      <h4 onClick={() => handleOpenPost(post._id)}>
        {isEditing ? editTextArea : title}
      </h4>
      <div className={styles.imageContainer}>
        <img
          onClick={() => handleOpenPost(post._id)}
          src={post.image}
          alt={post.title}
          className={styles.memeImg}
        />
      </div>
      <div className={styles.interactions}>
        <button
          className={`${styles.like} ${post.isLikedByUser ? styles.liked : ""}`}
          onClick={() => handleLikePost(post._id)}
        >
          {Heart}
          <span>{post.likes}</span>
        </button>
        <div onClick={() => handleOpenPost(post._id)}>
          <button className={styles.comment}>
            {Comment}
            <span>{post.comments}</span>
            <span>{post.comments === 1 ? "Comment" : "Comments"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Meme;
