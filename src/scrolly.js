import React, { Component } from 'react'
import './styles.css'

export default class Scrolly extends Component {
    constructor(props) {
        super(props);
    }
    


    render() {
        console.log(this.props.feed)
        return (
            <div style = {{backgroundColor:'grey'}}>
            <div onClick={() => {this.props.history.push('/camey')}} style={{position: "fixed", bottom: "0", backgroundColor: "#1976d2", right: "40%",height: "150px", width: "150px", marginBottom: "80px", borderRadius: "50%", boxShadow: "0px 3px 5px rgba(0,0,0,0.3"}}>
            </div>
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

