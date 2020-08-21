import React from 'react';

class Menu extends React.Component {
    render(props) {

        const items = this.props.menuitem

        let menuToRender = []
        for (let item of items) {
            if (item.text === "---") {
                menuToRender.push(<hr></hr>)
            } else {
                if (item.selected) {
                    menuToRender.push(
                        <div key={item.text} className="menu-item">
                        <span className="selected-mark"></span>
                        <span className="menu-item-text">{item.text}</span>
                        <span className="global-shortcut-key">{item.globalShortKey}</span>
                        </div>
                    )
                } else {
                    menuToRender.push(
                        <div key={item.text} className="menu-item">
                        <span className="unselected-mark"></span>
                        <span className="menu-item-text">{item.text}</span>
                        <span className="global-shortcut-key">{item.globalShortKey}</span>
                        </div>
                    )
                }
            }
        }

        return (
            <div className="menu">
                {menuToRender}
            </div>
        )
    }
}

export default Menu;