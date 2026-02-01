import React from 'react'
import { CellValue } from './types'

interface BoardProps {
  board: CellValue[][]
  onCellClick: (rowIndex: number, colIndex: number) => void
}

export const Board = ({ board, onCellClick }: BoardProps) => {
  return (
    <div className='flex flex-col gap-1'>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className='flex gap-1'>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className='border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex'
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
