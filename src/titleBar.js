import React from 'react';
import logoUrl from './assets/image/logo.png';
import TitleBarButtons from './titleBarButtons';

class TitleBar extends React.Component {
    render(props) {
        return (
            <div className="bg-theme title-bar">
                <div className="left">
                    <img src={logoUrl} alt="icon"></img>
                    {this.props.children}
                </div>
                <div className="right">
                    <TitleBarButtons
                        enable={this.props.enable ? this.props.enable : [1, 1, 1]} 
                        handleclose={this.props.handleclose ? this.props.handleclose : null}
                    />
                </div>
            </div>
        )
    }
}

export default TitleBar;