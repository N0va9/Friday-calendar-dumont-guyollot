import React from "react";
import GoogleForm from "./GoogleForm";


export default class AddGoogle extends React.Component{
    render(){
        return(
            <div>
                <button type="button" className="btn btn-lg btn-outline-danger rounded rounded-circle float-end" data-bs-toggle="offcanvas" data-bs-target="#AddGoogle" aria-controls="AddGoogle">
                    <span className="fw-bold">G</span>
                </button>
                <GoogleForm onGoogleAdd={this.props.onGoogleAdd}/>
            </div>
        );
    }
}