import React from "react";
import Moment from 'moment';
import "./CountDown.css";

export default class CountDown extends React.Component {
    state = {
        timerDays : undefined,
        timerHours : undefined,
        timerMinutes : undefined,
        timerSeconds : undefined
    }

    convertEventToTime = (event) => {
        return new Date(event.dayStart+"T"+event.timeStart);
    }

    origin = () => {
        return new Date(0);
    }


    startTimer = () => {
        this.interval = setInterval(() => {
            const { event } = this.props;

            const then = Moment(this.convertEventToTime(event));
            const now = Moment();
            
            const countdown =  Moment(then - now);
            const origin = Moment(this.origin());
            
            const days = countdown.format('DD') - origin.format('DD');
            const hours = countdown.format('HH') - origin.format('HH');
            const minutes = countdown.format('mm') - origin.format('mm');
            const seconds = countdown.format('ss') - origin.format('ss');
            
            if (days <= 0 || hours <= 0 || minutes <= 0 || seconds <= 0)  {
                this.setState({days, hours, minutes, seconds})
            }
            
        }, 1000);
    }

    componentDidMount = () => {
        this.startTimer();
    }

    componentWillUnmount = () => {
        if(this.interval) clearInterval(this.interval);
    }

    render() {
        const { days, hours, minutes, seconds } = this.state;
        return (true) ? <div>{this.drawCountdown(days, hours, minutes, seconds)}</div>: null;   
    }
    

    drawCountdown = (days, hours, minutes, seconds) => {
        const daysRadius = this.mapNumber(days, 30, 0, 0, 360);
        const hoursRadius = this.mapNumber(hours, 24, 0, 0, 360);
        const minutesRadius = this.mapNumber(minutes, 60, 0, 0, 360);
        const secondsRadius = this.mapNumber(seconds, 60, 0, 0, 360);

        let radiusArray = [daysRadius, hoursRadius, minutesRadius, secondsRadius];
        let valuesArray = [days, hours, minutes, seconds];
        let textArray = ["JOURS", "HEURES", "MINUTES", "SECONDES"]
        let i = 0;
        return(
            <div>
                <div className="d-flex align-items-center justify-content-center flex-wrap text-white row">
                    {valuesArray.map(value => {
                        return (
                            <div className="d-flex align-items-center justify-content-center flex-column col-sm-3" key={i++}>
                                {value}
                                <span className="fs-6">{(value>2)?textArray[i]:textArray[i].substring(0, textArray[i].length - 1)}</span>
                                {/* {this.SVGCircle(radiusArray[i])} */}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    
    SVGCircle = ( radius ) => {
        return (<svg className="countdown-svg">
            <path fill = "none" stroke="#fff" strokeWidth="4" d={this.drawArc(50 , 100, 48, 0, radius)}/>
        </svg>);
    }

    polarToCartesian = (centerX, centerY, radius, angle) => {
        return{
            x: centerX + (radius * Math.cos((angle-90) * Math.PI / 180.0)),
            y: centerY + (radius * Math.sin((angle-90) * Math.PI / 180.0))
        };
    }

    drawArc = (x, y, radius, startAngle, endAngle) => {
        var start = this.polarToCartesian(x, y, radius, endAngle);
        var end = this.polarToCartesian(x, y, radius, startAngle);

        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
        return d;
    }

    mapNumber = (number, min1, max1, min2, max2) => {
        return (number - min1) * (max2 - min2) / (max1 - min1) + min2;
    }
}



/*
import React from "react";
import Moment from 'moment';
import "./CountDown.css";

export default class CountDown extends React.Component {
    state = {
        timerDays : undefined,
        timerHours : undefined,
        timerMinutes : undefined,
        timerSeconds : undefined
    }

    convertEventToTime = (event) => {
        return new Date(event.dayStart+"T"+event.timeStart);
    }

    origin = () => {
        return new Date(0);
    }
    
    checkCountDown = (days, hours, minutes, seconds) => {
        return (days <= 0 && hours <= 0 || minutes <= 0 || seconds <= 0)  ? this.setState({days, hours, minutes, seconds}) : null;
    }

    startTimer = () => {
        this.interval = setInterval(() => {
            const { event } = this.props;

            const then = Moment(this.convertEventToTime(event));
            const now = Moment();
            
            const countdown =  Moment(then - now);
            const origin = Moment(this.origin());
            
            const days = countdown.format('DD') - origin.format('DD');
            const hours = countdown.format('HH') - origin.format('HH');
            const minutes = countdown.format('mm') - origin.format('mm');
            const seconds = countdown.format('ss') - origin.format('ss');
            
            this.checkCountDown(days, hours, minutes, seconds);
        }, 1000);
    }

    componentDidMount = () => {
        this.startTimer();
    }

    componentWillUnmount = () => {
        if(this.interval) clearInterval(this.interval);
    }

    render() {
        const { days, hours, minutes, seconds } = this.state;
        return (true) ? <div>{this.drawCountdown(days, hours, minutes, seconds)}</div>: null;   
    }
    

    drawCountdown = (days, hours, minutes, seconds) => {
        const daysRadius = this.mapNumber(days, 30, 0, 0, 360);
        const hoursRadius = this.mapNumber(hours, 24, 0, 0, 360);
        const minutesRadius = this.mapNumber(minutes, 60, 0, 0, 360);
        const secondsRadius = this.mapNumber(seconds, 60, 0, 0, 360);

        let radiusArray = [daysRadius, hoursRadius, minutesRadius, secondsRadius];
        let valuesArray = [days, hours, minutes, seconds];
        let textArray = ["JOURS", "HEURES", "MINUTES", "SECONDES"]
        let i = 0;
        return(
            <div>
                <div className="d-flex align-items-center justify-content-center flex-wrap text-white row">
                    {valuesArray.map(value => {
                        return (
                            <div className="d-flex align-items-center justify-content-center flex-column col-sm-3" key={i++}>
                                {value}
                                <span className="fs-6">{(value>2)?textArray[i]:textArray[i].substring(0, textArray[i].length - 1)}</span>
                                {this.SVGCircle(radiusArray[i])}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    
    SVGCircle = ( radius ) => {
        return (<svg className="countdown-svg">
            <path fill = "none" stroke="#fff" strokeWidth="4" d={this.drawArc(50 , 100, 48, 0, radius)}/>
        </svg>);
    }

    polarToCartesian = (centerX, centerY, radius, angle) => {
        return{
            x: centerX + (radius * Math.cos((angle-90) * Math.PI / 180.0)),
            y: centerY + (radius * Math.sin((angle-90) * Math.PI / 180.0))
        };
    }

    drawArc = (x, y, radius, startAngle, endAngle) => {
        var start = this.polarToCartesian(x, y, radius, endAngle);
        var end = this.polarToCartesian(x, y, radius, startAngle);

        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
        return d;
    }

    mapNumber = (number, min1, max1, min2, max2) => {
        return (number - min1) * (max2 - min2) / (max1 - min1) + min2;
    }
}





*/