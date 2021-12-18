import React from 'react';
import DayCard from "./DayCard";

class Calendar extends React.Component{

    currentMonthAndYear = () => {
        let d = new Date();
        switch(d.getMonth()) {
            case 0 :
                return (<h4 className='display-6 text-center border-top border-3 p-3'>Janvier {d.getFullYear()}</h4>);
            case 1 :
                return (<h4 className='display-6 text-center border-top border-3 p-3'>Février {d.getFullYear()}</h4>);
            case 2 :
                return (<h4 className='display-6 text-center border-top border-3 p-3'>Mars {d.getFullYear()}</h4>);
            case 3 :
                return (<h4 className='display-6 text-center border-top border-3 p-3'>Avril {d.getFullYear()}</h4>);
            case 4 :
                return (<h4 className='display-6 text-center border-top border-3 p-3'>Mai {d.getFullYear()}</h4>);
            case 5 :
                return (<h4 className='display-6 text-center border-top border-3 p-3'>Juin {d.getFullYear()}</h4>);
            case 6 :
                return (<h4 className='display-6 text-center border-top border-3 p-3'>Juillet {d.getFullYear()}</h4>);
            case 7 :
                return (<h4 className='display-6 text-center border-top border-3 p-3'>Aout {d.getFullYear()}</h4>);
            case 8 :
                return (<h4 className='display-6 text-center border-top border-3 p-3'>Septembre {d.getFullYear()}</h4>);
            case 9 :
                return (<h4 className='display-6 text-center border-top border-3 p-3'>Octobre {d.getFullYear()}</h4>);
            case 10 :
                return (<h4 className='display-6 text-center border-top border-3 p-3'>Novembre {d.getFullYear()}</h4>);
            case 11 :
                return (<h4 className='display-6 text-center border-top border-3 p-3'>Décembre {d.getFullYear()}</h4>);
            default :
                return (<h4 className='display-6 text-center border-top border-3 p-3'>A new month is born {d.getFullYear()}</h4>);
        }
    };

    generateCalendar = () => {
        let d = new Date();
        let m = d.getMonth();
        let y = d.getFullYear();
        d.setDate(1);
        let firstDay = d.getDay();
        d.setFullYear(y + 1);
        d.setMonth((m + 1) % 12);
        d.setDate(0);
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
        while(i <= d.getDate()){
            let event = false;
            /*for(let j = 0; j < this.props.eventsPersonal[0].length; j++){
                let dayStart = new Date(this.props.eventsPersonal[0][j]['dayStart']);
                let dayEnd = new Date(this.props.eventsPersonal[0][j]['dayEnd']);
                if((i >= dayStart.getDate() && dayStart.getFullYear() === d.getFullYear()) && (dayEnd.getFullYear() >= d.getFullYear() && i <= dayEnd.getDate())){
                    event = true;
                    break;
                }
            }*/
            week.push(<DayCard date={i} event={event} key={i} inMonth={true}/>);
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

    render(){
        let i = 0;
        return(
            <div>
                {this.currentMonthAndYear()}
                <div className='row d-none d-sm-none d-lg-flex p-1 bg-dark text-warning'>
                    <h5 className="col-sm p-1 text-center">Dimanche</h5>
                    <h5 className="col-sm p-1 text-center">Lundi</h5>
                    <h5 className="col-sm p-1 text-center">Mardi</h5>
                    <h5 className="col-sm p-1 text-center">Mercredi</h5>
                    <h5 className="col-sm p-1 text-center">Jeudi</h5>
                    <h5 className="col-sm p-1 text-center">Vendredi</h5>
                    <h5 className="col-sm p-1 text-center">Samedi</h5>
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