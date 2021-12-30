import React from "react";
import Calendar from "./Components/Calendar/Calendar";
import Daily from "./Components/Daily/Daily";
import Buttons from "./Components/Actions/Buttons";
import NextEvent from "./Components/NextEvent/NextEvent";

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

  postIcalendar = (type, obj) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(obj);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("/icalendar/"+type, requestOptions).then((res) => {
      switch(res.status){
        case 406 :
          alert("Not Acceptable icalendar !");
          break;
        default :
          this.getBase("icalendar");
          break;
      }
    });
  }

  postGoogle = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = {};
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("/google", requestOptions).then(this.getBase("google"));
  }

  put = (id, obj) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(obj);
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("/personal/"+id, requestOptions).then((res) => {
      switch(res.status){
        case 406 :
          alert("Not Acceptable modification !");
          break;
        default :
          this.getBase("personal");
          break;
      }
    });
  }

  delete  = (path, id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = {};
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("/"+path+"/"+id, requestOptions).then(this.getBase(path));
  }

  deleteEvent = (event) => {
    if(this.state.personal.includes(event)){
      this.delete("personal", event.id);
    }else if(this.state.icalendar.includes(event)){
      this.delete("icalendar", event.id);
    }else if(this.state.google.includes(event)){
      this.delete("google", event.id);
    }
  }

  updateEvent = (id, oldEvent, obj) => {
    if(this.state.personal.includes(oldEvent)){
      this.put(id, obj);
    }else if(this.state.icalendar.includes(oldEvent)){
      this.delete("icalendar", oldEvent.id);
      this.postPersonal(obj);
    }else if(this.state.google.includes(oldEvent)){
      this.delete("google", oldEvent.id);
      this.postPersonal(obj);
    }
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
        <h1 className="text-center mt-2 mb-2 text-dark">Hello, I am <span className="text-warning"> Friday </span> !</h1>
        <NextEvent listEvents={[...this.state.personal, ...this.state.google, ...this.state.icalendar]} currentDate={this.state.currentDate}/>
        <Daily events={this.generateDailyEvents() } currentDate={this.state.currentDate} update={this.updateEvent} delete={this.deleteEvent}/>
        <Buttons postPersonal={this.postPersonal}/>
        <Calendar events={[...this.state.personal, ...this.state.google, ...this.state.icalendar]} currentDate={this.state.currentDate}/>
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
