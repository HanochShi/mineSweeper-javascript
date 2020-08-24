import React from 'react';

class Cell extends React.Component {

    render(props) {
        const cellState = this.props.cellstate.toString()
        const number = this.props.number
        const top = this.props.pos[0] * 18
        const left = this.props.pos[1] * 18

        //set different styles for cell by its state
        let cellClass = ""
        switch(cellState) {
            case "0": 
                if(!this.props.gameover && !this.props.gamewin) {
                    cellClass="cell unexplored"
                } else {
                    cellClass="cell disabled"
                }
                break
            case "1": 
                cellClass="cell explored explored-" + number
                break
            case "2":
                cellClass="cell flagged"
                break
            case "3":
                cellClass="cell questioned"
                break
            case "4":
                cellClass="cell explored triggered"
                break
            case "5":
                cellClass="cell explored revealed"
                break
            case "6":
                cellClass="cell pressed"
                break
            case "7":
                cellClass="cell wrong-flagged"
                break
            default:
                cellClass="cell unexplored"
        }

        // set different event handler function for cell by game's state
        let handleRightClick = (this.props.gameover || this.props.gamewin) ? (e) => {e.preventDefault()} : this.props.rightclick

        return (
            <button
                style={{
                    position: "absolute",
                    top: top + "px",
                    left: left + "px",
                }}
                data-posx={this.props.pos[0]}
                data-posy={this.props.pos[1]}
                className={cellClass}
                onMouseDown={this.props.mousedown}
                onMouseUp={this.props.mouseup}
                onContextMenu={handleRightClick}
                onMouseOver={this.props.mouseover}
                onMouseLeave={this.props.mouseleave}
            >
            {number}
            </button>
        )
    }
}

export default Cell;