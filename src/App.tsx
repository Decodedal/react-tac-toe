import { useState } from 'react'
import './App.css'
import './toe.css'



function App() {
  const [gameArr, setGameArr] = useState<string[][]>([['','',''],['','',''],['','','']]);
  const [currentPlayer, setCurrentplayer] = useState(true);
  const [winningLine, setWinningLine] = useState<number[][]>([]);
  const [score, setScore] = useState({x:0, O:0})

  const checkForWinner = (gameArr: string[][]) => {
    // define winning lines
    const lines = [
      { indices: [[0, 0], [0, 1], [0, 2]], cells: [gameArr[0][0], gameArr[0][1], gameArr[0][2]] }, // Top row
      { indices: [[1, 0], [1, 1], [1, 2]], cells: [gameArr[1][0], gameArr[1][1], gameArr[1][2]] }, // Middle row
      { indices: [[2, 0], [2, 1], [2, 2]], cells: [gameArr[2][0], gameArr[2][1], gameArr[2][2]] }, // Bottom row
      { indices: [[0, 0], [1, 0], [2, 0]], cells: [gameArr[0][0], gameArr[1][0], gameArr[2][0]] }, // Left column
      { indices: [[0, 1], [1, 1], [2, 1]], cells: [gameArr[0][1], gameArr[1][1], gameArr[2][1]] }, // Middle column
      { indices: [[0, 2], [1, 2], [2, 2]], cells: [gameArr[0][2], gameArr[1][2], gameArr[2][2]] }, // Right column
      { indices: [[0, 0], [1, 1], [2, 2]], cells: [gameArr[0][0], gameArr[1][1], gameArr[2][2]] }, // Main diagonal
      { indices: [[0, 2], [1, 1], [2, 0]], cells: [gameArr[0][2], gameArr[1][1], gameArr[2][0]] }  // Counter diagonal
    ];
  
    for (let line of lines) {
      if (line.cells[0] && line.cells[0] === line.cells[1] && line.cells[1] === line.cells[2]) {
        return { winner: line.cells[0], winningLine: line.indices };
      }
    }
  
    return { winner: null, winningLine: [] }
  };


  const handlePlayerMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, i : number, j : number) => {
    if(winningLine.length > 0) return;
    const target = e.target as HTMLDivElement;
    if (target && target.textContent === '') {
      const newGameArr = [...gameArr];
      // Update the clicked cell with the current player's symbol (e.g., 'X' or 'O').
      newGameArr[i][j] = currentPlayer ? "X" : "O";  // assume currentPlayerSymbol is defined elsewhere
      // Update the game state.
      

     
      console.log([i,j])

      setGameArr(newGameArr);
     // target.textContent = currentPlayer ? "X" : "O";
      setCurrentplayer(prev => !prev)
      // Check for winner
      const { winner, winningLine } = checkForWinner(newGameArr);
      if (winner) {
        setWinningLine(winningLine);
        if(winner === "X") setScore(prev => ({...prev , x:prev.x++}))
        if(winner === "O") setScore(prev => ({...prev , O:prev.O++}))
      }
    }
  }

  return (
    <>
    <div className='page-container'>
      <h2>Tic-Tac-Toe</h2>
      <div className='game-container'>
        {
        gameArr.map((row, i) => row.map((cell, j) => {
          const isWinningCell = winningLine.some(([x, y]) => x === i && y === j);
          let cellClassName = 'box';
          if (isWinningCell) {
            cellClassName += ' winning-cell';
            if (winningLine[0][1] === winningLine[1][1]) {
              console.log("column won")
              // This is a column
              if (j === 0) {
                  cellClassName += ' left-column';
              } else if (j === 1) {
                  cellClassName += ' middle-column';
              } else if (j === 2) {
                  cellClassName += ' right-column';
              }
          } else if (winningLine[0][0] === winningLine[1][0]) {
            console.log("row won")
              // This is a row
              if (i === 0) {
                  cellClassName += ' top-row';
              } else if (i === 1) {
                  cellClassName += ' middle-row';
              } else if (i === 2) {
                  cellClassName += ' bottom-row';
              }
          } else {
              // This is a diagonal
              if (winningLine[0][0] === winningLine[0][1]) {
                  // This is the main diagonal
                  cellClassName += ' main-diagonal';
              } else {
                  // This is the counter diagonal
                  cellClassName += ' counter-diagonal';
              }
          }
          }
          return (
            <div className={cellClassName} key={`${i}-${j}`} onClick={(e) => handlePlayerMove(e, i, j)}>
              {cell}
            </div>
          );
        }))}
      </div>
      <p>Wins</p>
      <div className='score-display'>
        <p>X : {score.x}</p>
        <p>O : {score.O}</p>
      </div>
      <button onClick={() => {setGameArr([['','',''],['','',''],['','','']]), setWinningLine([])}}>New Game</button>
    </div>
    </>
  )
}

export default App
