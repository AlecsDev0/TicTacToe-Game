import React, { useState } from 'react'

type Player = 'X' | 'O' | null

const Algorithm: React.FC = () => {
  const [board, setBoard] = useState<(Player)[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
  const [winner, setWinner] = useState<Player | null>(null)

  const handleClick = (index: number) => {
    if (board[index] || winner) return // if the place has already clicked , this will return and will to ntg
    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)
  
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else {
      const isBoardFull = newBoard.every(cell => cell !== null)
      if (isBoardFull) {
        setWinner('Draw')
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
      }
    }
  }
  
  const checkWinner = (board: (Player)[]): Player | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
  
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
  
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setWinner(null)
    setCurrentPlayer('X')
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="text-2xl mb-4">
        {winner ? (winner === 'Draw' ? 'Draw!' : `${winner} won!`) : `Next player: ${currentPlayer}`}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 bg-slate-300 rounded-xl flex items-center justify-center border-2 text-4xl cursor-pointer"
          >
            {cell}
          </div>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="bg-indigo-400 mt-4 px-4 py-2 text-white rounded-lg"
      >
        Reset
      </button>
    </div>
  )
}

export default Algorithm