import React from 'react';

class Cell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            explored: false,
            flagged: false,
            questioned: false,
            number: 0,
        }
    }

    render() {
        const explored = this.state.explored
        const flagged = this.state.flagged
        const questioned = this.state.questioned
        const number = this.state.number

        if (explored) {
            return (
                <button className="cell-explored"></button>
            )
        } else if (flagged) {
            return (
                <button className="cell-flagged"></button>
            )
        } else if (questioned) {
            return (
                <button className="cell-questioned"></button>
            )
        } else {
            return (
                <button className="cell-unexplored"></button>
            )
        }
    }
}

export default Cell;