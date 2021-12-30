import React from "react";
import currentDate from "./CurrentDate";

class NextEvent extends React.Component {
    
    findNextEvent = () => {
        return ; /*Trouve l'event le plus proche et le return  */
    }


    renderMainInfo = () => { return (
            <div>
                <div className="card text-center">
                    <div className="card-header bg-dark text-warning"><h2>{newEvent.title}</h2></div>
                    <div className="card-body">
                        <p className="card-text">{newEvent.dayStart} {newEvent.dayEnd !== null ? "- " + newEvent.dayEnd : ""}</p>
                        <p className="card-text">{newEvent.timeStart} {newEvent.timeEnd !== null ? "- " + newEvent.timeEnd : ""}</p>
                    </div>
                    <div className="card-footer bg-dark text-warning"><p className="card-text">{newEvent.localisation}</p></div>
                </div>
            </div>
    ); }


    renderDetails = (newEvent) => { return(
        <div>
            <div className="card text-center">
                <CurrentDate currentDate={new Date()}/>
                <div className="card-header bg-dark text-warning">
                    <h6>{this.timeLeft(currentDate, newEvent)}</h6>
                </div>
                <div className="card-body">
                    
                    <p className="card-text">{zevent.timeStart} - {zevent.timeEnd}</p>
                </div>
                <div className="card-footer bg-dark text-warning"><p className="card-text">{zevent.description === "none" ? "no description" : zevent.description}</p></div>
            </div>
        </div>
    ); }

    timeLeft = (currentDate, newEvent) => {
        /*Affiche un décompte (avec le bon format) dynamique qui décrémente jusqu'à ce que le temps soit écoulé  
        event - current
        */
    }

    renderNextEvent = (nextEvent) => { return(
        <div className="rowC">
            {this.renderMainInfo(nextEvent)}
            {this.renderDetails(nextEvent)}
        </div>
    ); }

    renderEmptyEvents = () => { return(
            <div>
                <h5 className="display-6 text-center p-3 mt-3">Aucun prochain évènement de prévu</h5>
            </div>
    ); }

    render () {
        let nextEvent = this.findNextEvent();
        return (nextEvent === undefined) ? <div>{this.renderEmptyEvents()}</div> : <div>{this.renderNextEvent(nextEvent)}</div>;
    }
}