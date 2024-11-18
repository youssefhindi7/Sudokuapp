import React from "react";
import "./Board.css";

type Cell = {
  value: number;
  editable: boolean;
};

type BoardProps = {
  board: Cell[][];
  handleCellChange: (row: number, col: number, value: number) => void;
};

const Board: React.FC<BoardProps> = ({ board, handleCellChange }) => {
  return (
    <div className="grid">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            type="number"
            value={cell.value === 0 ? "" : cell.value}
            min="1"
            max="9"
            disabled={!cell.editable}
            onChange={(e) => handleCellChange(rowIndex, colIndex, parseInt(e.target.value) || 0)}
            className={`cell
              ${colIndex % 3 === 0 && colIndex !== 0 ? "left-grid-border" : ""}
              ${rowIndex % 3 === 0 && rowIndex !== 0 ? "top-grid-border" : ""}
            `}
          />
        ))
      )}
    </div>
  );
};

export default Board;
