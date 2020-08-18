import React from 'react';
import InfoPanel from './infoPanel';
import ChessPanel from './chessPanel';

class GamePanel extends React.Component {
    render(props) {
        const row = this.props.row
        const column = this.props.column
        
        return (
            <div className="game-panel">
                <InfoPanel />
                <ChessPanel row={row} column={column} />
            </div>
        )
    }
}

export default GamePanel;