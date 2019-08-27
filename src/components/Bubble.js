import React, { Component } from 'react'

class Bubble extends Component{

    constructor(props){
        super(props);
        this.state ={
            x: props.x+"px",
            y: props.y+"px",
            number: props.number,
        }
    }


    render(){
        const {x,y,number} = this.state;
    return (
            <span className="bubble" style={{top:y, left:x}}>
                <span className="number">{number}</span>
            </span>
    )
    }
}


export default Bubble;