import React, {Component} from "react";
import alex from "../../resources/images/alex.png"
import blue_spotted from "../../resources/images/blue_spotted.jpg"
import coluber from "../../resources/images/coluber_constrictor_003.jpg"
import lizard from "../../resources/images/lizard.jpg"
class aboutPage extends Component{

//sdss
    render() {
        return (
            <div className="App-header position-absolute w-100">
                <h1 style={{margin: "0 auto", color: "#74B266", marginBottom: "34px"}}>Help Preserve the Wildlife of Minnesota</h1>

                <div>
                    <div id="container">
                        <img style={{width: "350px", height: "450px"}} src={alex}/>
                        <img style={{width: "350px", height: "450px"}} src={blue_spotted}/>
                        <img style={{width: "350px", height: "450px"}} src={coluber}/>
                        <img style={{width: "350px", height: "450px"}} src={lizard}/>
                    </div>
                    <h3 style={{color: "#74B266"}}>Conservation Efforts</h3>
                    <a href="https://mnherpsoc.org/mn-herps/">Get involved with the Minnesota Herpetological Society </a><br/>
                    <a href="https://www.dnr.state.mn.us/nr/index.html">Learn more about Minnesota regulations</a>
                    <a href="https://www.prairiemoon.com/">Shop local plants</a>
                </div>
            </div>
        );
    }
}

export default aboutPage