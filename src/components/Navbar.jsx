import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import styles from "./Navbar.module.css";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <h1>memeGAG</h1>
      </Link>
      <div className={styles.subNav}>
        {isLoggedIn && (
          <>
            <Link to={`/profile`} className={styles.profilePicture}>
              {user && <img src={user.image} alt="Profile picture" />}
            </Link>
            <Link to="/createPost">Post</Link>
            <Link to="/" onClick={logOutUser}>
              Logout
            </Link>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
