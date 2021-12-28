import React from 'react';

class CurrentMonthAndYear extends React.Component{
    render(){
        const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
        return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>{months[this.props.currentDate.getMonth()]} {this.props.currentDate.getFullYear()}</h4>);
    }
}

export default CurrentMonthAndYear;