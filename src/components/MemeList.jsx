import axios from "axios";
import { useEffect, useState } from "react";
import Meme from "./Meme";

import styles from "./MemeList.module.css";

const API_URL = "http://localhost:5005";

function MemeList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api`)
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(posts);

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <Meme key={post._id} post={post} />
      ))}
    </div>
  );
}

export default MemeList;
