import axios from "axios";

import { AuthContext } from "../context/auth.context";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

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
      .post(`${API_URL}/api/post/create`, requestBody, {
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
    <div>
      <h2>Share a meme</h2>

      <form onSubmit={handleSubmitPost}>
        <label>Title:</label>
        <input type="text" name="text" value={title} onChange={handleTitle} />

        <label>Image:</label>
        <input type="url" name="image" value={image} onChange={handleImage} />

        <label>Tags:</label>
        <input type="text" name="tags" value={tags} onChange={handleTags} />

        <button type="submit">Create Post</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default CreatePost;
