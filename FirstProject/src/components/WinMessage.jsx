import React from 'react'

const WinMessage = ({completedMoves}) => {
    return (
        <div className='win-message'>
            <h2>Congratulations!</h2>
            <p>You completed the game in {completedMoves} moves </p>
        </div>
    )
}

export default WinMessage