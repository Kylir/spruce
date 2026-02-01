import React, { useState } from 'react'
import { CellValue, GameStatus, Player } from './types'
import { isWinningMove } from './utils/gameLogic'
import { saveGameResult } from './utils/api'
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
  const [statusMessage, setStatusMessage] = useState<string>('Player: X')

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
      setStatusMessage(`Game ended: ${currentPlayer} wins! Saving your game...`)
      saveGameResult(currentPlayer, gridSize, winCondition)
        .then(() => setStatusMessage(`Game ended: ${currentPlayer} wins! Game saved!`))
        .catch(() => setStatusMessage(`Game ended: ${currentPlayer} wins! Oops... the save failed.`))
      return
    }

    // Detect draws
    if (turnNumber === gridSize * gridSize - 1) {
      setGameStatus('draw')
      setStatusMessage("Game ended. It's a draw! Saving your game...")
      saveGameResult('draw', gridSize, winCondition)
        .then(() => setStatusMessage("Game ended. It's a draw! Game saved!"))
        .catch(() => setStatusMessage("Game ended. It's a draw! Oops... the save failed."))
      return
    }

    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X'
    setCurrentPlayer(nextPlayer)
    setTurnNumber(turnNumber + 1)
    setStatusMessage(`Player: ${nextPlayer}`)
  }

  const resetGame = () => {
    setBoard(createBoard(gridSize))
    setCurrentPlayer('X')
    setTurnNumber(0)
    setGameStatus('in_progress')
    setStatusMessage('Player: X')
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
