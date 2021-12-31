import React from "react";

export default class DeleteEvent extends React.Component{

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.delete(this.props.event);
    }

    render(){
        return(
            <div className="offcanvas offcanvas-start" tabIndex={-1} id={this.props.id} aria-labelledby={this.props.id+"Label"}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Supprimer l'évènement</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form className="form form-control border-0" onSubmit={this.handleSubmit}>
                        <h6>
                            Veuillez confirmer la suppression de l'évènement.
                        </h6>
                        <button type="submit" className="btn btn-danger form-control" data-bs-dismiss="offcanvas" aria-label="Close">Supprimer<i className="ms-3 fa fa-exclamation-triangle"></i></button>
                    </form>
                </div>
            </div>
        );
    }
}