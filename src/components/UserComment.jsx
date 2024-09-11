import styles from "./UserComment.module.css";

function UserComment({ comment }) {
  console.log(comment);
  return (
    <div>
      <img
        className={styles.profileImg}
        src={comment.userId.profileImage}
        alt={comment.userId.name}
      />
      <p>{comment.userId.name}</p>
      <p>{comment.comment}</p>
    </div>
  );
}

export default UserComment;
