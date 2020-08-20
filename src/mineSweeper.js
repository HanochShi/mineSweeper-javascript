import React from 'react';
import TitleBar from './titleBar';
import MenuBar from './menuBar';
import GamePanel from './gamePanel';

class MineSweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cellRowCount: 9,
            cellColumnCount: 9,
            mineCount: 10,
            mineState: null,
            chessState: null,
            gameOver: false,
            numberOfCell: []
            /* 
            chessState:
            0: unexplored
            1: expolored
            2: flagged
            3: questioned
            4: triggered
            5: revealed
            */
        }

        //create a 2-dim array to store if there's a mine in every certain cell 
        this.state.mineState = []
        for (let i = 0; i < this.state.cellRowCount; ++i) {
            this.state.mineState.push(new Array(this.state.cellColumnCount).fill(false))
        }
        
        for (let i = 0; i < this.state.mineCount; ++i) {
            let temp, i, j
            do {
                temp = Math.random() * this.state.cellRowCount * this.state.cellColumnCount
                i = Math.floor(temp / this.state.cellColumnCount)
                j = Math.floor(temp % this.state.cellColumnCount)
            } while (this.state.mineState[i][j])
            this.state.mineState[i][j] = true;
        }
        console.log(this.state.mineState)

        //create a 2-dim array to store current display state of every cell
        this.state.chessState = []
        for (let i = 0; i < this.state.cellRowCount; ++i) {
            this.state.chessState.push(new Array(this.state.cellColumnCount).fill(0))
        }

        //calculate and store how many mines there are around certain cell
        for (let i = 0; i < this.state.cellRowCount; ++i) {
            this.state.numberOfCell.push(new Array(this.state.cellColumnCount).fill(0))
        }
        for (let i = 0; i < this.state.cellRowCount; ++i) {
            for (let j = 0; j < this.state.cellColumnCount; ++j) {
                if (i !== 0 && j !== 0 && this.state.mineState[i-1][j-1]) this.state.numberOfCell[i][j]++
                if (i !== 0 && this.state.mineState[i-1][j]) this.state.numberOfCell[i][j]++
                if (i !== 0 && j !== this.state.cellColumnCount-1 && this.state.mineState[i-1][j+1]) this.state.numberOfCell[i][j]++
                if (j !== 0 && this.state.mineState[i][j-1]) this.state.numberOfCell[i][j]++
                if (j !== this.state.cellColumnCount-1 && this.state.mineState[i][j+1]) this.state.numberOfCell[i][j]++
                if (i !== this.state.cellRowCount-1 && j !== 0 && this.state.mineState[i+1][j-1]) this.state.numberOfCell[i][j]++
                if (i !== this.state.cellRowCount-1 && this.state.mineState[i+1][j]) this.state.numberOfCell[i][j]++
                if (i !==this.state.cellRowCount-1 && j !== this.state.cellColumnCount-1 && this.state.mineState[i+1][j+1]) this.state.numberOfCell[i][j]++
            }
        }
    }

    // when player trigger a mine, reveal all rest mines
    revealAllMines = () => {
        let tempState = this.state.chessState
        for (let i = 0; i < this.state.cellRowCount; ++i) {
            for (let j = 0; j < this.state.cellColumnCount; ++j) {
                if (this.state.mineState[i][j] && tempState[i][j] !== 4) {
                    tempState[i][j] = 5
                }
            }
        }
        this.setState({
            chessState: tempState,
        })
    }

    continuousExplore = (x, y, tempState) => {
        x = parseInt(x)
        y = parseInt(y)
        let newState = tempState
        if (x == -1 || y == -1 || x == this.state.cellRowCount-1 || y == this.state.cellColumnCount-1) {
            return newState
        }
        if (!this.state.mineState[x][y] && newState[x][y] == 0) {
            if (this.state.numberOfCell[x][y] == 0) {
                newState[x][y] = 1
                this.continuousExplore(x-1, y-1, newState)
                this.continuousExplore(x-1, y, newState)
                this.continuousExplore(x-1, y+1, newState)
                this.continuousExplore(x, y-1, newState)
                this.continuousExplore(x, y+1, newState)
                this.continuousExplore(x+1, y-1, newState)
                this.continuousExplore(x+1, y, newState)
                this.continuousExplore(x+1, y+1, newState)
            } else {
                newState[x][y] = 1
            }
        }
        return newState
    }
    
    handleClick = (e) => {
        let x = e.target.dataset.posx
        let y = e.target.dataset.posy
        let tempState = this.state.chessState
        let gameOver = this.state.gameOver
        if (!this.state.mineState[x][y] ) {
            tempState = this.continuousExplore(x, y, this.state.chessState)
        } else {
            tempState[x][y] = 4
            gameOver = true
            this.revealAllMines()
        }
        this.setState({
            chessState: tempState,
            gameOver: gameOver,
        })
    }

    render() {
        const menuItems = ["游戏", "帮助"]
        const cellRowCount = this.state.cellRowCount
        const cellColumnCount = this.state.cellColumnCount
        const mineState = this.state.mineState
        const chessState = this.state.chessState
        const gameOver =this.state.gameOver
        const numberOfCell = this.state.numberOfCell

        let width = parseInt(cellColumnCount) * 18 + 26 + "px";

        return (
            <div style={{width: width}}>
                <TitleBar>
                    <span>扫雷</span>
                </TitleBar>
                <MenuBar menuItems={menuItems}>
                </MenuBar>
                <GamePanel
                    row={cellRowCount}
                    column={cellColumnCount}
                    mineState={mineState}
                    chessState={chessState}
                    handleclick={this.handleClick}
                    gameover={gameOver}
                    numberofcell={numberOfCell}
                    />
            </div>
        )
    }
}

export default MineSweeper;