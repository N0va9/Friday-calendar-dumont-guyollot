import React from 'react';
import DayCard from "./DayCard";
import CurrentMonthAndYear from './CurrentMonthYear';

class Calendar extends React.Component{
    getLastDate = () => {
        let d = new Date();
        d.setFullYear(this.props.currentDate.getFullYear() + 1);
        d.setMonth((this.props.currentDate.getMonth() + 1) % 12);
        d.setDate(0);
        return d.getDate();
    }

    getFirstDay = () => {
        let d = new Date();
        d.setDate(1);
        return d.getDay();
    }

    daysWithEvents = () => {
        if(this.props.eventsPersonal !== []){
            let d = this.props.currentDate;
            let tmp = [];
            if(this.props.eventsPersonal !== undefined){
                for(let i = 1; i <= this.getLastDate(); i++){
                    for(let j = 0; j < this.props.eventsPersonal.length; j++){
                        let dayStart = new Date(this.props.eventsPersonal[j]['dayStart']);
                        let dayEnd = new Date(this.props.eventsPersonal[j]['dayEnd']);
                        if((i >= dayStart.getDate() && dayStart.getFullYear() === d.getFullYear()) && (dayEnd.getFullYear() >= d.getFullYear() && i <= dayEnd.getDate())){
                            tmp.push(i);
                            break;
                        }
                    }
                }
            }
            return tmp;
        }
    }

    generateCalendar = () => {
        let firstDay = this.getFirstDay();
        let calendarDays = [];
        let week = [];
        if(firstDay !== 0){
            let t = new Date();
            t.setDate(0);
            for(let i = t.getDate() - (firstDay) + 1; i <= t.getDate(); i++){
                week.push(<DayCard date={i} event={false} key={100 + i} inMonth={false}/>);
            }
        }
        let i = 1;
        let last = this.getLastDate();
        let daysWithEvents = this.daysWithEvents();
        while(i <= last){
            week.push(<DayCard date={i} event={daysWithEvents.includes(i)} key={i} inMonth={true}/>);
            if(week.length % 7 === 0){
                calendarDays.push(week);
                week = [];
            }
            i++;
        }
        i = 1;
        while(week.length % 7 !== 0){
            week.push(<DayCard date={i} event={false} key={100 + i} inMonth={false}/>);
            i++;
        }
        calendarDays.push(week);
        return calendarDays;
    }

    render() {
        let i = 0;
        const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        return (
            <div> 
                <div className='row d-none d-sm-none d-lg-flex p-1 bg-dark text-warning'>
                    {days.map((element, e) => {
                        return (<h5 className="col-sm p-1 text-center">{element}</h5>)
                    })}
                </div>
                {this.generateCalendar().map(week => {
                    return(
                        <div className='row' key={i++}>
                            {week}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Calendar;