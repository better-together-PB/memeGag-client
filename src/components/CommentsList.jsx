import axios from "axios";
import UserComment from "./UserComment";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function CommentsList() {
  const [commentsList, setCommentsList] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/post/${postId}/comments`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setCommentsList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {commentsList.map((comment) => (
        <UserComment key={comment._id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentsList;
