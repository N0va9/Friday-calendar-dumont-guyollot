import React from 'react';

class currentDate extends React.Component{
    getDay = () => {
        switch(this.props.currentDate.getDay()){
            case 1 : return "Lundi " + this.props.currentDate.getDate();
            case 2 : return "Mardi " + this.props.currentDate.getDate();
            case 3 : return "Mercredi " + this.props.currentDate.getDate();
            case 4 : return "Jeudi " + this.props.currentDate.getDate();
            case 5 : return "Vendredi " + this.props.currentDate.getDate();
            case 6 : return "Samedi " + this.props.currentDate.getDate();
            default : return "Dimanche " + this.props.currentDate.getDate();
        }
    }
    
    render(){
        switch(this.props.currentDate.getMonth()) {
            case 0 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>{this.getDay()} Janvier {this.props.currentDate.getFullYear()}</h4>);
            case 1 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>{this.getDay()} Février {this.props.currentDate.getFullYear()}</h4>);
            case 2 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>{this.getDay()} Mars {this.props.currentDate.getFullYear()}</h4>);
            case 3 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>{this.getDay()} Avril {this.props.currentDate.getFullYear()}</h4>);
            case 4 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>{this.getDay()} Mai {this.props.currentDate.getFullYear()}</h4>);
            case 5 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>{this.getDay()} Juin {this.props.currentDate.getFullYear()}</h4>);
            case 6 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>{this.getDay()} Juillet {this.props.currentDate.getFullYear()}</h4>);
            case 7 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>{this.getDay()} Aout {this.props.currentDate.getFullYear()}</h4>);
            case 8 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>{this.getDay()} Septembre {this.props.currentDate.getFullYear()}</h4>);
            case 9 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>{this.getDay()} Octobre {this.props.currentDate.getFullYear()}</h4>);
            case 10 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>{this.getDay()} Novembre {this.props.currentDate.getFullYear()}</h4>);
            case 11 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>{this.getDay()} Décembre {this.props.currentDate.getFullYear()}</h4>);
            default :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>A new month is born {this.props.currentDate.getFullYear()}</h4>);
        }
    }
}

export default currentDate;