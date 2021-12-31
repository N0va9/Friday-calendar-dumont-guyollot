import React from "react";
import Calendar from "./Components/Calendar/Calendar";
import Daily from "./Components/Daily/Daily";
import Buttons from "./Components/Actions/Buttons";
import NextEvent from "./Components/NextEvent/NextEvent";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component{

  state = {
    personal : [],
    icalendar : [],
    google : [],
    proxyGood : 0,
    currentDate: new Date()
  }

  componentDidMount = () => {
    this.refresh();
  }

  refresh = () => {
    this.getBase("personal");
    this.getBase("icalendar");
    this.getBase("google");
  }

  getBase = (base) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("/"+base, requestOptions).then(response => {
      if(response.ok){
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
          toast.warn("Event non adéquat");
          break;
        default :
          toast.success("L'event "+ obj.title +" a bien été crée");
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
          toast.warn("Icalendar non adéquat");
          break;
        default :
          toast.success("Icalendar parfaitement ajouté");
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
    fetch("/google", requestOptions).then(() => {
      toast.success("Google Calendar parfaitement synchroniser");
      this.getBase("google");
    });
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
          toast.warn("Modification non acceptable !");
          break;
        default :
          this.getBase("personal");
          break;
      }
    });
  }

  delete  = (path, event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = {};
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("/"+path+"/"+event.id, requestOptions).then(() => {
      this.refresh();
      toast.success("L'event "+event.title+" a bien été supprimé");
    });
  }

  deleteEvent = (event) => {
    if(this.state.personal.includes(event)){
      this.delete("personal", event);
    }else if(this.state.icalendar.includes(event)){
      this.delete("icalendar", event);
    }else if(this.state.google.includes(event)){
      this.delete("google", event);
    }
  }

  updateEvent = (id, oldEvent, obj) => {
    if(this.state.personal.includes(oldEvent)){
      this.put(id, obj);
    }else if(this.state.icalendar.includes(oldEvent)){
      this.delete("icalendar", oldEvent);
      this.postPersonal(obj);
    }else if(this.state.google.includes(oldEvent)){
      this.delete("google", oldEvent);
      this.postPersonal(obj);
    }
    toast.success("L'event "+ obj.title +" a bien été modifiée");
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

  //Trouve le prochain event qui va arriver
  findNextEvent = () => {
    let listEvents = [...this.state.personal, ...this.state.google, ...this.state.icalendar];
    if(listEvents !== undefined){
      var minEvent = listEvents[0];
      for (let index = 0; index < listEvents.length; index++) {
          if (listEvents[index]['dayStart'] === minEvent['dayStart']){ //Si les deux events commencent le même jour
              if (listEvents[index]['timeStart'] < minEvent['timeStart']) minEvent = listEvents[index]; //On compare à l'heure du début et on change la valeur de minEvent si le nouvel event est plus proche que l'autre
          } else { //Sinon
              if (listEvents[index]['dayStart'] < minEvent['dayStart']) minEvent = listEvents[index];
          }
      }
      return minEvent;
    }
    return undefined;
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
        <h1 className="text-center mt-2 mb-2 text-dark">Bonjour, je suis <span className="text-warning"> Friday </span> !</h1>
        <NextEvent nextEvent={this.findNextEvent()} deleteEvent={this.deleteEvent}/>
        <Daily events={this.generateDailyEvents() } currentDate={this.state.currentDate} update={this.updateEvent} delete={this.deleteEvent}/>
        <Buttons postPersonal={this.postPersonal} postGoogle={this.postGoogle} postIcalendar={this.postIcalendar}/>
        <Calendar events={[...this.state.personal, ...this.state.google, ...this.state.icalendar]} currentDate={this.state.currentDate}/>
        <ToastContainer />
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
