import React from 'react'

const GameHeader = ({ Score, Move , onReset }) => {
    return (
        <>
            <div className="game-header">
                <h1>Memory Card Game</h1>
                <div className="stats">
                    <div className="stat-item">
                        <span className="stat-label">Score:</span>
                        <span className="stat-label">{Score}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Moves:</span>
                        <span className="stat-label">{Move}</span>
                    </div>
                </div>
                <button className='reset-btn' onClick={onReset}>New Game</button>

            </div>
        </>
    )
}

export default GameHeader