import React from "react";

export default class UpdateEvent extends React.Component{

    state = {
        title: this.props.event.title,
        dayStart: this.props.event.dayStart,
        dayEnd: this.props.event.dayEnd,
        timeStart: this.props.event.timeStart,
        timeEnd: this.props.event.timeEnd,
        localisation: this.props.event.localisation === null ? "pas de localisation" : this.props.event.localisation,
        description: this.props.event.description === null ? "pas de description" : this.props.event.description
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let obj = {
            title: this.state.title,
            dayStart: this.state.dayStart,
            dayEnd: this.state.dayEnd === "" ? this.state.dayStart : this.state.dayEnd,
            timeStart: this.state.timeStart === "" ? "00:00:00" : this.state.timeStart,
            timeEnd: this.state.timeEnd === "" ? "00:00:00" : this.state.timeEnd,
            localisation: this.state.localisation === "" ? "pas de localisation" : this.state.localisation,
            description: this.state.description === "" ? "pas de description" : this.state.description
        };
        this.props.update(this.props.event.id, this.props.event, obj);
    }

    handleChange = (event) => {
        const value = event.currentTarget.value;
        this.setState({[event.currentTarget.id]: value});
    }

    render(){
        return(
            <div className="offcanvas offcanvas-start" tabIndex={-1} id={this.props.id} aria-labelledby={this.props.id+"Label"}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Update Event</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form className="form form-control border-0" onSubmit={this.handleSubmit}>
                        <div className="input-group mb-3">
                            <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-heading"></i></span>
                            <input type="text" className="form-control" value={this.state.title} onChange={this.handleChange} aria-label="title" id="title" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-calendar-plus"></i></span>
                            <input type="date" className="form-control" value={this.state.dayStart} onChange={this.handleChange} aria-label="dayStart" id="dayStart" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-calendar-minus"></i></span>
                            <input type="date" className="form-control" value={this.state.dayEnd} onChange={this.handleChange} aria-label="dayEnd" id="dayEnd" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-hourglass-start"></i></span>
                            <input type="time" className="form-control" value={this.state.timeStart} onChange={this.handleChange} aria-label="timeStart" id="timeStart" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-hourglass-end"></i></span>
                            <input type="time" className="form-control" value={this.state.timeEnd} onChange={this.handleChange} aria-label="timeEnd" id="timeEnd" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-location-arrow"></i></span>
                            <input type="text" className="form-control" value={this.state.localisation} onChange={this.handleChange} aria-label="localisation" id="localisation" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-info"></i></span>
                            <textarea type="text" className="form-control" value={this.state.description} onChange={this.handleChange} aria-label="description" id="description" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <button type="submit" className="btn btn-dark text-warning form-control" data-bs-dismiss="offcanvas" aria-label="Close">confirmer<i className="ms-3 fa fa-check"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}