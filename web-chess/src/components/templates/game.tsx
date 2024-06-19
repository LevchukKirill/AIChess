import "./game.css";
const Game = () => {
  return (
    <div className="main">
      <div className="users">
        <div className="user__top">
          <div className="flex flex-row">
            <div className="user__icon">ic1</div>
            <div className="username">user1</div>
          </div>
          <div className="flex flex-row">
            <div className="rating">350 elo</div>
            <div className="figures">pawn pawn knight</div>
          </div>
        </div>
        <div className="moves"></div>
        <div className="user__bottom">
          <div className="flex flex-row">
            <div className="user__icon">ic2</div>
            <div className="username">user2</div>
          </div>
          <div className="flex flex-row">
            <div className="rating">2000 elo</div>
            <div className="figures">pawn</div>
          </div>
        </div>
      </div>

      <div className="board">ya big board</div>
      <div className="chat">
        <span className="chat__header">Чат</span>
        <div className="flex flex-row">
          <div className="user__icon__mini">ic1</div>
          <h5 className="chat__player__message">Сообщение 1</h5>
        </div>
        <h5 className="chat__enemy__message">Сообщение 2</h5>
        <h5 className="chat__player__message">Сообщение 3</h5>
        <h5 className="chat__player__message">Сообщение 4</h5>
        <h5 className="chat__enemy__message">Сообщение 5</h5>
        <h5 className="chat__player__message">Сообщение 6</h5>
        <h5 className="chat__enemy__message">Сообщение 7</h5>
        <h5 className="chat__enemy__message">Сообщение 8</h5>
      </div>
    </div>
  );
};
export default Game;
