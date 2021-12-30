import React from "react";
import CountDownrip from "../test/CountDownrip";



export default class NextEvent extends React.Component {

    //Trouve le prochain event qui va arriver
    findNextEvent = (listEvents) => {
        var minEvent = listEvents[0];
       for (let index = 0; index < listEvents.length; index++) {
            if (listEvents[index]['dayStart'] === minEvent['dayStart']){ //Si les deux events commencent le même jour
                if (listEvents[index]['timeStart'] < minEvent['timeStart']) minEvent = listEvents[index]; //On compare à l'heure du début et on change la valeur de minEvent si le nouvel event est plus proche que l'autre
            } else { //Sinon
                if (listEvents[index]['dayStart'] < minEvent['dayStart']) minEvent = listEvents[index];
            }
        }
        return minEvent;
    }

    dateConvertFormat = (date) => {
        return date.split('-').reverse().join('/');
    }

    timeConvertFormat = (time) => {
        return time.slice(0, 5);
    }

    renderMainInfo = (newEvent) => { return (
        <div className="col-sm-6">
            <div className="card text-center bg-dark">
            <div className="card-header text-warning">
                    <h3>Prochain évent</h3>
                </div>
                <div className="card-body">
                    <h2 className="card-title text-warning mb-4">
                        {newEvent.title}
                    </h2>
                    <h5 className="card-text text-white">
                    {this.dateConvertFormat(newEvent.dayStart)} {(newEvent.dayEnd === null || newEvent.dayEnd === newEvent.dayStart) ? "" : "- " + this.dateConvertFormat(newEvent.dayEnd)}
                    </h5>
                    <h5 className="card-text text-white">
                    {this.timeConvertFormat(newEvent.timeStart)} {newEvent.timeEnd !== null ? "- " + this.timeConvertFormat(newEvent.timeEnd) : ""}
                    </h5>
                </div>
                <div className="card-footer text-warning"><p className="card-text">{newEvent.localisation}</p></div>
            </div>
        </div>
    ); }

    renderDetails = (newEvent) => { return(
        <div className="col-sm-6">
            <div className="card text-center bg-dark">
                <div className="card-header text-warning">
                    <h3>Temps restant avant le début du prochain évent</h3>
                </div>
                <div className="card-body">
                    <h2 className="card-title text-warning mb-4">
                        <CountDownrip event={newEvent} currentDate={this.props.currentDate}/>

                        {/* {this.useCountdown(newEvent)} */}
                        {/* <Countdown2 event={newEvent} current = {this.props.currentDate} /> */}
                    </h2>
                    <h5 className="card-text text-white">
                    {this.dateConvertFormat(newEvent.dayStart)} {(newEvent.dayEnd === null || newEvent.dayEnd === newEvent.dayStart) ? "" : "- " + this.dateConvertFormat(newEvent.dayEnd)}
                    </h5>
                    <h5 className="card-text text-white">
                    {this.timeConvertFormat(newEvent.timeStart)} {newEvent.timeEnd !== null ? "- " + this.timeConvertFormat(newEvent.timeEnd) : ""}
                    </h5>
                </div>
                <div className="card-footer text-warning"><p className="card-text">{newEvent.localisation}</p></div>
            </div>
        </div>
    ); }

    renderNextEvent = (nextEvent) => { return(
        <div className="row">
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
        return (this.props.listEvents.length === 0) ? <div>{this.renderEmptyEvents()}</div> : <div>{this.renderNextEvent(this.findNextEvent(this.props.listEvents))}</div>;
    }
}