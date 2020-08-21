import React from 'react';

class menuBar extends React.Component {
    render(props) {
        return (
            <div className="menu-bar">
                <ul>
                    {this.props.menubaritems.map((item, index) => 
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