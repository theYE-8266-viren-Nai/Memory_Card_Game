import React from 'react'
import { useState, useEffect } from 'react'

const useGameLogic = ({ cardValues }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchCards, setMatchCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    if (!cardValues || cardValues.length === 0) return; // Add this check
    
    //shuffle the cards
    console.log(cardValues);
    const shuffled = shuffleArray(cardValues)
    const finalCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false
    }))
    console.log(finalCards);
    setCards(finalCards);
    setMoves(0);
    setScore(0);
    setMatchCards([])
    setFlippedCards([])
  }

  useEffect(() => {
    initializeGame();
  }, [cardValues]); // Add cardValues as dependency

  //logic 
  const onClickCardFunction = (card) => {
    // Don't allow clicking if card is already flipped or matched
    if (card.isFlipped || card.isMatched || flippedCards.length >= 2 || isLocked) {
      return;
    }

    // Updated card flipped state
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    // Check for match when 2 cards are flipped
    if (newFlippedCards.length === 2) {
      setIsLocked(true)
      setMoves((prev) => prev + 1);

      const firstCard = cards[newFlippedCards[0]];
      const secondCard = card;

      if (firstCard.value === secondCard.value) {
        // Match found
        setTimeout(() => {
          setCards((prev) => prev.map((c) =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isMatched: true }
              : c
          ));
          setMatchCards((prev) => [...prev, firstCard.id, secondCard.id]);
          setFlippedCards([]); // Reset flipped cards
          setScore((prev) => prev + 10);
          setIsLocked(false);
        }, 1000);
      } else {
        // No match - flip back
        setTimeout(() => {
          setCards((prev) => prev.map((c) =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]); // Reset flipped cards
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const isGameComplete = matchCards.length === cardValues?.length; // Add optional chaining

  return {
    cards,
    score,
    moves,
    isGameComplete,
    onClickCardFunction,
    initializeGame
  };
}

export default useGameLogic