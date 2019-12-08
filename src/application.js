import Scrolly from './scrolly';
import Camey from './camey';
import {Route, Switch } from 'react-router-dom';
import React, { Component } from 'react'

export default class Application extends Component {
    constructor(props) {
        super(props);
    }


    render () {
        return (
            <Switch>
                <Route exact path="/scrolly" component={(props) => <Scrolly {...props} feed={this.props.feed}/>} path="/"/>
                <Route exact path="/camey" component={(props) => <Camey {...props} userSession={this.props.userSession} path="/camey"/> }/>
            </Switch>
        );
    }
}