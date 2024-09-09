import { Link } from "react-router-dom";
import styles from "./UserDetails.module.css";

function UserDetails({ username, userImage, userId }) {
  return (
    <>
      <div className={styles.details}>
        <img src={userImage} alt="User" />
        <h2>{username}</h2>
      </div>
      <div>
        <Link to={`/user/${userId}/likes`}>likes</Link>
        <Link to={`/user/${userId}/posts`}>posts</Link>
        <Link to={`/user/${userId}/comments`}>comments</Link>
      </div>
    </>
  );
}

export default UserDetails;
