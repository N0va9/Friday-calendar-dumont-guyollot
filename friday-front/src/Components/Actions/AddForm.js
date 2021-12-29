import React from "react";


export default class AddForm extends React.Component{

    state = {
        title: '',
        dayStart: '',
        dayEnd: '',
        timeStart: '',
        timeEnd: '',
        localisation: '',
        description: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let obj = {
            title: this.state.title,
            dayStart: this.state.dayStart,
            dayEnd: this.state.dayEnd,
            timeStart: this.state.timeStart + ":00",
            timeEnd: this.state.timeEnd + ":00",
            localisation: this.state.localisation === "" ? "No localisation" : this.state.localisation,
            description: this.state.description=== "" ? "No description" : this.state.description
        };
        this.props.onEventAdd(obj);
        this.setState({
            title: '',
            dayStart: '',
            dayEnd: '',
            recurrence: '',
            timeStart: '',
            timeEnd: '',
            localisation: '',
            description: ''
        });
    }

    handleChange = (event) => {
        const value = event.currentTarget.value;
        this.setState({[event.currentTarget.id]: value});
    }

    render(){
        return(
            <div className="offcanvas offcanvas-start" tabIndex={-1} id="AddEvent" aria-labelledby="AddEventLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Ajouter un évènement</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form className="form form-control border-0" onSubmit={this.handleSubmit}>
                        <div className="input-group mb-3">
                            <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-heading"></i></span>
                            <input type="text" className="form-control" placeholder="Titre" value={this.state.title} onChange={this.handleChange} aria-label="title" id="title" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-calendar-plus"></i></span>
                            <input type="date" className="form-control" placeholder="date de début" value={this.state.dayStart} onChange={this.handleChange} aria-label="dayStart" id="dayStart" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-calendar-minus"></i></span>
                            <input type="date" className="form-control" placeholder="date de fin" value={this.state.dayEnd} onChange={this.handleChange} aria-label="dayEnd" id="dayEnd" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-hourglass-start"></i></span>
                            <input type="time" className="form-control" placeholder="heure de début" value={this.state.timeStart} onChange={this.handleChange} aria-label="timeStart" id="timeStart" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-hourglass-end"></i></span>
                            <input type="time" className="form-control" placeholder="Heure de fin" value={this.state.timeEnd} onChange={this.handleChange} aria-label="timeEnd" id="timeEnd" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-location-arrow"></i></span>
                            <input type="text" className="form-control" placeholder="Localisation" value={this.state.localisation} onChange={this.handleChange} aria-label="localisation" id="localisation" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-info"></i></span>
                            <textarea type="text" className="form-control" placeholder="Description"  value={this.state.description} onChange={this.handleChange} aria-label="description" id="description" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <button type="submit" className="btn btn-dark text-warning form-control">confirmer<i className="ms-3 fa fa-check"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}