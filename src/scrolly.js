import React, { Component } from 'react'
import './styles.css'
import AppBar from '@material-ui/core/AppBar'
import NavBar from './NavBar'
import { Paper } from '@material-ui/core';

export default class Scrolly extends Component {
    state = {
        items: Array.from({ length: 20})
    };


    render() {
        return (
            <div style = {{backgroundColor:'grey'}}>
                <NavBar/>
                <div className="container">
                    {this.state.items.map((i, index) => (
                        <Paper style = {{margin:20,}}>
                            <img src= {'https://dl3.pushbulletusercontent.com/WO40XBXdSIqSDp6I3e5nRr0XOCmzTQfr/IMG_20191207_144056.jpg'} className = "item" key={index}/>
                        </Paper>
                    ))}
                </div>
            </div>
        );
    }
}

