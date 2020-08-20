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
                    <img src={numberPath[leftMineCountLCD[0]]} alt={leftMineCountLCD[0]} />
                    <img src={numberPath[leftMineCountLCD[1]]} alt={leftMineCountLCD[1]} />
                    <img src={numberPath[leftMineCountLCD[2]]} alt={leftMineCountLCD[2]} />
                </div>
                <button
                    id="restartButton"
                    style={{
                    backgroundImage: `url(${smilePath})`,
                    }}
                    >
                </button>
                <div id="timeElapsed">
                    <img src={numberPath[timeElapseLCD[0]]} alt={timeElapseLCD[0]} />
                    <img src={numberPath[timeElapseLCD[1]]} alt={timeElapseLCD[1]} />
                    <img src={numberPath[timeElapseLCD[2]]} alt={timeElapseLCD[2]} />
                </div>
            </div>
        )
    }
}

export default InfoPanel;