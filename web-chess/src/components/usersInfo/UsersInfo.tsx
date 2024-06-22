import styles from "./usersInfo.module.css";
const UsersInfo = () => {
  return (
    <div className={styles.main}>
      <div className={styles.user__top}>
        <div className="flex flex-row">
          <div className={styles.user__icon}></div>
          <div className={styles.username}>NikiMon</div>
        </div>
        <div className="flex flex-row">
          <div className={styles.rating}>35 elo</div>
          <div className={styles.figures}>pawn pawn knight</div>
        </div>
      </div>
      <div className={styles.moves}></div>
      <div className={styles.user__bottom}>
        <div className="flex flex-column">
          <div className={styles.user__icon}></div>
          <div className={styles.username}>velikiyurod</div>
        </div>
        <div className="flex flex-column align-center">
          <div className={styles.rating}>2000 elo</div>
          <div className={styles.figures}>pawn</div>
        </div>
      </div>
    </div>
  );
};
export default UsersInfo;
