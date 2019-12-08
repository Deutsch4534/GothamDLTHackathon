import React, { Component } from 'react';
import {
  Person,
} from 'blockstack';
import { read } from 'fs';
import image from './image.jpg'
import { encode } from 'punycode';

const PhotoStorage = require('./lib/photoStorage');

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {
        name() {
          return 'Anonymous';
        },
        avatarUrl() {
          return avatarFallbackImage;
        },
      },
      username: "",
      newStatus: "",
      statuses: [],
      statusIndex: 0,
      isLoading: false,
      file: null,
      buffer: null,
      images: [],
      imageIndex: 0
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit(e) {
    console.log("here")
  }
  //look into failing jpeg upload
  onChange(e) {
    const { userSession } = this.props
    PhotoStorage.writePhotoToStorage(userSession, e.target.files[0], (successOrNot) => {
      console.log(successOrNot);
    })
    // console.log(e.target.files[0]);
    // var reader = new FileReader();

    // reader.onload = function(event) {
    //   var binary = event.target.result;
    //   var md5 = CryptoJS.MD5(binary).toString();
    //   console.log(md5);
    // };

    // reader.readAsBinaryString(e.target.files[0]);
    // const { userSession } = this.props
    // const options = {encrypt:false}
    // userSession.putFile('images.jpeg', e.target.files[0], options).then(()=>{
    //   console.log('yay?');
    // })
  }
  render() {
    const { handleSignOut, userSession } = this.props;
    const { person } = this.state;
    const { username } = this.state;

    return (
      !userSession.isSignInPending() && person ?
        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              <div className="col-md-12">
                <div className="avatar-section">
                  <img
                    src={person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage}
                    className="img-rounded avatar"
                    id="avatar-image"
                  />
                  <div className="username">
                    <h1>
                      <span id="heading-name">{person.name() ? person.name()
                        : 'Nameless Person'}</span>
                    </h1>
                    <span>{username}</span>
                    <span>
                      &nbsp;|&nbsp;
                    <a onClick={handleSignOut.bind(this)}>(Logout)</a>
                    </span>
                  </div>
                </div>
              </div>

              <div className="new-status">
                <div className="col-md-12">
                  <textarea className="input-status"
                    value={this.state.newStatus}
                    onChange={e => this.handleNewStatusChange(e)}
                    placeholder="Enter a status"
                  />
                </div>
                <div className="col-md-12">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={e => this.handleNewStatusSubmit(e)}
                  >
                    Submit
                </button>
                </div>
                <div className="col-md-12 statuses">
                  {this.state.isLoading && <span>Loading...</span>}
                  {this.state.images.map((status) => {
                    var arrayBuffer = status.data
                    var bytes = new Int8Array(arrayBuffer)
                    var blob = new Blob([bytes.buffer])
                    console.log(encode(arrayBuffer))
                    return(

                    <img src={'data:image/png;base64,' + encode(bytes)} height={50}/>
                  )}
                  )}
                </div>
              </div>

              <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="myImage" onChange= {this.onChange} />
                <button type="submit">Upload</button>
            </form>

            </div>
          </div>
        </div> : null
    );
  }

  fetchImageData(){
    const { userSession } = this.props
    console.log(userSession)
    this.setState({ isLoading: true })
    const options = { decrypt: false }
    userSession.getFile('images.json', options)
      .then((file) => {
        var images = JSON.parse(file || '[]')
        this.setState({
          person: new Person(userSession.loadUserData().profile),
          username: userSession.loadUserData().username,
          imageIndex: images.length,
          images: images,
        })
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  
  }



  componentWillMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile),
      username: userSession.loadUserData().username
    });
  }

  componentDidMount() {
    console.log('2222222222222222222222222222222222222');
    const { userSession } = this.props
    userSession.getFileUrl('images.jpeg').then((file) => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log(file);
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    });
    this.fetchImageData()
  }
}
