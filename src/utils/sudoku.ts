export type Cell = {
    value: number;
    editable: boolean;
  };
  
  export const isValidMove = (board: Cell[][], row: number, col: number, num: number): boolean => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i].value === num || board[i][col].value === num) return false;
    }
  
     const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j].value === num) return false;
      }
    }
  
    return true;
  };
  
  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  
  export const fillBoard = (board: Cell[][]): boolean => {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffleArray(numbers);
  
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col].value === 0) {
          for (let num of numbers) {
            if (isValidMove(board, row, col, num)) {
              board[row][col].value = num;
              if (fillBoard(board)) return true;
              board[row][col].value = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  
  export const generatePuzzle = (difficulty: string): Cell[][] => {
    let board: Cell[][] = Array.from({ length: 9 }, () =>
      Array(9).fill({ value: 0, editable: true })
    ).map(row => row.map(cell => ({ ...cell })));
  
    fillBoard(board);
  
    const cellsToRemove = difficulty === "easy" ? 30 : difficulty === "medium" ? 45 : 60;
    for (let i = 0; i < cellsToRemove; i++) {
      let row, col;
      do {
        row = Math.floor(Math.random() * 9);
        col = Math.floor(Math.random() * 9);
      } while (board[row][col].value === 0);
      board[row][col] = { value: 0, editable: true };
    }
  
    return board.map(row =>
      row.map(cell => ({
        ...cell,
        editable: cell.value === 0,
      }))
    );
  };