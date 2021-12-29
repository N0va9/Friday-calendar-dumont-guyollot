import React from "react";
import AddForm from "./AddForm";


export default class AddEvent extends React.Component{

    render(){
        return(
            <div>
                <button type="button" className="btn btn-lg btn-outline-success rounded rounded-circle float-sm-none float-md-end" data-bs-toggle="offcanvas" data-bs-target="#AddEvent" aria-controls="AddEvent">
                    <i className="fa fa-plus"></i>
                </button>
                <AddForm onEventAdd={this.props.onEventAdd}/>
            </div>
        );
    }
}