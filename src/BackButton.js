import React, { Component } from 'react'
import './styles.css'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

export default class BackButton extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        // this.props.history.goBack();
        this.props.history.push("/");
    }

    render() {
        return <KeyboardBackspaceIcon fontSize="large" onClick={this.goBack}></KeyboardBackspaceIcon>;
    }
}