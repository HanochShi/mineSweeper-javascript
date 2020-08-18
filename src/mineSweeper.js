import React from 'react';
import TitleBar from './titleBar';
import MenuBar from './menuBar';
import GamePanel from './gamePanel';

class MineSweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guiWidth: "200px",
            cellRowCount: 10,
            cellColumnCount: 10,
        }
    }

    render() {
        const menuItems = ["游戏", "帮助"]
        const cellRowCount = this.state.cellRowCount
        const cellColumnCount = this.state.cellColumnCount

        return (
            <div style={{width: this.state.guiWidth}}>
                <TitleBar>
                    <span>扫雷</span>
                </TitleBar>
                <MenuBar menuItems={menuItems}>
                </MenuBar>
                <GamePanel  row={cellRowCount} column={cellColumnCount}/>
            </div>
        )
    }
}

export default MineSweeper;