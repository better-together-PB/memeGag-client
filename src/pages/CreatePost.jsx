import styles from "./CreatePost.module.css";
import axios from "axios";

import { AuthContext } from "../context/auth.context";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { user, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const userId = user._id;

  const handleTitle = (e) => setTitle(e.target.value);
  const handleImage = (e) => setImage(e.target.value);
  const handleTags = (e) => setTags(e.target.value);

  const handleSubmitPost = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    const requestBody = { title, image, tags, userId };

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/post/create`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Create Post</h2>
        <form onSubmit={handleSubmitPost}>
          <select
            name="tags"
            id="tags-select"
            defaultValue={tags}
            onChange={handleTags}
          >
            <option value="" disabled>
              Choose Tags
            </option>
            <option value="animals">Animals</option>
            <option value="WTF">WTF</option>
            <option value="sports">Sports</option>
            <option value="gaming">Gaming</option>
            <option value="comic">Comic</option>
            <option value="humor">Humor</option>
          </select>

          <input
            placeholder="Enter Title"
            type="title"
            name="title"
            value={title}
            onChange={handleTitle}
          />

          <input
            placeholder="Enter Image Url"
            type="url"
            name="image"
            value={image}
            onChange={handleImage}
          />

          <button type="submit" className={styles.buttonSubmit}>
            Post
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </>
  );
}

export default CreatePost;
