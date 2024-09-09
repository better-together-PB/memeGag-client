import { NavLink } from "react-router-dom";
import styles from "./UserDetails.module.css";

function UserDetails({ username, userImage, userId, content }) {
  return (
    <>
      <div className={styles.details}>
        <img src={userImage} alt="User" />
        <h2>{username}</h2>
      </div>
      <div className={styles.menu}>
        <NavLink
          className={content ? "" : "active"}
          to={`/user/${userId}/likes`}
        >
          likes
        </NavLink>
        <NavLink to={`/user/${userId}/posts`}>posts</NavLink>
        <NavLink to={`/user/${userId}/comments`}>comments</NavLink>
      </div>
    </>
  );
}

export default UserDetails;
