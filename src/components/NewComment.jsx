import { AuthContext } from "../context/auth.context";
import { useContext, useState } from "react";
import styles from "./NewComment.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function NewComment() {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const { postId } = useParams();

  function handleSubmit(e) {
    e.preventDefault();
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
        setComment("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <img className={styles.profileImg} src={user?.image} alt={user?.name} />

      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button>Post</button>
      </form>
    </div>
  );
}

export default NewComment;
