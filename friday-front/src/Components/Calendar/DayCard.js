import React from 'react';

class DayCard extends React.Component{

    events = (event) => {
        return (
            <span className={this.checkClassName("badge rounded-0 ps-5 pe-5 ", "bg-warning", "bg-dark", event)}><span className='visually-hidden'>Primary</span></span>
        );
    };

    checkClassName = (str, str1, str2, bool) => {
        let ns = (bool) ? str1 : str2;
        return str + ns;
    } 

    dayOfTheMonth = (inMonth) => {
        return(
            <h4 className={this.checkClassName("col-1 ", "text-dark", "text-danger", inMonth)}>
                {this.props.date}
            </h4>
        );
    }

    render(){
        return(
            <div className="col-sm-12 col-lg p-1 pb-5 border bg-light text-center" style={{height: "8vw"}}>
                {this.events(this.props.event)}
                {this.dayOfTheMonth(this.props.inMonth)}
            </div>
    );
    }
}

export default DayCard;