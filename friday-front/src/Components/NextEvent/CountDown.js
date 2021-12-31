import React from "react";
import Moment from 'moment';
import "./CountDown.css";

export default class CountDown extends React.Component {
    state = {
        days : undefined,
        hours : undefined,
        minutes : undefined,
        seconds : undefined,
        oldEvent : undefined,
        inEvent : false
    }

    setEvent = (date, tab) => {
        date.setHours(tab[0]);
        date.setMinutes(tab[1]);
        date.setSeconds(tab[2]);
        return date;
    }

    eventToDateEnd = (event) => {
        let eventDate = new Date(event.dayEnd);
        let eventDateTime = event.timeEnd.slice().split(":");

        return this.setEvent(eventDate, eventDateTime);
    }

    eventToDateStart = (event) => {
        let eventDate = new Date(event.dayStart);
        let eventDateTime = event.timeStart.slice().split(":");
        return this.setEvent(eventDate, eventDateTime);
    }


    setTimer = (then, now) => {
        const days = then.diff(now, 'days');
        const hours = then.diff(now, 'hours') % 24;
        const minutes = then.diff(now, 'minutes') % 60;
        const seconds = then.diff(now, 'seconds') % 60;

        this.setState({days, hours, minutes, seconds});
        if(this.state.oldEvent !== this.props.event){
            this.setState({oldEvent: this.props.event});
        }
    }

    startTimer = () => {
        this.interval = setInterval(() => {
            const then = Moment(this.eventToDateStart(this.props.event));
            const now = Moment();
            
            this.setTimer(then, now);
            this.props.changeState(false);
        }, 1000); 
    }

    startTimerEnd = () => {
        this.interval = setInterval(() => {
            const then = Moment(this.eventToDateEnd(this.props.event));
            const now = Moment();

            this.setTimer(then, now);
            this.props.changeState(true);
        }, 1000); 
    }

    
    InEvent = () => {
        let event = this.props.event;
        return (this.eventToDateStart(event).valueOf() < (new Date()).valueOf() && (new Date()).valueOf() < this.eventToDateEnd(event).valueOf());
    }

    startDeleteTimer = () => {
        this.endInterval = setInterval(() => {
            let eventEnd = this.eventToDateEnd(this.props.event);
            if(eventEnd.valueOf() <= new Date().valueOf()){
                clearInterval(this.endInterval);
                this.props.deleteEvent(this.state.oldEvent);                
            }
        }, 1000);
    }

    componentDidMount = () => {
        let eventStart = this.eventToDateStart(this.props.event);
        if(eventStart.valueOf() > new Date().valueOf()){
            this.startTimer();
            this.startDeleteTimer();
        }
    }


    componentDidUpdate = () =>{
        if (this.state.days <= 0 && this.state.hours <= 0 && this.state.minutes <= 0 && this.state.seconds <= 0)  {
            clearInterval(this.interval);
            if(this.InEvent){
                this.startTimerEnd();
            } 
            if(this.state.oldEvent !== this.props.event && this.state.oldEvent !== undefined){
                clearInterval(this.interval);
                this.startTimer();
                this.startDeleteTimer();
            }
        }
    }


    componentWillUnmount = () => {
        if(this.interval) clearInterval(this.interval);
        if(this.endInterval) clearInterval(this.endInterval);
    }

    render() {
        const days = this.state.days !== undefined ? this.state.days : 0;
        const hours = this.state.hours !== undefined ? this.state.hours : 0;
        const minutes = this.state.minutes !== undefined ? this.state.minutes : 0;
        const seconds = this.state.seconds !== undefined ? this.state.seconds : 0;
        return (<div>{this.drawCountdown(days, hours, minutes, seconds)}</div> );
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
                <h2 className="d-flex align-items-center justify-content-center flex-wrap text-white row">
                    {valuesArray.map(value => {
                        return (
                            <div className="d-flex align-items-center justify-content-center flex-column col-sm-3" key={i++}>
                                {this.SVGCircle(radiusArray[i], value, textArray[i])}                             
                                <h6 >{(value>=2) ? textArray[i] : textArray[i].substring(0, textArray[i].length - 1)}</h6>
                            </div>
                        );
                    })}
                </h2>
        );
    }

    changeColor = (textArray) => {
        if(this.props.CountDownInEvent) return "#dc3545";
        if(textArray === "SECONDES") return "#ffc107";
        else {
            return "#f8f9fa";
        }
        
    } 

    
    SVGCircle = ( radius, value, textArray) => {
        return (<svg className="countdown-svg">
                    <text x="35" y="65" fill={this.changeColor(textArray)}> {(value < 10) ? '0' + value : value}</text>
            <path fill = "none" stroke={this.changeColor(textArray)} strokeWidth="4" d={this.drawArc(50 , 55, 30, 0, radius)}/>
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