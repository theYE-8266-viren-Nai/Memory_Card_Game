import React from 'react'
import { useState , useEffect } from 'react'
import GameHeader from './GameHeader'
import { Card } from './Card'

const cardValues = [
  '🎮', '🚀', '🎨', '🎭', '🎪', '🎯', '🎸', '🎺',
  '🎮', '🚀', '🎨', '🎭', '🎪', '🎯', '🎸', '🎺'
]

const EntireApp = () => {
  const [cards, setCards] = useState([]);

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
    if (card.isFlipped || card.isMatched){
      return;
    }

    //updated card flipped state
    const newCards = cards.map((c) => {
      if(c.id === card.id){
        return {
          ...c, isFlipped: true 
        }
      } else {
        return c;
      }
    })
    setCards(newCards)
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

export default EntireApp