import React, { useState } from 'react'
import { CellValue, GameStatus, Player } from './types'
import { isWinningMove } from './utils/gameLogic'
import { GameControls } from './Components/GameControls'
import { Board } from './Components/Board'


const createBoard = (size: number): CellValue[][] => {
  return Array(size).fill(null).map(() => Array(size).fill(''))
}

export const Main = () => {
  const [board, setBoard] = useState<CellValue[][]>(createBoard(3))
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
  const [turnNumber, setTurnNumber] = useState<number>(0)
  const [gameStatus, setGameStatus] = useState<GameStatus>('in_progress')
  const [gridSize, setGridSize] = useState<number>(3)
  const [winCondition, setWinCondition] = useState<number>(3)

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    // Do nothing if no game in progress or if the cell is not empty
    if (gameStatus !== 'in_progress') return
    if (board[rowIndex][colIndex] !== '') return

    const newBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? currentPlayer : cell
      )
    )
    setBoard(newBoard)

    // Detect wins
    if (isWinningMove(currentPlayer, newBoard, rowIndex, colIndex, winCondition)) {
      setGameStatus('victory')
      return
    }

    // Detect draws
    if (turnNumber === gridSize * gridSize - 1) {
      setGameStatus('draw')
      return
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    setTurnNumber(turnNumber + 1)
  }

  const resetGame = () => {
    setBoard(createBoard(gridSize))
    setCurrentPlayer('X')
    setTurnNumber(0)
    setGameStatus('in_progress')
  }

  let statusMessage = `Player: ${currentPlayer}`
  if (gameStatus === 'draw') {
    statusMessage = "Game ended. It's a draw!"
  } else if (gameStatus === 'victory') {
    statusMessage = `Game ended: ${currentPlayer} wins!`
  }

  return (
    <div className='flex flex-col mt-10 items-center gap-10'>
      <div className='font-bold text-2xl'>Tic Tac Toe</div>

      <GameControls
        gridSize={gridSize}
        setGridSize={setGridSize}
        winCondition={winCondition}
        setWinCondition={setWinCondition}
        onNewGame={resetGame}
      />

      <div>{statusMessage}</div>

      <Board board={board} onCellClick={handleCellClick} />
    </div>
  )
}
