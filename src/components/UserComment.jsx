import styles from "./UserComment.module.css";
import { Link } from "react-router-dom";

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

function UserComment({ comment, onDeleteComment, onLikeComment }) {
  return (
    <div className={styles.container}>
      <Link to={`/user/${comment.userId._id}`}>
        <img
          className={styles.profileImg}
          src={comment.userId.profileImage}
          alt={comment.userId.name}
        />
      </Link>
      <div className={styles.pContainer}>
        <div className={styles.userContainer}>
          <Link className={styles.pUsername} to={`/user/${comment.userId._id}`}>
            {comment.userId.name}{" "}
          </Link>
          <button
            onClick={() => onDeleteComment(comment._id)}
            className={styles.xbutton}
          >
            X
          </button>
        </div>

        <p className={styles.pComment}>{comment.comment}</p>
        <button
          onClick={() => onLikeComment(comment._id)}
          className={`${styles.like}`}
        >
          {Heart}
          <span>{comment.likes.length}</span>
        </button>
      </div>
    </div>
  );
}

export default UserComment;

/* ${post.isLikedByUser ? styles.liked : ""} */
