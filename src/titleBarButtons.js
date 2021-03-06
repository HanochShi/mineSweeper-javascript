import React from 'react';

class titleBarButtons extends React.Component {
    render(props) {
        return (
            <div className="title-bar-buttons">
                {this.props.enable[0] ? <button>─</button> : null}
                {this.props.enable[1] ? <button>◻</button> : null}
                {this.props.enable[2] ? <button onClick={this.props.handleclose ? this.props.handleclose : null}>╳</button> : null}
            </div>
        )
    }
}

export default titleBarButtons;