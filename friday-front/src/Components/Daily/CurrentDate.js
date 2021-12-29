import React from 'react';
import { DAYS, MONTHS } from '../../Const';

class currentDate extends React.Component{
    getDay = () => {
        return DAYS[this.props.currentDate.getDay()] + " " + this.props.currentDate.getDate();
    }
    
    render(){
        return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>{this.getDay()} {MONTHS[this.props.currentDate.getMonth()]} {this.props.currentDate.getFullYear()}</h4>);
    }
}

export default currentDate;