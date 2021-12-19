import React from "react";
import Calendar from "./Components/Calendar/Calendar";

class App extends React.Component{

  state = {
    eventsPersonal : [],
    proxyGood : 0,
  }

  componentDidMount = () => {
    this.personalFetch();
  }

  personalFetch = () => {
    fetch("/personal").then(response => {
      if(response.ok === true){
        return response.json();
      } else {
        this.setState({proxyGood : response.status});
      }
    }).then(respJ => {
      this.setState({eventsPersonal: respJ});
    });
  }
  
  render(){
    if(this.state.proxyGood === 0){
      return (
        <div className="App container">
          <h1 className="text-center mt-2 mb-2"><span className="text-black">Hello, I</span><span className="text-warning"> am Friday !</span></h1>
          <Calendar eventsPersonal={this.state.eventsPersonal}/>
        </div>
      );
    } else if(this.state.proxyGood === 500) {
      return (
        <div className="App container bg-danger">
          <div className="card bg-danger text-white text-center position-absolute top-50 start-50 translate-middle" style={{width: "60vw"}}>
            <div className="card-header p-5">
              <h1>Internal Server Error</h1> 
            </div>
            <div className="card-body">
              <h3>Error Code : 500</h3>
            </div>
            <div className="card-footer">
              <h5>Restart Application</h5>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App container">
          <div className="card bg-danger text-white text-center position-absolute top-50 start-50 translate-middle" style={{width: "60vw"}}>
            <div className="card-header p-5">
              <h1>Unknown Error</h1> 
            </div>
            <div className="card-body">
              <h3>Error Code : ???</h3>
            </div>
            <div className="card-footer">
              <h5>Restart Application</h5>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
