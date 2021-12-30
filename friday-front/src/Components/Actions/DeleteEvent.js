import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class DeleteEvent extends React.Component{
    render(){
        return(
            <div className="offcanvas offcanvas-start" tabIndex={-1} id={this.props.id} aria-labelledby={this.props.id+"Label"}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Supprimer l'évènement</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <p>
                        Veuillez confirmer la suppression de l'évènement.
                    </p>
                    <button type="button" className="btn btn-danger form-control" onClick={() => this.props.delete(this.props.event)} data-bs-dismiss="offcanvas" aria-label="Close">Supprimer<i className="ms-3 fa fa-exclamation-triangle"></i></button>
                </div>
                <ToastContainer/>
            </div>
        );
    }
}