import React, { Component } from 'react';
import Profile from './Profile.js';
import Signin from './Signin.js';
import {
  UserSession,
  AppConfig
} from 'blockstack';
import Scrolly from './scrolly'

const Feed = require('./lib/feed');

const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig: appConfig })

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
    }
  }

  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    return (
      <div >
        
          {/* { !userSession.isUserSignedIn() ?
            <Signin userSession={userSession} handleSignIn={ this.handleSignIn } />
            : <Profile userSession={userSession} handleSignOut={ this.handleSignOut } />
          } */}
          { !userSession.isUserSignedIn() ?
            <Signin userSession={userSession} handleSignIn={ this.handleSignIn } />
            : <Scrolly feed={this.state.feed}/>
          }
          
       
      </div>
    );
  }

  componentDidMount() {
    Feed.getFeed((data) => {
      this.setState({feed: data});
    });
    
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/")
        this.setState({ userData: userData})
      });
    }
  }
}
