import React from 'react';
import { MONTHS } from '../../Const';

class CurrentMonthAndYear extends React.Component{
    render(){
        return (<h4 className='display-6 text-center border-3 p-3'>{MONTHS[this.props.currentDate.getMonth()]} {this.props.currentDate.getFullYear()}</h4>);
    }
}

export default CurrentMonthAndYear;