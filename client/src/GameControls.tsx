import React from 'react'

interface GameControlsProps {
  gridSize: number
  setGridSize: (size: number) => void
  winCondition: number
  setWinCondition: (condition: number) => void
  onNewGame: () => void
}

export const GameControls = ({
  gridSize,
  setGridSize,
  winCondition,
  setWinCondition,
  onNewGame
}: GameControlsProps) => {
  const isInvalid = gridSize < 3 || gridSize > 15 || winCondition < 3 || winCondition > gridSize

  return (
    <>
      <div className='flex gap-4 items-center'>
        <span>Board size (3-15):</span>
        <input
          type='number'
          value={gridSize}
          onChange={(e) => setGridSize(Number(e.target.value))}
          className={`w-16 px-2 py-2 border-2 rounded text-center ${gridSize < 3 || gridSize > 15 ? 'border-red-500' : 'border-gray-800'}`}
        />
        <span>Win condition (3-{gridSize}):</span>
        <input
          type='number'
          value={winCondition}
          onChange={(e) => setWinCondition(Number(e.target.value))}
          className={`w-16 px-2 py-2 border-2 rounded text-center ${winCondition < 3 || winCondition > gridSize ? 'border-red-500' : 'border-gray-800'}`}
        />
      </div>
      <button
        className={`px-4 py-2 bg-gray-800 text-white rounded ${isInvalid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
        onClick={onNewGame}
        disabled={isInvalid}
      >
        New Game
      </button>
    </>
  )
}
