import React, { useState } from 'react'
import { CellValue, GameStatus } from './types'


export const Main = () => {
  const [board, setBoard] = useState<CellValue[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ])
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
  const [turnNumber, setTurnNumber] = useState<number>(0)
  const [gameStatus, setGameStatus] = useState<GameStatus>('in_progress')

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

    // Detect draws
    if (turnNumber + 1 === 9) {
      setGameStatus('draw')
      return
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    setTurnNumber(turnNumber + 1)
  }

  let statusMessage = `Player: ${currentPlayer}`
  if (gameStatus === 'draw') {
    statusMessage = "Game ended. It's a draw!"
  }

  return <div className='flex flex-col mt-10 items-center gap-10'>
    <div className='font-bold text-2xl'>Tic Tac Toe</div>
    <div>{statusMessage}</div>
    <div className='flex flex-col gap-1'>
      {board.map((row, rowIndex) => <div className='flex gap-1'>
        {row.map((cell, colIndex) => <div
          className='border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex'
          onClick={() => handleCellClick(rowIndex, colIndex)}
        >
          {cell}
        </div>)}
      </div>)}
    </div>
  </div>
}
