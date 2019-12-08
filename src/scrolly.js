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
                <NavBar/>
                <div className="container">
                    {this.props.feed.map((i, index) => (
                        <Paper style = {{margin:20,}}>
                            <img src= {i.url} className = "item" key={index}/>
                        </Paper>
                    ))}
                </div>
            </div>
        );
    }
}

