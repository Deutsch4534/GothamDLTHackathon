import React, { Component } from 'react'
import './styles.css'
import BackButton from './BackButton.js';
const PhotoStorage = require('./lib/photoStorage')

export default class Camey extends Component {
    constructor(props) {
        super(props);

        this.takeASnap = this.takeASnap.bind(this);
    }
   
    componentDidMount() {
        var video = document.getElementById('video');

        // Get access to the camera!
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                //video.src = window.URL.createObjectURL(stream);
                video.srcObject = stream;
                video.play();
            });
        }
    }

    takeASnap(){
        const vid = document.querySelector('video');
        const canvas = document.createElement('canvas'); // create a canvas
        const ctx = canvas.getContext('2d'); // get its context
        canvas.width = vid.videoWidth; // set its size to the one of the video
        canvas.height = vid.videoHeight;
        ctx.drawImage(vid, 0,0); // the video
        canvas.toBlob((res) => {
            PhotoStorage.writePhotoToStorage(this.props.userSession,new File([res], `${Math.floor(Math.random() * 100000) + 1}${Date.now()}.jpeg`,{
                type: "image/jpeg",
                lastModified: Date.now()
              }))
            
        }, 'image/jpeg'); // request a Blob from the canvas
        
    }

    render() {
        return (
            <div>
                <BackButton {...this.props}></BackButton>
                <video id="video" width="100%" height="100%" autoPlay></video>
                <div style={{position: "fixed", bottom: "0", backgroundColor: "#1976d2", right: "40%"}}>
                    <button id="snap" onClick={()=>{this.takeASnap()}}>Snap Photo</button>
                </div>
                <canvas id="canvas" width="100%" height="100%"></canvas>
            </div>
        );
    }
}

