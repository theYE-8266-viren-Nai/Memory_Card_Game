import React from 'react'
import { useState, useEffect } from 'react'
import GameHeader from './components/GameHeader'
import { Card } from './components/Card'
import WinMessage from './components/WinMessage'
import useGameLogic from './hooks/useGameLogic'

const cardValues = [
  '🎮', '🚀', '🎨', '🎭', '🎪', '🎯', '🎸', '🎺',
  '🎮', '🚀', '🎨', '🎭', '🎪', '🎯', '🎸', '🎺'
]

const App = () => {

  const { cards , score , moves , onClickCardFunction , initializeGame , isGameComplete} = useGameLogic({cardValues})

  return (
    <div className="app">
      <GameHeader Score={score} Move={moves} onReset={initializeGame} />
      {isGameComplete && <WinMessage completedMoves={moves} />}
      <div className="cards-grid">
        {cards.map((card) => (  // ← CHANGED FROM cardValues to cards
          <Card key={card.id} card={card} onClick={onClickCardFunction} />
        ))}
      </div>
    </div>
  )
}

export default App