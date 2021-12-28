import React from "react";
import EventCard from "./EventCard";
import CurrentDate from "./CurrentDate";
import './Daily.css';

export default class Daily extends React.Component{

    generateCardGroup = () => {
        return this.props.events.sort((a,b) => {
            if(a.timeStart < b.timeStart){ return -1; }
            if(a.timeStart > b.timeStart){ return 1; }
            return 0;
        });
    }

    render(){
        let i = 0;
        return(
            <div>
                <CurrentDate currentDate={new Date()}/>
                <div className="row overflow-auto flex-row flex-nowrap pb-3 custom-scrollbar-css" >
                    {this.generateCardGroup().map(e => {
                        return(
                            <div className="col-3" key={i++}>
                                <EventCard zevent={e}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}