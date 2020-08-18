import React from 'react';

class ChessPanel extends React.Component {
    render(props) {
        const row = this.props.row
        const column = this.props.column

        let cells = [];
        for (let i = 0; i < row; ++i) {
            for (let j = 0; j < column; ++j) {
                cells.push(<button className="cell"></button>)
            }
        }

        return (
            <div className="chess-panel">
                {cells}
            </div>
        )
    }
}

export default ChessPanel;