import styles from "./usersInfo.module.css";
const UsersInfo = () => {
  return (
    <div className={styles.users}>
      <div className={styles.user__top}>
        <div className="flex flex-row">
          <div className={styles.user__icon}>ic1</div>
          <div className={styles.username}>user1</div>
        </div>
        <div className="flex flex-row">
          <div className={styles.rating}>350 elo</div>
          <div className={styles.figures}>pawn pawn knight</div>
        </div>
      </div>
      <div className={styles.moves}></div>
      <div className={styles.user__bottom}>
        <div className="flex flex-row">
          <div className={styles.user__icon}>ic2</div>
          <div className={styles.username}>user2</div>
        </div>
        <div className="flex flex-row">
          <div className={styles.rating}>2000 elo</div>
          <div className={styles.figures}>pawn</div>
        </div>
      </div>
    </div>
  );
};
export default UsersInfo;
