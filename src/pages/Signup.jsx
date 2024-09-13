import styles from "./Signup.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const profileImgs = [
  "https://accounts-cdn.9gag.com/media/default-avatar/1_216_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_132_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_21_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_208_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_111_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_205_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_138_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_17_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_101_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_186_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_125_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_59_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_199_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_36_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_136_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_35_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_137_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_189_100_v0.jpg",
  "https://accounts-cdn.9gag.com/media/default-avatar/1_127_100_v0.jpg",
];

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageCounter, setImageCounter] = useState(0);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      email,
      password,
      name,
      profileImage: profileImgs[imageCounter],
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  function handleImageCounter(direction) {
    if (direction === "next") {
      if (imageCounter === profileImgs.length - 1) {
        setImageCounter(0);
      } else {
        setImageCounter((c) => c + 1);
      }
    } else if (direction === "prev") {
      if (imageCounter === 0) {
        setImageCounter(profileImgs.length - 1);
      } else {
        setImageCounter((c) => c - 1);
      }
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign Up</h2>
        <form onSubmit={handleSignupSubmit}>
          <input
            placeholder="Enter Email"
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
          <input
            placeholder="Enter Password"
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
          <input
            placeholder="Enter Username"
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={handleName}
          />
          <div className={styles.profileImgContainer}>
            <button type="button" onClick={() => handleImageCounter("prev")}>
              &lt;
            </button>
            <img
              className={styles.profileImage}
              src={profileImgs[imageCounter]}
              alt="User "
            />
            <button type="button" onClick={() => handleImageCounter("next")}>
              &gt;
            </button>
          </div>

          <button type="submit" className={styles.buttonSubmit}>
            Sign Up
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Already have an account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    </>
  );
}

export default Signup;
