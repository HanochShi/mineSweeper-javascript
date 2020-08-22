import React from 'react';

class Menu extends React.Component {
    render(props) {

        let items = []
        if (this.props.belongto == "游戏") {
            items = [
                {
                    text: "开局",
                    selected: false,
                    globalShortKey: "F2",
                },
                {
                    text: "---",
                },
                {
                    text: "初级",
                    selected: this.props.menuitemselected[0],
                    globalShortKey: "",
                },
                {
                    text: "中级",
                    selected: this.props.menuitemselected[1],
                    globalShortKey: "",
                },
                {
                    text: "高级",
                    selected: this.props.menuitemselected[2],
                    globalShortKey: "",
                },
                {
                    text: "自定义",
                    selected: this.props.menuitemselected[3],
                    globalShortKey: "",
                },
                {
                    text: "---",
                },
                {
                    text: "标记",
                    selected: this.props.menuitemselected[4],
                    globalShortKey: "",
                },
                {
                    text: "声音",
                    selected: this.props.menuitemselected[5],
                    globalShortKey: "",
                },
                {
                    text: "---",
                },
                {
                    text: "扫雷英雄榜",
                    selected: false,
                    globalShortKey: "",
                },
                {
                    text: "---",
                },
                {
                    text: "退出",
                    selected: false,
                    globalShortKey: "",
                },
            ]
        } else if (this.props.belongto == "帮助") {
            items = [
                {
                    text: "玩法说明",
                    selected: false,
                    globalShortKey: "",
                },
                {
                    text: "源码@Github",
                    selected: false,
                    globalShortKey: "",
                },
            ]
        }

        let menuClass
        if (this.props.active) {
            menuClass = "menu active"
        } else {
            menuClass = "menu"
        }

        let menuToRender = []
        let hrCounter = 0;
        for (let item of items) {
            if (item.text === "---") {
                menuToRender.push(<hr key={hrCounter++}></hr>)
            } else {
                let selectState = item.selected ? "selected mark" : "unselected mark"
                    menuToRender.push(
                        <div key={item.text} className="menu-item" onClick={this.props.menuhandlerset[item.text]}>
                            <span className={selectState}></span>
                            <span className="menu-item-text">{item.text}</span>
                            <span className="global-shortcut-key">{item.globalShortKey}</span>
                        </div>
                    )
            }
        }

        return (
            <div className={menuClass}>
                {menuToRender}
            </div>
        )
    }
}

export default Menu;