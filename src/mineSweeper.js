import React from 'react';
import TitleBar from './titleBar';
import MenuBar from './menuBar'

class MineSweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guiWidth: "400px",
        }
    }

    render() {
        const menuItems = ["游戏", "帮助"]

        return (
            <div style={{width: this.state.guiWidth}}>
                <TitleBar>
                    <span>扫雷</span>
                </TitleBar>
                <MenuBar menuItems={menuItems}>
                </MenuBar>
            </div>
        )
    }
}

export default MineSweeper;