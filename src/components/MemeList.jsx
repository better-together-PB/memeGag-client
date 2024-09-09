import Meme from "./Meme";

import styles from "./MemeList.module.css";

function MemeList({ posts, onDeletePost, onLikeBtnClick }) {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <Meme
          key={post._id}
          post={post}
          onDeletePost={onDeletePost}
          onLikeBtnClick={onLikeBtnClick}
        />
      ))}
    </div>
  );
}

export default MemeList;
