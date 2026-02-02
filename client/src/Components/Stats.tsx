import React, { useEffect, useState } from 'react'
import { getStats, Stats as StatsType } from '../utils/api'

interface StatsProps {
  refreshTrigger: number
}

export const Stats = ({ refreshTrigger }: StatsProps) => {
  const [stats, setStats] = useState<StatsType | null>(null)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    getStats()
      .then((data) => {
        setStats(data)
        setError(false)
      })
      .catch(() => setError(true))
  }, [refreshTrigger])

  if (error) {
    return <div className='text-gray-500'>Could not load stats.</div>
  }

  if (!stats) {
    return null
  }

  const totalGames = stats.xWins + stats.oWins + stats.draws

  if (totalGames === 0) {
    return <div className='text-gray-500'>No games played yet.</div>
  }

  return (
    <div className='text-gray-600'>
      {totalGames} games played. {stats.draws} {stats.draws <= 1 ? 'draw' : 'draws'}. X won {stats.xWins}. O won {stats.oWins}.
    </div>
  )
}
