import React from "react";


export default class GoogleForm extends React.Component{
    render(){
        return(
            <div className="offcanvas offcanvas-start" tabIndex={-1} id="AddGoogle" aria-labelledby="AddGoogleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Synchronisation Google Calendar</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <p>
                        Lors de la première Synchronisation avec google calendar, vous serez re-diriger vers une page de connexion
                        google. Une fois cela, Afin de pouvoir obtenir les évènements, il faut rendre les agendas concerné publique
                        afin de pouvoir récupérer leur contenu.
                    </p>
                    <button type="button" className="btn btn-dark text-warning form-control" onClick={this.props.onGoogleAdd}>Synchronisation<i className="ms-3 fa fa-sync"></i></button>
                </div>
            </div>
        );
    }
}