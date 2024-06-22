import styles from "./chat.module.css";
const Chat = () => {
  return (
    <div className={styles.chat}>
      <span className={styles.chat__header}>Чат</span>
      <div className={styles.chat__box}>
        <div className="flex flex-row">
          <div className={styles.user__icon__mini}>ic1</div>
          <h5 className={styles.player__message}>
            Сообщение 01234567890123456789012345678901234567890
            1234567890123456789012345678901234567890123456789012345678901234567
            890123 456789
          </h5>
        </div>
        <div className="flex flex-row m-b-1">
          <h5 className={styles.enemy__message}>
            Сообщение 01234567890123456789012345678901234567890
            1234567890123456789012345678901234567890123456789012345678901234567
            890123 456789
          </h5>
          <div className={styles.user__icon__mini}>ic1</div>
        </div>
        <div className="flex flex-row">
          <h5 className={styles.enemy__message}>Сообщение 3</h5>
          <div className={styles.user__icon__mini}>ic1</div>
        </div>
        <div className="flex flex-row">
          <div className={styles.user__icon__mini}>ic1</div>
          <h5 className={styles.player__message}>Сообщение 4</h5>
        </div>
        <div className="flex flex-row">
          <div className={styles.user__icon__mini}>ic1</div>
          <h5 className={styles.player__message}>Сообщение 4</h5>
        </div>
        <div className="flex flex-row">
          <div className={styles.user__icon__mini}>ic1</div>
          <h5 className={styles.player__message}>Сообщение 4</h5>
        </div>
        <div className="flex flex-row">
          <div className={styles.user__icon__mini}>ic1</div>
          <h5 className={styles.player__message}>Сообщение 4</h5>
        </div>
        <div className="flex flex-row">
          <div className={styles.user__icon__mini}>ic1</div>
          <h5 className={styles.player__message}>Сообщение 4</h5>
        </div>
        <div className="flex flex-row">
          <div className={styles.user__icon__mini}>ic1</div>
          <h5 className={styles.player__message}>Сообщение 4</h5>
        </div>
        <div className="flex flex-row">
          <div className={styles.user__icon__mini}>ic1</div>
          <h5 className={styles.player__message}>Сообщение 4</h5>
        </div>
        <div className="flex flex-row">
          <div className={styles.user__icon__mini}>ic1</div>
          <h5 className={styles.player__message}>Сообщение 4</h5>
        </div>
        <div className="flex flex-row">
          <div className={styles.user__icon__mini}>ic1</div>
          <h5 className={styles.player__message}>Сообщение 4</h5>
        </div>
        <div className="flex flex-row">
          <div className={styles.user__icon__mini}>ic1</div>
          <h5 className={styles.player__message}>Сообщение 4</h5>
        </div>
        <div className="flex flex-row">
          <div className={styles.user__icon__mini}>ic1</div>
          <h5 className={styles.player__message}>Сообщение 4</h5>
        </div>
        <div className="flex flex-row">
          <div className={styles.user__icon__mini}>ic1</div>
          <h5 className={styles.player__message}>Сообщение 4</h5>
        </div>
        <div className="flex flex-row">
          <div className={styles.user__icon__mini}>ic1</div>
          <h5 className={styles.player__message}>Сообщение 4</h5>
        </div>
      </div>
      <input
        placeholder="пиши в чат лох"
        className={styles.chat__input}
      ></input>
    </div>
  );
};
export default Chat;
