import React from "react";
import Calendar from "./Components/Calendar/Calendar";
import Daily from "./Components/Daily/Daily";
import Buttons from "./Components/Actions/Buttons";

class App extends React.Component{

  state = {
    personal : [],
    icalendar : [],
    google : [],
    proxyGood : 0,
    currentDate: new Date()
  }

  componentDidMount = () => {
    this.getBase("personal");
    this.getBase("icalendar");
    this.getBase("google");
  }

  getBase = (base) => {
    fetch("/"+base, {}).then(response => {
      if(response.ok === true){
        return response.json();
      } else {
        this.setState({proxyGood : response.status});
      }
    }).then(respJ => {
      this.setState({[base] : respJ});
    });
  }

  postPersonal = (obj) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(obj);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("/personal", requestOptions).then((res) => {
      switch(res.status.valueOf()){
        case 406 :
          alert("Not Acceptable Event !");
          break;
        default :
          this.getBase("personal");
          break;
      }
    });
  }

  generateDailyEvents = () => {
    let tmp = [];
    [...this.state.personal, ...this.state.google, ...this.state.icalendar].forEach(e => {
      if(new Date(e['dayStart']).toDateString() === this.state.currentDate.toDateString()){
        tmp.push(e);
      }
    });
    return tmp;
  }

  generateErrorScreen = (errorname, code) => { return (
      <div className="App container bg-danger">
        <div className="card bg-danger text-white text-center position-absolute top-50 start-50 translate-middle" style={{width: "60vw"}}>
          <div className="card-header p-5"><h1>{errorname} Error</h1></div>
          <div className="card-body"><h3>Error Code : {code}</h3></div>
          <div className="card-footer"><h5>Restart Application</h5></div>
        </div>
      </div>
  ); }

  generateCalendarScreen = () => { return (
      <div className="App container">
        <h1 className="text-center mt-2 mb-2"><span className="text-black">Hello, I</span><span className="text-warning"> am Friday !</span></h1>
        <Daily events={this.generateDailyEvents() } currentDate={this.state.currentDate} />
        <Buttons postPersonal={this.postPersonal}/>
        <Calendar eventsPersonal={[...this.state.personal, ...this.state.google, ...this.state.icalendar]} currentDate={this.state.currentDate}/>
      </div>
  );}


  render(){
    switch(this.state.proxyGood) {
      case 0: return this.generateCalendarScreen();
      case 500 : return this.generateErrorScreen("Internal Server", 500);
      default : return this.generateErrorScreen("Unknown", "???");
    }
  }
}

export default App;
