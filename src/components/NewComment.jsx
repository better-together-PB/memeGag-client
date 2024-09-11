import { useContext } from "react";
import styles from "./NewComment.module.css";
import { AuthContext } from "../context/auth.context";

function NewComment({ comment, onSubmit, onCommentChange }) {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.container} id="comment">
      <img className={styles.profileImg} src={user?.image} alt={user?.name} />

      <form onSubmit={(e) => onSubmit(e)}>
        <textarea
          value={comment}
          maxLength={432}
          onChange={(e) => {
            onCommentChange(e.target.value);
          }}
        />
        <button
          className={styles.button}
          disabled={comment.length === 0}
          style={{ backgroundColor: comment ? "#0077ff" : "#6b7280" }}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default NewComment;
