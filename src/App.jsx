import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import IsAnon from "./components/IsAnon";
import MainFeed from "./pages/MainFeed";

function App() {
  return (
    <>
      <Navbar />

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

        {/* <Route
          path="/projects"
          element={
            <IsPrivate>
              {" "}
              <ProjectListPage />{" "}
            </IsPrivate>
          }
        /> */}
      </Routes>
    </>
  );
}

export default App;
