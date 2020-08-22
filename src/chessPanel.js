import React from 'react';
import Cell from './cell'

class ChessPanel extends React.Component {
    render(props) {
        const row = this.props.row
        const column = this.props.column
        const mineState = this.props.mineState
        const chessState = this.props.chessState
        const numberOfCell = this.props.numberofcell

        //create cells to render
        let cells = []

        for (let i = 0; i < row; ++i) {
            for (let j = 0; j < column; ++j) {
                cells.push(
                    <Cell
                        key={[i, j]}
                        mine={mineState[i][j]}
                        number={numberOfCell[i][j]}
                        pos={[i, j]}
                        cellstate={chessState[i][j]}
                        handleclick={this.props.handleclick}
                        rightclick={this.props.rightclick}
                        mouseover={this.props.mouseover}
                        mouseleave={this.props.mouseleave}
                        gameover={this.props.gameover}
                        gamewin={this.props.gamewin}
                        >
                    </Cell>
                )
            }
        }

        let height = row * 18 + "px"

        return (
            <div
                style={{
                    height: height
                    }}
                className="chess-panel"
                onMouseDown={this.props.mousedown}
                onMouseUp={this.props.mouseup}
            >
            {cells}
            </div>
        )
    }
}

export default ChessPanel;