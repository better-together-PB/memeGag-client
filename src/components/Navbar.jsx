import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import logo from "../../public/logo.png";
import styles from "./Navbar.module.css";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <img className={styles.logoImg} src={logo} alt="logo" />
      </Link>
      <div className={styles.subNav}>
        {isLoggedIn && (
          <>
            <Link to={`/user/${user._id}`} className={styles.profilePicture}>
              {user && <img src={user.image} alt="Profile picture" />}
            </Link>
            <Link to="/createPost">Post</Link>
            <Link to="/" onClick={logOutUser} className={styles.logoutBtn}>
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
