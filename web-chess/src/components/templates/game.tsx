import styles from './game.module.css';
import Chat from '../chat/Chat';
import Board from '../board/Board';
import UsersInfo from '../usersInfo/UsersInfo';
const Game = () => {
  return (
    <div className={styles.main}>
      <UsersInfo />
      <Board />
      <Chat />
    </div>
  );
};
export default Game;
