import React from 'react';
import InfoPanel from './infoPanel';
import ChessPanel from './chessPanel';

class GamePanel extends React.Component {
    render(props) {
        const row = this.props.row
        const column = this.props.column
        const mineState = this.props.mineState
        const chessState = this.props.chessState
        
        return (
            <div className="game-panel">
                <InfoPanel />
                <ChessPanel
                    row={row}
                    column={column}
                    mineState={mineState}
                    chessState={chessState}
                    handleclick={this.props.handleclick}
                    gameover={this.props.gameover}
                    numberofcell={this.props.numberofcell}
                    />
            </div>
        )
    }
}

export default GamePanel;