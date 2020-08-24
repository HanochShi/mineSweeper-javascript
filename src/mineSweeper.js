import React from 'react';
import TitleBar from './titleBar';
import MenuBar from './menuBar';
import GamePanel from './gamePanel';
import CustomDialog from './customDialog';

class MineSweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //variable about chess state
            cellRowCount: 9,
            cellColumnCount: 9,
            mineCount: 10,
            mineState: null,
            chessState: null,
            gameOver: false,
            gameWin: false,
            numberOfCell: [],
            mousePressed: false,

            //variable about info panel
            timeElapsed: 0,
            leftMineCount: 0,
            timer: null,
            cellExplored: 0,

            //variable about menu bar
            activeMenu: -1,
            menuShown: false,
            menuItemSelected: [true, false, false, false, true, false],

            //variable about custom dialog
            customDialogShow: false,
            customDialogTop: 0,
            customDialogLeft: 0,
            /* 
            chessState:
            0: unexplored
            1: expolored
            2: flagged
            3: questioned
            4: triggered
            5: revealed
            6: mouse down(not up yet)
            7: flagged but actually not mine 
            */
        }

        this.state.leftMineCount = this.state.mineCount

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

    handleGlobalClick = (e) => {
        if (e.target.nodeName === "LI") {
            if (this.state.activeMenu === e.target.dataset.index) {
                this.setState({
                    activeMenu: -1,
                    menuShown: false,
                })
            } else {
                this.setState({
                    activeMenu: e.target.dataset.index,
                    menuShown: true,
                })
            }
        } else {
            this.setState({
                activeMenu: -1,
                menuShown: false,
            })
        }
    }

    handleGlobalMouseOver = (e) => {
        if (e.target.nodeName === "LI" && this.state.menuShown) {
            this.setState({
                activeMenu: e.target.dataset.index,
            })
        }
    }

    handleMenuBeginner = () => {
        let menuItemSelected = this.state.menuItemSelected
        menuItemSelected[0] = true
        menuItemSelected[1] = menuItemSelected[2] = menuItemSelected[3] = false
        this.setState({
            menuItemSelected: menuItemSelected,
            activeMenu: -1,
            menuShown: false,
        })
        this.restartGame(9, 9, 10)
    }

    handleMenuIntermediate = () => {
        let menuItemSelected = this.state.menuItemSelected
        menuItemSelected[1] = true
        menuItemSelected[0] = menuItemSelected[2] = menuItemSelected[3] = false
        this.setState({
            menuItemSelected: menuItemSelected,
            activeMenu: -1,
            menuShown: false,
        })
        this.restartGame(16, 16, 40)
    }

    handleMenuExpert = () => {
        let menuItemSelected = this.state.menuItemSelected
        menuItemSelected[2] = true
        menuItemSelected[0] = menuItemSelected[1] = menuItemSelected[3] = false
        this.setState({
            menuItemSelected: menuItemSelected,
            activeMenu: -1,
            menuShown: false,
        })
        this.restartGame(16, 30, 99)
    }

    handleMenuCustom = () => {
        let top = document.querySelector(".mine-sweeper").clientHeight / 2 - document.querySelector(".custom-dialog").clientHeight / 2
        top = top >= 0 ? top : 0
        let left = document.querySelector(".mine-sweeper").clientWidth / 2 - document.querySelector(".custom-dialog").clientWidth / 2
        left = left >= 0 ? left : 0
        this.setState({
            customDialogShow: true,
            customDialogTop: top,
            customDialogLeft: left,
        })
    }

    handleCustomDialogClose = () => {
        this.setState({
            customDialogShow: false,
        })
    }

    handleCustomDialogOK = (row, column, mineCount) => {
        this.handleCustomDialogClose()
        row = row < 9 ? 9 : row
        row = row > 24 ? 24 : row
        column = column < 9 ? 9 : column
        column = column > 30 ? 30 : column
        mineCount = mineCount < 1 ? 1 : mineCount
        mineCount = mineCount > (row - 1) * (column - 1) ? (row - 1) * (column - 1) : mineCount
        this.restartGame(row, column, mineCount)
        this.setState ({
            menuItemSelected: [false, false, false, true]
        })
    }

    handleMenuExit = () => {
        //not possible in chrome, so just forget it~
    }

    handleMenuRule = () => {
        window.open("https://zhuanlan.zhihu.com/p/26674913")
    }

    handleMenuGithub = () => {
        window.open("https://github.com/HanochShi/mineSweeper-javascript")
    }

    // when player trigger a mine, reveal all rest mines
    revealAllMines = () => {
        let tempState = this.state.chessState
        for (let i = 0; i < this.state.cellRowCount; ++i) {
            for (let j = 0; j < this.state.cellColumnCount; ++j) {
                if (this.state.mineState[i][j] && tempState[i][j] !== 4 && tempState[i][j] !== 2) {
                    tempState[i][j] = 5
                }
                if (tempState[i][j] == 2 && !this.state.mineState[i][j]) {
                    tempState[i][j] = 7
                }
            }
        }
        this.setState({
            chessState: tempState,
        })
    }

    //if flip a cell that there's no mines around, flip all cells around it
    continuousExplore = (x, y, tempState) => {
        x = parseInt(x)
        y = parseInt(y)
        let newState = tempState
        if (x == -1 || y == -1 || x == this.state.cellRowCount || y == this.state.cellColumnCount) {
            return newState
        }
        if (!this.state.mineState[x][y] && (newState[x][y] == 6 || newState[x][y] == 0)) {
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
            this.setState((state) => ({
                cellExplored: parseInt(state.cellExplored) + 1,
            }))
        }
        return newState
    }

    handleRightClick = (e) => {
        e.preventDefault()

        let x = e.target.dataset.posx
        let y = e.target.dataset.posy
        let tempState = this.state.chessState
        let gameOver = this.state.gameOver
        let gameWin = this.state.gameWin
        let timer = this.state.timer
        let leftMineCount = this.state.leftMineCount

        if (!timer && !gameOver && !gameWin) {
            this.setState({
                timeElapsed: 1
            })
            timer = setInterval(this.tick, 1000)
        }

        if (!tempState[x][y]) {
            tempState[x][y] = 2
            leftMineCount--
        } else if (tempState[x][y] == 2) {
            tempState[x][y] = 3
            leftMineCount++
        } else if (tempState[x][y] == 3) {
            tempState[x][y] = 0
        }

        this.setState({
            chessState: tempState,
            timer: timer,
            leftMineCount: leftMineCount,
        })
    }

    handleMouseDown = (e) => {
        if (e.button) {
            return
        }

        this.setState({
            mousePressed: true,
        })

        let x = e.target.dataset.posx
        let y = e.target.dataset.posy
        let tempState = this.state.chessState
        if (tempState[x][y] == 0 && !this.state.gameOver && !this.state.gameWin) {
            tempState[x][y] = 6
            this.setState({
                chessState: tempState
            })
        }
    }

    handleMouseUp = (e) => {
        if (e.button) {
            return
        }

        this.setState({
            mousePressed: false,
        })

        let x = e.target.dataset.posx
        let y = e.target.dataset.posy
        let tempChessState = this.state.chessState
        let tempMineState = this.state.mineState
        let gameOver = this.state.gameOver
        let gameWin = this.state.gameWin
        let timer = this.state.timer
        let row = this.state.cellRowCount
        let column = this.state.cellColumnCount

        if (tempChessState[x][y] == 6 && !gameOver && !gameWin){
            if (!timer && !gameOver && !gameWin) {
                this.setState({
                    timeElapsed: 1
                })
                timer = setInterval(this.tick, 1000)
                //If player triggered a mine at very first, move the mine to let the game continue
                if (tempMineState[x][y]) {
                    moveMine:
                    for (let i = 0; i < row; ++i) {
                        for (let j = 0; j < column; ++j) {
                            if (!tempMineState[i][j]) {
                                tempMineState[i][j] = true
                                break moveMine
                            }
                        }
                    }
                    tempMineState[x][y] = false
                    this.setState({
                        mineState: tempMineState
                    })
                }
            }
            if (!tempMineState[x][y] ) {
                tempChessState = this.continuousExplore(x, y, this.state.chessState)
            } else {
                tempChessState[x][y] = 4
                gameOver = true
                this.revealAllMines()
                clearInterval(timer)
            }
            this.setState({
                chessState: tempChessState,
                gameOver: gameOver,
                timer: timer,
            })
        }
    }

    handleMouseOver = (e) => {
        let x = e.target.dataset.posx
        let y = e.target.dataset.posy
        let tempState = this.state.chessState
        let gameOver = this.state.gameOver
        let gameWin = this.state.gameWin

        if (this.state.mousePressed && tempState[x][y] == 0 && !gameOver && !gameWin) {
            tempState[x][y] = 6
            this.setState({
                chessState: tempState,
            })
        }
    }

    handleMouseLeave = (e) => {
        let x = e.target.dataset.posx
        let y = e.target.dataset.posy
        let tempState = this.state.chessState
        let gameOver = this.state.gameOver
        let gameWin = this.state.gameWin
        
        if (this.state.mousePressed && !gameOver && !gameWin && tempState[x][y] == 6) {
            tempState[x][y] = 0
            this.setState({
                chessState: tempState,
            })
        }
    }

    restartGame = (row, column, mineCount) =>  {

        // create new mine state array
        let newMineState = []
        for (let i = 0; i < row; ++i) {
            newMineState.push(new Array(column).fill(false))
        }
        for (let i = 0; i < mineCount; ++i) {
            let temp, i, j
            do {
                temp = Math.random() * row * column
                i = Math.floor(temp / column)
                j = Math.floor(temp % column)
            } while (newMineState[i][j])
            newMineState[i][j] = true;
        }

        // create new chess state array
        let newChessState = []
        for (let i = 0; i < row; ++i) {
            newChessState.push(new Array(column).fill(0))
        }

        // create new array of how many mines there are around certain cell
        let newNumberOfCell = []
        for (let i = 0; i < row; ++i) {
            newNumberOfCell.push(new Array(column).fill(0))
        }
        for (let i = 0; i < row; ++i) {
            for (let j = 0; j < column; ++j) {
                if (i !== 0 && j !== 0 && newMineState[i-1][j-1]) newNumberOfCell[i][j]++
                if (i !== 0 && newMineState[i-1][j]) newNumberOfCell[i][j]++
                if (i !== 0 && j !== column-1 && newMineState[i-1][j+1]) newNumberOfCell[i][j]++
                if (j !== 0 && newMineState[i][j-1]) newNumberOfCell[i][j]++
                if (j !== column-1 && newMineState[i][j+1]) newNumberOfCell[i][j]++
                if (i !== row-1 && j !== 0 && newMineState[i+1][j-1]) newNumberOfCell[i][j]++
                if (i !== row-1 && newMineState[i+1][j]) newNumberOfCell[i][j]++
                if (i !==row-1 && j !== column-1 && newMineState[i+1][j+1]) newNumberOfCell[i][j]++
            }
        }

        if (this.state.timer) {
            clearInterval(this.state.timer)
        }

        this.setState({
            cellRowCount: row,
            cellColumnCount: column,
            mineCount: mineCount,
            leftMineCount: mineCount,
            mineState: newMineState,
            chessState: newChessState,
            numberOfCell: newNumberOfCell,
            gameOver: false,
            gameWin: false,
            cellExplored: 0,
            timer: null,
            timeElapsed: 0,
        })
    }

    tick = () => {
        this.setState({
            timeElapsed: (this.state.timeElapsed == 999) ? 999 : this.state.timeElapsed + 1
        })
    }

    //judge if this game have won
    componentDidUpdate() {
        if (!this.state.gameWin && this.state.cellExplored + this.state.mineCount == this.state.cellRowCount * this.state.cellColumnCount) {
            this.setState({
                gameWin: true
            })
            clearInterval(this.state.timer)
        }
    }

    render() {
        const menuItems = ["游戏", "帮助"]
        const cellRowCount = this.state.cellRowCount
        const cellColumnCount = this.state.cellColumnCount
        const mineState = this.state.mineState
        const chessState = this.state.chessState
        const gameOver =this.state.gameOver
        const gameWin = this.state.gameWin
        const numberOfCell = this.state.numberOfCell
        const timeElapsed = this.state.timeElapsed

        let width = parseInt(cellColumnCount) * 18 + 26 + "px";

        let menuHandlerSet = {
            "开局": (() => this.restartGame(this.state.cellRowCount, this.state.cellColumnCount, this.state.mineCount)),
            "初级": this.handleMenuBeginner,
            "中级": this.handleMenuIntermediate,
            "高级": this.handleMenuExpert,
            "自定义": this.handleMenuCustom,
            "退出": this.handleMenuExit,
            "玩法说明": this.handleMenuRule,
            "源码@Github": this.handleMenuGithub
        }

        return (
            <div
                style={{width: width}}
                onClick={this.handleGlobalClick}
                onMouseOver={this.handleGlobalMouseOver}
                className="mine-sweeper"
            >
                <TitleBar>
                    <span>扫雷</span>
                </TitleBar>
                <MenuBar
                    menubaritems={menuItems}
                    activemenu={this.state.activeMenu}
                    menuitemselected={this.state.menuItemSelected}
                    menuhandlerset={menuHandlerSet}
                />
                <GamePanel
                    row={cellRowCount}
                    column={cellColumnCount}
                    mineState={mineState}
                    chessState={chessState}
                    rightclick={this.handleRightClick}
                    mouseover={this.handleMouseOver}
                    mouseleave={this.handleMouseLeave}
                    mousedown={this.handleMouseDown}
                    mouseup={this.handleMouseUp}
                    mousepressed={this.state.mousePressed}
                    gameover={gameOver}
                    gamewin={gameWin}
                    numberofcell={numberOfCell}
                    handlerestart={() => this.restartGame(this.state.cellRowCount, this.state.cellColumnCount, this.state.mineCount)}
                    timeelapsed={timeElapsed}
                    leftminecount={this.state.leftMineCount}
                />
                <CustomDialog
                    show={this.state.customDialogShow}
                    handleClose={this.handleCustomDialogClose}
                    handleok={this.handleCustomDialogOK}
                    top={this.state.customDialogTop}
                    left={this.state.customDialogLeft}
                    row={this.state.cellRowCount}
                    column={this.state.cellColumnCount}
                    minecount={this.state.mineCount}
                />
            </div>
        )
    }
}

export default MineSweeper;