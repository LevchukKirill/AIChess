import styles from './game.module.css';
import Chat from '../chat/Chat';
import Board from '../board/Board';
import UsersInfo from '../usersInfo/UsersInfo';
const Game = (props: any) => {
  return (
    <div className={styles.main}>
      {/* <UsersInfo /> */}
      <Board />
      {/* <Chat messages={props.messages} addMessage={props.addMessage} /> */}
    </div>
  );
};
export default Game;
