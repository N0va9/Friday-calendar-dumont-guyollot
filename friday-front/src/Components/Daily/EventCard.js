import React from "react";

export default class EventCard extends React.Component{

    render(){
        let zevent = this.props.zevent;
        if(zevent !== undefined){
            return(
                <div className="card text-center">
                    <div className="card-header bg-dark text-warning">
                        <h6>{zevent.title}</h6>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{zevent.description === "none" ? "no description" : zevent.description}</p>
                        <p className="card-text">{zevent.timeStart} - {zevent.timeEnd}</p>
                    </div>
                    <div className="card-footer bg-dark text-warning">
                    <p className="card-text">{zevent.localisation}</p>
                    </div>
                </div>
            );
        } else{
            return(
                <div>
                </div>
            );
        }
    }

}