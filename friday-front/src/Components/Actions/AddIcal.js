import React from "react";
import IcalForm from "./IcalForm";

export default class AddIcal extends React.Component{

    render(){
        return(
            <div>
                <button type="button" className="btn btn-lg btn-outline-warning rounded rounded-circle float-sm-none float-md-end" data-bs-toggle="offcanvas" data-bs-target="#AddIcal" aria-controls="AddIcal">
                    <i className="fa fa-calendar-plus"></i>
                </button>
                <IcalForm onIcalAdd={this.props.onIcalAdd}/>
            </div>
        );
    }
}