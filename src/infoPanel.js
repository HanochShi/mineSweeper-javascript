import React from 'react';
import smilePath from './assets/image/smile.png';

let nums = []
for (let i = 0; i < 10; ++i) {
    nums.push(i.toString())
}
const numberPath = nums.map(item => require("./assets/image/" + item + ".png"))

class InfoPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leftMineCount: 40,
            timeElapse: 0,
        }
    }

    render() {
        console.log(numberPath)
        let leftMineCountLCD = [
                Math.floor(this.state.leftMineCount / 100), 
                Math.floor(this.state.leftMineCount / 10) % 10,
                Math.floor(this.state.leftMineCount % 10)
            ],
            timeElapseLCD = [
                Math.floor(this.state.timeElapse / 100), 
                Math.floor(this.state.timeElapse / 10) % 10,
                Math.floor(this.state.timeElapse % 10)
            ];

        return (
            <div className="info-panel">
                <div id="leftMineCount">
                    <img src={numberPath[leftMineCountLCD[0]]} />
                    <img src={numberPath[leftMineCountLCD[1]]} />
                    <img src={numberPath[leftMineCountLCD[2]]} />
                </div>
                <button
                    id="restartButton"
                    style={{
                    backgroundImage: `url(${smilePath})`,
                    }}
                    >
                </button>
                <div id="timeElapsed">
                    <img src={numberPath[timeElapseLCD[0]]} />
                    <img src={numberPath[timeElapseLCD[1]]} />
                    <img src={numberPath[timeElapseLCD[2]]} />
                </div>
            </div>
        )
    }
}

class RestartButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "pressed": false,
        }
    }

    render() {
        const pressed = this.state.pressed
        if (!pressed) {
            return (
                <button
                    id="restartButton"
                    style={{
                    backgroundImage: `url(${smilePath})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "80%",
                    border: "4px outset #fff",
                    }}
                    // onMouseDown={ (e) => {
                    //     this.setState({pressed: true})
                    //     e.preventDefault()
                    //     } }
                    // onMouseUP={ (e) => {
                    //     this.setState({pressed: false})
                    //     e.preventDefault()
                    //     } }
                    >
                </button>
            )
        } else {
            return (
                <button
                    id="restartButton"
                    style={{
                    backgroundImage: `url(${smilePath})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "80%",
                    border: "4px inset #fff",
                    }}
                    // onMouseDown={ (e) => {
                    //     this.setState({pressed: true})
                    //     e.preventDefault()
                    //     } }
                    // onMouseUP={ (e) => {
                    //     this.setState({pressed: false})
                    //     e.preventDefault()
                    //     } }
                    >
                </button>
            )
        }

        
    }
}

export default InfoPanel;