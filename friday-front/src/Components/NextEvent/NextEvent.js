import React from "react";
import CountDown from "./CountDown";

export default class NextEvent extends React.Component {
    state = {
        CountDownInEvent: false
    }

    dateConvertFormat = (date) => {
        return date.split('-').reverse().join('/');
    }

    timeConvertFormat = (time) => {
        return time.slice(0, 5);
    }

    changeState = (bool) => {
        this.setState({CountDownInEvent: bool});
    }

    renderMainInfo = (newEvent) => {
        if(newEvent !== undefined){
            return (
                <div className="col-lg-7 mt-3 ">
                    <div className="card text-center bg-dark rounded-0 ">
                    <div className="card-header text-warning">
                            <h3>{(this.state.CountDownInEvent) ? "Event actuel ": "Prochain évent"}</h3>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title text-warning mb-4">
                                {newEvent.title}
                            </h2>
                            <h5 className="card-title text-white mb-4">
                                {newEvent.description}
                            </h5>
                            <h5 className="card-text text-white">
                            {this.dateConvertFormat(newEvent.dayStart)} {(newEvent.dayEnd === null || newEvent.dayEnd === newEvent.dayStart) ? "" : "- " + this.dateConvertFormat(newEvent.dayEnd)}
                            </h5>
                            <h5 className="card-text text-white">
                            {this.timeConvertFormat(newEvent.timeStart)} {newEvent.timeEnd !== null ? "- " + this.timeConvertFormat(newEvent.timeEnd) : ""}
                            </h5>
                        </div>
                        <div className="card-footer text-warning">
                            <p className="card-text">{newEvent.localisation}</p>
                        </div>
                    </div>
                </div>
            );
        }
    }

    renderDetails = (newEvent) => {
        if(newEvent !== undefined){
            return(
                <div className="col-lg-5 align-self-stretch mt-3">
                    <div className="card text-center bg-dark rounded-0 ">
                        <div className="card-header text-warning">
                            <h3>{(this.state.CountDownInEvent) ? <span className="red">Event en cours</span> :"Temps restant avant le prochain évent"}</h3>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">
                                <CountDown event = {newEvent} deleteEvent={this.props.deleteEvent} changeState={this.changeState}/>
                            </h2>
                        </div>
                    </div>
                </div>
            );
        }
    }

    renderNextEvent = (nextEvent) => { return(
        <div className="row m-3">
            {this.renderMainInfo(nextEvent)}
            {this.renderDetails(nextEvent)}
            
        </div>
    ); }

    renderEmptyEvents = () => { return(
            <div>
                <h5 className="display-6 text-center p-3 mt-3">Aucun prochain évènement de prévu</h5>
            </div>
    ); }

    render() {
        return (this.props.nextEvent === undefined || this.props.nextEvent.length === 0) ? <div>{this.renderEmptyEvents()}</div> : <div>{this.renderNextEvent(this.props.nextEvent)}</div>;
    }
}