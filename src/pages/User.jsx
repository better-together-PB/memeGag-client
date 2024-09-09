import { useEffect, useState } from "react";
import UserDetails from "../components/UserDetails";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function User() {
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userPosts, setUserPosts] = useState([]);

  let { userId, content } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (content) {
      if (!["likes", "posts", "comments"].includes(content)) {
        content = "";
        navigate(`/user/${userId}`);
      }
    } else {
      content = "";
    }

    axios
      .get(`${API_URL}/api/user/${userId}/${content}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        const { posts, profileImage, username } = res.data.data;
        setUsername(username);
        setUserImage(profileImage);
        setUserPosts(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [content]);

  console.log(userPosts);

  return (
    <div>
      <UserDetails username={username} userImage={userImage} userId={userId} />
    </div>
  );
}

export default User;
