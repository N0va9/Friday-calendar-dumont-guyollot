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
      switch(res.status){
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
        console.log(res);
          this.getBase("personal");
          break;
      }
    });
  }

  updateEvent = (id, oldEvent, obj) => {
    if(this.state.personal.includes(oldEvent)){
      this.put(id, obj);
    }else if(this.state.icalendar.includes(oldEvent)){
      
    }else{

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
  
  render(){
    if(this.state.proxyGood === 0){
      return (
        <div className="App container">
          <h1 className="text-center mt-2 mb-2 text-dark">Hello, I am<span className="text-warning"> Friday</span> !</h1>
          <Daily events={this.generateDailyEvents()} currentDate={this.state.currentDate} update={this.updateEvent}/>
          <Buttons postPersonal={this.postPersonal} postIcalendar={this.postIcalendar} postGoogle={this.postGoogle}/>
          <Calendar events={[...this.state.personal, ...this.state.google, ...this.state.icalendar]} currentDate={this.state.currentDate}/>
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
