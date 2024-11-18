import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Controls from "./components/Controls";
import { generatePuzzle, isValidMove, fillBoard, Cell } from "./utils/sudoku";

const App: React.FC = () => {
  const [board, setBoard] = useState<Cell[][]>(generatePuzzle("easy"));
  const [message, setMessage] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("easy");

  const handleCellChange = (row: number, col: number, value: number) => {
    if (!board[row][col].editable) return;

    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    newBoard[row][col].value = value;
    setBoard(newBoard);
  };

  const checkSolution = () => {
    for (let row = 0; row < 9; row++) {
      const rowSet = new Set<number>();
      for (let col = 0; col < 9; col++) {
        const value = board[row][col].value;
        if (value === 0) continue;
        if (rowSet.has(value)) {
          setMessage("Board is invalid! Duplicate in row.");
          return;
        }
        rowSet.add(value);
      }
    }

    for (let col = 0; col < 9; col++) {
      const colSet = new Set<number>();
      for (let row = 0; row < 9; row++) {
        const value = board[row][col].value;
        if (value === 0) continue;
        if (colSet.has(value)) {
          setMessage("Board is invalid! Duplicate in column.");
          return;
        }
        colSet.add(value);
      }
    }

    for (let gridRow = 0; gridRow < 3; gridRow++) {
      for (let gridCol = 0; gridCol < 3; gridCol++) {
        const gridSet = new Set<number>();
        for (let row = gridRow * 3; row < (gridRow + 1) * 3; row++) {
          for (let col = gridCol * 3; col < (gridCol + 1) * 3; col++) {
            const value = board[row][col].value;
            if (value === 0) continue;
            if (gridSet.has(value)) {
              setMessage("Board is invalid! Duplicate in 3x3 grid.");
              return;
            }
            gridSet.add(value);
          }
        }
      }
    }
    setMessage("Solution is correct!");
  };

  const solvePuzzle = () => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    fillBoard(newBoard);
    setBoard(newBoard);
    setMessage("Puzzle solved!");
  };

  const generateNewPuzzle = () => {
    const newPuzzle = generatePuzzle(difficulty);
    setBoard(newPuzzle);
    setMessage("");
  };

  const giveHint = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col].value === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValidMove(board, row, col, num)) {
              const newBoard = board.map(row => row.map(cell => ({ ...cell })));
              newBoard[row][col].value = num;
              setBoard(newBoard);
              return;
            }
          }
        }
      }
    }
  };

  return (
    <div className="App">
      <h1>Sudoku Game</h1>
      <Controls
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        generateNewPuzzle={generateNewPuzzle}
        checkSolution={checkSolution}
        solvePuzzle={solvePuzzle}
        giveHint={giveHint}
      />
      <div>{message}</div>
      <Board board={board} handleCellChange={handleCellChange} />
    </div>
  );
};

export default App;