import React from 'react';
import DayCard from "./DayCard";
import CurrentMonthAndYear from './CurrentMonthYear';
import { DAYS } from '../../Const';

class Calendar extends React.Component{
    //Savoir si le mois actuel finit par un 28, 30 ou 31
    getLastDate = () => {
        let d = new Date(this.props.currentDate);
        d.setFullYear(this.props.currentDate.getFullYear() + 1);
        d.setMonth((this.props.currentDate.getMonth() + 1) % 12);
        d.setDate(0);
        return d.getDate();
    }

    getFirstDay = () => {
        let d = new Date(this.props.currentDate);
        d.setDate(1);
        return d.getDay();
    }

    //Vérifier si y'a des events et renvoie le tableau avec tous les events du mois
    daysWithEvents = () => {
        if(this.props.events !== []){
            let d = new Date(this.props.currentDate);
            let tmp = [];
            if(this.props.events !== undefined){
                for(let i = 1; i <= this.getLastDate(); i++){
                    for(let j = 0; j < this.props.events.length; j++){
                        let dayStart = new Date(this.props.events[j]['dayStart']);
                        let dayEnd = new Date(this.props.events[j]['dayEnd']);
                        if((i >= dayStart.getDate() && dayStart.getFullYear() === d.getFullYear()) && dayStart < dayEnd){
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
        //Si le premier jour n'est pas un dimanche
        if(firstDay !== 0){
            let t = new Date(this.props.currentDate);
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

    headerCalendar = () => { return(
            <div className='row d-none d-sm-none d-lg-flex p-1 bg-dark text-warning'>
                <CurrentMonthAndYear currentDate = {this.props.currentDate}/>
                {DAYS.map((element, e) => {
                    return (<h5 className="col-sm p-1 text-center">{element}</h5>)
                })}
            </div>
        );
    }

    buildCalendar = () => {
        let i = 0;
        return(
            <div>
                {this.generateCalendar().map(week => {
                    return(<div className='row' key={i++}>{week}</div>);
                })}
            </div>
        );
    }

    drawCalendar = () => { return(
            <div>
                {this.headerCalendar()}
                {this.buildCalendar()}
            </div>
    ) ;}

    render() { return(
            <div>
                {this.drawCalendar()}
            </div>
    ); }
}

export default Calendar;