import React, { Component } from 'react'
import './styles.css'
import AppBar from '@material-ui/core/AppBar'
import NavBar from './NavBar'
import { Paper } from '@material-ui/core';

export default class Scrolly extends Component {
    constructor(props) {
        super(props);
    }
    


    render() {
        console.log(this.props.feed)
        return (
            <div style = {{backgroundColor:'grey'}}>
                {/* <NavBar/> */}
                <div>
                    {this.props.feed.map((i, index) => (
                        // <Paper style = {{margin:20,}}>
                        <div style={{borderBottom: "5px solid black"}}> 
                            <img src= {i.url} className = "item" key={index}/>
                        </div>
                        // </Paper>
                    ))}
                </div>
            </div>
        );
    }
}

