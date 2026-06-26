import { useState } from "react";
import "./styles.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winner = calculateWinner(board);
  const isTie = !winner && board.every((cell) => cell !== null);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  }

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>

      <p className="status">
        {winner
          ? `Winner: ${winner}`
          : isTie
          ? "It's a Tie!"
          : `Turn: ${isXTurn ? "X" : "O"}`}
      </p>

      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <button className="reset-btn" onClick={resetGame}>
        Restart Game
      </button>
    </div>
  );
}

function calculateWinner(board) {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

export default App;
