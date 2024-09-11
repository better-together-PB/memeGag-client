import styles from "./Login.module.css";
import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input
            placeholder="Enter Email"
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <input
            placeholder="Enter Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <button type="submit" className={styles.buttonSubmit}>
            Login
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Don&apos;t have an account yet?</p>
        <Link to={"/signup"}> Sign Up</Link>
      </div>
    </>
  );
}

export default LoginPage;
