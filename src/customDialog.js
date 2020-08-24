import React from 'react';
import TitleBar from './titleBar'

class CustomDialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }

    render(props) {
        if (this.props.show) {
            this.state.visible = true
        }

        return (
            <div
                className="custom-dialog"
                style={{
                    visibility: this.props.show ? "visible" : "hidden",
                    top: this.props.top,
                    left: this.props.left,
                }}
            >
                <TitleBar
                    enable={[0, 0, 1]}
                    handleclose={this.props.handleClose}
                >
                自定义雷区
                </TitleBar>
                <div className="normal-panel">
                    <div className="left">
                        <label>高度：<input type="number" name="row" defaultValue={this.props.row}></input></label>
                        <label>宽度：<input type="number" name="column" defaultValue={this.props.column}></input></label>
                        <label>雷数：<input type="number" name="mineCount" defaultValue={this.props.minecount}></input></label>
                    </div>
                    <div className="right">
                        <button onClick={
                            () => this.props.handleok(
                            parseInt(document.querySelector("input[name='row']").value),
                            parseInt(document.querySelector("input[name='column']").value),
                            parseInt(document.querySelector("input[name='mineCount']").value),
                            )
                        }>确定</button>
                        <button onClick={this.props.handleClose}>取消</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default CustomDialog;