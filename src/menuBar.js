import React from 'react';
import Menu from './menu.js'

class menuBar extends React.Component {
    render(props) {
        return (
            <div className="menu-bar">
                <ul>
                    {this.props.menubaritems.map((item, index) => 
                        <li
                            key={index}
                            className={this.props.activemenu == index ? "menu-bar-item shown" : "menu-bar-item"}
                            data-index={index}>
                            {item}
                            <Menu
                                belongto={item}
                                active={this.props.activemenu == index ? true : false}
                                menuitemselected={this.props.menuitemselected}
                                menuhandlerset={this.props.menuhandlerset}
                            />
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default menuBar;