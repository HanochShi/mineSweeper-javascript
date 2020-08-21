import React from 'react';
import smilePic from './assets/image/smile.png';
import deadPic from './assets/image/dead.png';
import winPic from './assets/image/win.png';
import shockingPic from './assets/image/shocking.png'

let nums = []
for (let i = 0; i < 10; ++i) {
    nums.push(i.toString())
}
const numberPath = nums.map(item => require("./assets/image/" + item + ".png"))

class InfoPanel extends React.Component {
    
    render(props) {

        let leftMineCountLCD = [
                Math.floor(this.props.leftminecount / 100), 
                Math.floor(this.props.leftminecount / 10) % 10,
                Math.floor(this.props.leftminecount % 10)
            ],
            timeElapseLCD = [
                Math.floor(this.props.timeelapsed / 100), 
                Math.floor(this.props.timeelapsed / 10) % 10,
                Math.floor(this.props.timeelapsed % 10)
            ];

        let buttonPic = null
        if (this.props.gameover) {
            buttonPic = deadPic
        } else if (this.props.gamewin) {
            buttonPic = winPic
        } else if (this.props.mousepressed) {
            buttonPic = shockingPic
        } else {
            buttonPic = smilePic
        }

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
                    backgroundImage: `url(${buttonPic})`,
                    }}
                    onClick={this.props.handlerestart}
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