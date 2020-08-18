import React from 'react';
import logoUrl from './assets/image/logo.png';
import TitleBarButtons from './titleBarButtons';

class TitleBar extends React.Component {
    render() {
        return (
            <div className="bg-theme title-bar">
                <div className="left">
                    <img src={logoUrl} alt="icon"></img>
                    {this.props.children}
                </div>
                <div className="right">
                    <TitleBarButtons enable={[1, 1, 1]} />
                </div>
            </div>
        )
    }
}

export default TitleBar;