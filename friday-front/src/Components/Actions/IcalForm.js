import React from "react";


export default class IcalForm extends React.Component{

    state = {
        link: '',
        file: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let obj = {};
        switch(event.currentTarget.id){
            case "link" :
                obj = {link: this.state.link};
                break;
            default :
                obj = {path: this.state.file};
                break;
        }
        this.props.onIcalAdd(event.currentTarget.id, obj);
        this.setState({
            link: '',
            file: ''
        });
    }

    handleChange = (event) => {
        const value = event.currentTarget.value;
        this.setState({[event.currentTarget.id]: value});
    }

    render(){
        return(
            <div className="offcanvas offcanvas-start" tabIndex={-1} id="AddIcal" aria-labelledby="AddIcalLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Ajouter des évènements Icalendar</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form className="form form-control border-0" id="link" onSubmit={this.handleSubmit}>
                        <div className="input-group mb-3">
                            <span className="input-group-file p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-link"></i></span>
                            <input type="text" className="form-control" placeholder="lien du icalendar" value={this.state.link} onChange={this.handleChange} aria-label="link" id="link" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <button type="submit" className="btn btn-dark text-warning form-control">confirmer lien<i className="ms-3 fa fa-check"></i></button>
                        </div>
                    </form>
                    <form className="form form-control border-0 border-top rounded-0" id="file" onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                            <span className="input-group-file p-3 bg-dark text-warning" id="basic-addon1"><i className="fa fa-file"></i></span>
                            <input type="text" className="form-control" placeholder="chemin absolu du fichier" value={this.state.file} onChange={this.handleChange} aria-label="file" id="file" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <button type="submit" className="btn btn-dark text-warning form-control">confirmer fichier<i className="ms-3 fa fa-check"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}