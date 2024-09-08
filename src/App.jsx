import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import MainFeed from "./pages/MainFeed";
import Header from "./components/Header";
import CreatePost from "./pages/CreatePost";

import styles from "./App.module.css";

function App() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<MainFeed />} />
          <Route
            path="/signup"
            element={
              <IsAnon>
                <Signup />
              </IsAnon>
            }
          />

          <Route
            path="/login"
            element={
              <IsAnon>
                <Login />
              </IsAnon>
            }
          />

          <Route
            path="/createPost"
            element={
              <IsPrivate>
                <CreatePost />
              </IsPrivate>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
