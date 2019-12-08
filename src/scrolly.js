import React, { Component } from 'react'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import './styles.css'
const Feed = require('./lib/feed');

export default class Scrolly extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feed: []
        }
    }

    componentDidMount() {
        Feed.getFeed((data) => {
            this.setState({feed: data});
        });
    }

    render() {
        console.log(this.state.feed)
        return (
            <div style = {{backgroundColor:'grey'}}>
            <PhotoCameraIcon onClick={() => {this.props.history.push('/camey')}} style={{position: "fixed", bottom: "0", backgroundColor: "grey", right: "40%",height: "150px", width: "150px", marginBottom: "80px", borderColor: "white", borderRadius: "50%", boxShadow: "0px 3px 5px rgba(0,0,0,0.3"}}></PhotoCameraIcon> 
            {/* <div onClick={() => {this.props.history.push('/camey')}} style={{position: "fixed", bottom: "0", backgroundColor: "grey", right: "40%",height: "150px", width: "150px", marginBottom: "80px", borderColor: "white", borderRadius: "50%", boxShadow: "0px 3px 5px rgba(0,0,0,0.3"}}>
                
            </div> */}
                {/* <NavBar/> */}
                <div>
                    {this.state.feed.map((i, index) => (
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

