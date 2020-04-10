import React, {Component} from "react";
import Carousel from "../UI/Carousel/Carousel";
class aboutPage extends Component{

//sdss
    render() {
        return (
            <div className="App-header position-absolute w-100">
                <h1 style={{margin: "0 auto", color: "#74B266", marginBottom: "34px"}}>Help Preserve the Wildlife of Minnesota</h1>
                <Carousel/>
                <div>
                    <h3 style={{color: "#74B266"}}>Conservation Efforts</h3>

                    <a href="https://mnherpsoc.org/mn-herps/">Get involved with the Minnesota Herpetological Society </a><br/>
                    <a href="https://www.dnr.state.mn.us/nr/index.html">Learn more about Minnesota regulations</a><br/>
                    <a href="https://www.prairiemoon.com/">Shop local plants</a>
                </div>
            </div>
        );
    }
}

export default aboutPage