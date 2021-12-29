import React from "react";
import UpdateEvent from "../Actions/UpdateEvent";

export default class EventCard extends React.Component{

    render(){
        let zevent = this.props.zevent;
        let title = zevent.title.slice().replaceAll(" ", "");
        if(zevent !== undefined){
            return(
                <div className="card text-center">
                    <div className="card-header bg-dark text-warning">
                        <h6>{zevent.title}</h6>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{zevent.description === "none" ? "no description" : zevent.description}</p>
                        <p className="card-text">{zevent.timeStart} - {zevent.timeEnd}</p>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-sm btn-warning rounded rounded-0" data-bs-toggle="offcanvas" data-bs-target={"#update"+title} aria-controls={"update"+title}>update</button>
                            <button type="button" className="btn btn-sm btn-danger rounded rounded-0" data-bs-toggle="offcanvas" data-bs-target={"#delete"+title} aria-controls={"delete"+title}>delete</button>
                        </div>
                    </div>
                    <div className="card-footer bg-dark text-warning">
                        <div className="card-text">{zevent.localisation}</div>
                    </div>
                    <UpdateEvent id={"update"+title} update={this.props.update} event={zevent}/>
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