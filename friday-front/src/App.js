import Calendar from "./Components/Calendar/Calendar";

function App() {

  let eventsPersonal = [];
  fetch("/personal").then(response => {
    if(response.ok === true){
      return response.json();
    }
  }).then(respJ => eventsPersonal.push(respJ))
  .catch(error => {
    console.log(error);
  });
  
  return (
    <div className="App container">
      <h1 className="text-center mt-2 mb-2"><span className="text-black">Hello, I</span><span className="text-warning"> am Friday !</span></h1>
        <Calendar eventsPersonal={eventsPersonal}/>
    </div>
  );
}

export default App;
