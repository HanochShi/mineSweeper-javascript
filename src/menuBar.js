import React from 'react';

class menuBar extends React.Component {
    render(props) {
        console.log(this.props)
        return (
            <div className="menu-bar">
                <ul>
                    {this.props.menuItems.map((item, index) => 
                        <li key={index}>
                            {item}
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default menuBar;