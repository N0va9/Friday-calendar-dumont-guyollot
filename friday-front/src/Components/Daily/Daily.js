import React from "react";
import EventCard from "./EventCard";
import CurrentDate from "./CurrentDate";
import '../ScrollBar.css'

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
        let allEvents = this.generateCardGroup();
        if(allEvents.length === 0){
            return(
                <div>
                    <CurrentDate currentDate={new Date()}/>
                    <h5 className="display-6 text-center p-3 mt-3">Pas d'évènements aujourd'hui</h5>
                </div>
            );
        } else {
            return(
                <div>
                    <CurrentDate currentDate={new Date()}/>
                    <div className="row overflow-auto flex-row flex-nowrap pb-3 custom-scrollbar-css d-none d-md-none d-lg-flex" >
                        {allEvents.map(e => {
                            return(
                                <div className="col-lg-3" key={i++}>
                                    <EventCard zevent={e}/>
                                </div>
                            );
                        })}
                    </div>
                    <div className="d-lg-none">
                        {allEvents.map(e => {
                            return(
                                <div className="col-lg-3" key={i++}>
                                    <EventCard zevent={e}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
    }
}