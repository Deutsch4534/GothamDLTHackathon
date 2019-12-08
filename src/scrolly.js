import React, { Component } from 'react'
import './styles.css'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


export default class Scrolly extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: 0,
        }
    }
    

    render() {
        console.log(this.props.feed)
        return (
            <div style = {{backgroundColor:'grey'}}>
                {/* <NavBar/> */}
                <div>
                <CarouselProvider
                    naturalSlideWidth={125}
                    naturalSlideHeight={100}
                    totalSlides={this.props.feed.length}
                    orientation={'vertical'}
                    width={'100%'}
                    centerSlidePercentage={100}
                    dynamicHeight={true}
                >
                    <Slider>
                        {this.props.feed.map((i, index) => (
                        <div>
                            <Slide index={index}><img src= {i.url} className = "item" key={index}/></Slide>
                        </div>
                        ))}
                    </Slider>
                </CarouselProvider>
                </div>
            </div>
        );
    }
}

