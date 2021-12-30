import React from "react";

export default class CountDownrip extends React.Component{
    render(){
        let timer = this.generateTimer();
        return(
            <div classname="timer-container">
                <div className="timer">
                    <div className="countdown">
                        <p>{timer.timerDays} : {timer.timerHours} : {timer.timerMinutes}</p>
                    </div>
                </div>
            </div>
        );
    }

    generateTimer = () => {
        let date = new Date(this.props.event.dayStart);
        let time = this.props.event.timeStart.slice().split(":");

        return {
            timerDays: this.props.currentDate.getDate() - date.getDate(),
            timerHours: time[0],
            timerMinutes: time[1],
            timerSecondes: time[2]
        };
    }
}

