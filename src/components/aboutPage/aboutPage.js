import React, {Component} from "react";
import Carousel from "../UI/Carousel/Carousel";
import styles from "./aboutPage.css"

class aboutPage extends Component {
    //asdasdasdasdasdasd
    render() {
        return (
            <div className="App-header position-absolute w-100">
                <h1 style={{margin: "0 auto", color: "#74B266", marginBottom: "34px"}}>Help Preserve the Wildlife of
                    Minnesota</h1>
                <Carousel/>
                <div className="row display-row" style={{marginTop: "15%"}}>
                    <div className="card col-2" style={{backgroundColor: "#3d3d43", marginLeft: "10%"}}>
                        <a href="https://mnherpsoc.org/mn-herps/">Get involved with the Minnesota Herpetological
                            Society </a><br/>
                    </div>
                    <div className="card col-2" style={{backgroundColor: "#3d3d43", marginLeft: "15%"}}>
                        <a href="https://www.dnr.state.mn.us/nr/index.html">Learn more about Minnesota
                            regulations</a><br/>
                    </div>
                    <div className="card col-2" style={{backgroundColor: "#3d3d43", marginLeft: "15%"}}>
                        <a href="https://www.prairiemoon.com/">Shop local plants</a>
                    </div>
                </div>

            </div>
        );
    }
}

export default aboutPage