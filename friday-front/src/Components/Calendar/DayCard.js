import React from 'react';

class DayCard extends React.Component{

    events = (event) => {
        if(event === true){
            return(
                <span className="badge rounded-0 bg-warning ps-5 pe-5"><span className='visually-hidden'>Primary</span></span>
            );
        } else {
            return(
                <span className="badge rounded-0 bg-dark ps-5 pe-5"><span className='visually-hidden'>Primary</span></span>
            );
        }
    };

    dayOfTheMonth = (inMonth) => {
        if(inMonth === true){
            return(
                <h4 className="col-1 text-dark">
                    {this.props.date}
                </h4>
            );
        } else {
            return(
                <h4 className="col-1 text-danger">
                    {this.props.date}
                </h4>
            );
        }
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