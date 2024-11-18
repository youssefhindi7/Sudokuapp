import React from "react";

type ControlsProps = {
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  generateNewPuzzle: () => void;
  checkSolution: () => void;
  solvePuzzle: () => void;
  giveHint: () => void;
};

const Controls: React.FC<ControlsProps> = ({
  difficulty,
  setDifficulty,
  generateNewPuzzle,
  checkSolution,
  solvePuzzle,
  giveHint,
}) => {
  return (
    <div className="controls">
      <div className="difficulty">
        <label>Select Difficulty:</label>
        <select onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="buttons">
        <button onClick={generateNewPuzzle}>Generate Puzzle</button>
        <button onClick={checkSolution}>Check Solution</button>
        <button onClick={solvePuzzle}>Solve</button>
        <button onClick={giveHint}>Hint</button>
      </div>
    </div>
  );
};

export default Controls;
