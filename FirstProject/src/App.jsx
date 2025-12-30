import React from 'react'
import { useState, useEffect } from 'react'
import GameHeader from './components/GameHeader'
import { Card } from './components/Card'

const cardValues = [
  '🎮', '🚀', '🎨', '🎭', '🎪', '🎯', '🎸', '🎺',
  '🎮', '🚀', '🎨', '🎭', '🎪', '🎯', '🎸', '🎺'
]

const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);

  const initializeGame = () => {
    //shuffle the cards
    console.log(cardValues);
    const finalCards = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false
    }))
    console.log(finalCards);
    setCards(finalCards); // ← YOU WERE MISSING THIS!
  }

  useEffect(() => {
    initializeGame();
  }, []);

  //logic 
  const onClickCardFunction = (card) => {
    //don't allow clicking if card is already flipped or matched
    if (card.isFlipped || card.isMatched) {
      return;
    }
    console.log(card.id);

    //updated card flipped state
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return {
          ...c, isFlipped: true
        }
      } else {
        return c;
      }
    })
    setCards(newCards)

    //checking for flipping cards 
    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards)

    //checking for the match 
    if (flippedCards.length === 1) {
      const firstCard = cards[flippedCards[0]];
      if (firstCard.value === card.value) {
        alert("Match")
      } else {
        setTimeout(() => {
          const flippedBackCard = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          })
          setCards(flippedBackCard)
          setFlippedCards([])
        }, 1000);
      }
    }
  };

  return (
    <div className="app">
      <GameHeader Score={12} Move={32} />
      <div className="cards-grid">
        {cards.map((card) => (  // ← CHANGED FROM cardValues to cards
          <Card key={card.id} card={card} onClick={onClickCardFunction} />
        ))}
      </div>
    </div>
  )
}

export default App