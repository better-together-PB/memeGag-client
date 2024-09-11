import UserComment from "./UserComment";

function CommentsList({ commentsList, onDeleteComment, onLikeComment }) {
  return (
    <div>
      {commentsList.map((comment) => (
        <UserComment
          key={comment._id}
          comment={comment}
          onDeleteComment={onDeleteComment}
          onLikeComment={onLikeComment}
        />
      ))}
    </div>
  );
}

export default CommentsList;
