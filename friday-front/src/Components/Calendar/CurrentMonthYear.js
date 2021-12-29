import React from 'react';

class CurrentMonthAndYear extends React.Component{
    render(){
        switch(this.props.currentDate.getMonth()) {
            case 0 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>Janvier {this.props.currentDate.getFullYear()}</h4>);
            case 1 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>Février {this.props.currentDate.getFullYear()}</h4>);
            case 2 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>Mars {this.props.currentDate.getFullYear()}</h4>);
            case 3 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>Avril {this.props.currentDate.getFullYear()}</h4>);
            case 4 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>Mai {this.props.currentDate.getFullYear()}</h4>);
            case 5 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>Juin {this.props.currentDate.getFullYear()}</h4>);
            case 6 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>Juillet {this.props.currentDate.getFullYear()}</h4>);
            case 7 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>Aout {this.props.currentDate.getFullYear()}</h4>);
            case 8 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>Septembre {this.props.currentDate.getFullYear()}</h4>);
            case 9 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>Octobre {this.props.currentDate.getFullYear()}</h4>);
            case 10 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>Novembre {this.props.currentDate.getFullYear()}</h4>);
            case 11 :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>Décembre {this.props.currentDate.getFullYear()}</h4>);
            default :
                return (<h4 className='display-6 text-center border-top border-3 p-3 mt-3'>A new month is born {this.props.currentDate.getFullYear()}</h4>);
        }
    }
}

export default CurrentMonthAndYear;