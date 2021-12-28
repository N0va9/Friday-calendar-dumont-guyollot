import React from 'react';

class CurrentMonthAndYear extends React.Component{
    getDay = () => {
        const days= ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
        return days[this.props.currentDate.getDay()] + " " + this.props.currentDate.getDate();
    }

    render(){
        const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
        return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>{this.getDay()} {months[this.props.currentDate.getMonth()]} {this.props.currentDate.getFullYear()}</h4>);
    }
}

export default CurrentMonthAndYear;