import React from "react";
import Calendar from "./Components/Calendar/Calendar";

class App extends React.Component{

  state = {
    eventsPersonal : [],
  }

  componentDidMount = () => {
    this.personalFetch();
  }

  personalFetch = () => {
    fetch("/personal").then(response => {
      if(response.ok === true){
        return response.json();
      }
    }).then(respJ => {
      this.setState({eventsPersonal: respJ});
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  render(){
    return (
      <div className="App container">
        <h1 className="text-center mt-2 mb-2"><span className="text-black">Hello, I</span><span className="text-warning"> am Friday !</span></h1>
        <Calendar eventsPersonal={this.state.eventsPersonal}/>
      </div>
    );
  }
}

export default App;
