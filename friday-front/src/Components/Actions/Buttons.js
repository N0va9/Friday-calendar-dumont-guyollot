import React from "react";
import AddEvent from "./AddEvent";


export default class Buttons extends React.Component{

    render(){
        return(
            <div className="fixed-bottom m-5">
                <AddEvent />
            </div>
        );
    }
}