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
            <div className="game-panel" onContextMenu={(e)=>{e.preventDefault()}}>
                <InfoPanel 
                    handlerestart={this.props.handlerestart}
                    timeelapsed={this.props.timeelapsed}
                    leftminecount={this.props.leftminecount}
                    gameover={this.props.gameover}
                    gamewin={this.props.gamewin}
                    mousepressed={this.props.mousepressed}
                />
                <ChessPanel
                    row={row}
                    column={column}
                    mineState={mineState}
                    chessState={chessState}
                    handleclick={this.props.handleclick}
                    rightclick={this.props.rightclick}
                    mouseover={this.props.mouseover}
                    mouseleave={this.props.mouseleave}
                    mousedown={this.props.mousedown}
                    mouseup={this.props.mouseup}
                    gameover={this.props.gameover}
                    gamewin={this.props.gamewin}
                    numberofcell={this.props.numberofcell}
                />
            </div>
        )
    }
}

export default GamePanel;