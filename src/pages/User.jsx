import { useEffect, useState } from "react";
import UserDetails from "../components/UserDetails";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MemeList from "../components/MemeList";

const noMemes = {
  likes: "No liked posts",
  comments: "No commented posts",
  posts: "No posts",
};

function User() {
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");
  const [posts, setPosts] = useState([]);

  let { userId, content } = useParams();
  const navigate = useNavigate();

  if (content) {
    if (!["likes", "posts", "comments"].includes(content)) {
      content = "";
      navigate(`/user/${userId}`);
    }
  } else {
    content = "likes";
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/${userId}/${content}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        const { posts, profileImage, username } = res.data.data;
        setUsername(username);
        setUserImage(profileImage);
        setPosts(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [content]);

  function handleLikeBtnClick(id, liked) {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === id) {
          if (liked) {
            return {
              ...post,
              likes: post.likes - 1,
              isLikedByUser: !post.isLikedByUser,
            };
          } else {
            return {
              ...post,
              likes: post.likes + 1,
              isLikedByUser: !post.isLikedByUser,
            };
          }
        } else {
          return post;
        }
      })
    );
  }

  function handleDeletePost(id) {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <UserDetails
        username={username}
        userImage={userImage}
        userId={userId}
        content={content}
      />
      {posts.length !== 0 ? (
        <MemeList
          posts={posts}
          onDeletePost={handleDeletePost}
          onLikeBtnClick={handleLikeBtnClick}
        />
      ) : (
        <h3>{noMemes[content]}</h3>
      )}
    </div>
  );
}

export default User;
