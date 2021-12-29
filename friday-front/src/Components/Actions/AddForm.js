import React from "react";


export default class AddForm extends React.Component{

    render(){
        return(
            <div className="offcanvas offcanvas-start" tabIndex={-1} id="AddEvent" aria-labelledby="AddEventLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Ajouter un évènement</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="input-group mb-3">
                        <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-heading"></i></span>
                        <input type="text" className="form-control" placeholder="Titre" aria-label="title" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-calendar-plus"></i></span>
                        <input type="text" className="form-control" placeholder="date de début" aria-label="dayStart" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-calendar-minus"></i></span>
                        <input type="text" className="form-control" placeholder="date de fin" aria-label="dayEnd" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-hourglass-start"></i></span>
                        <input type="text" className="form-control" placeholder="heure de début" aria-label="timeStart" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-hourglass-end"></i></span>
                        <input type="text" className="form-control" placeholder="Heure de fin" aria-label="timeEnd" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-location-arrow"></i></span>
                        <input type="text" className="form-control" placeholder="Localisation" aria-label="localisation" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-info"></i></span>
                        <input type="text" className="form-control" placeholder="Description" aria-label="description" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <button type="submit" className="btn btn-dark text-warning">confirmer<i className="ms-3 fa fa-check"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}