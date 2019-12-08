import React, { Component } from 'react';
import {
  Person,
} from 'blockstack';
import { read } from 'fs';
import image from './image.jpg'
import { encode } from 'punycode';

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
  onChange(e) {
    this.setState({ file: e.target.files[0]}, ()=>{
      let pic = this.state.file.__proto__.__proto__;
      new Response(pic).arrayBuffer().then(buf=>{
        var arr = new Int8Array(buf)
        console.log(buf)
        this.saveNewImage(buf)
      })
        // new Response(pic).arrayBuffer().then(buf=>this.saveNewImage(buf))
    });
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

  saveNewImage(imageData){
    const { userSession } = this.props
    let images = this.state.images
    console.log(imageData)
    

    images.unshift(image)

    const options = {encrypt:false}
    userSession.putFile('images.jpeg', imageData, options).then(()=>{
      this.setState({
        images:images
      })
    })
    userSession.getFileUrl('images.jpeg').then((val) => {
      console.log(val)
    })
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
    this.fetchImageData()
  }
}
