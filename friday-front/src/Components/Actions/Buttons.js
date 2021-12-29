import React from "react";
import AddEvent from "./AddEvent";
import AddIcal from "./AddIcal";


export default class Buttons extends React.Component{

    render(){
        return(
            <div className="row fixed-bottom m-5 d-grid gap-2">
                <AddEvent onEventAdd={this.props.postPersonal}/>
                <AddIcal onIcalAdd={this.props.postIcalendar}/>
            </div>
        );
    }
}