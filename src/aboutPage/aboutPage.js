import React, {Component} from "react";

class aboutPage extends Component{


    render() {
        return (
            <div className="App-header position-absolute">
                <h1 style={{margin: "0 auto", color: "#74B266", marginBottom: "34px"}}>Native Plants and Reptiles
                    MN</h1>

                <div id="container">
                    <h3>Conservation Efforts</h3>
                    <a href="https://mnherpsoc.org/mn-herps/">Get involved with the Minnesota Herpetological Society </a>

                </div>
            </div>
        );
    }
}

export default aboutPage